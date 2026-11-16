import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { parse } from "node-html-parser";
import { Prisma, PrismaClient } from "../lib/generated/prisma/client";

function parseDatabaseUrl(url: string) {
  const parsed = new URL(url);
  return {
    host: parsed.hostname,
    port: Number(parsed.port || 3306),
    user: parsed.username,
    password: parsed.password,
    database: parsed.pathname.replace(/^\//, ""),
  };
}

const dbUrl = process.env.DATABASE_CON_URL;
if (!dbUrl) {
  throw new Error("DATABASE_CON_URL environment variable is not set");
}

const adapter = new PrismaMariaDb(parseDatabaseUrl(dbUrl));
const prisma = new PrismaClient({ adapter });

const PAGE_IDS: Record<number, string> = {
  21255: "z-dreptusiem-po-polsce",
  21319: "z-dreptusiem-po-dolinie-bugu",
  21322: "z-dreptusiem-traktem-krolewskim",
};

const DEGREE_MAP: Record<string, string> = {
  honorowym: "Honorowy",
  zielonym: "Zielony",
  żółtym: "Żółty",
  niebieskim: "Niebieski",
};

function parseDate(dateStr: string): Date | null {
  const match = dateStr.trim().match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
  if (!match) return null;
  const [, day, month, year] = match;
  return new Date(Number(year), Number(month) - 1, Number(day));
}

interface ScorerRow {
  name: string;
  origin: string;
  date: Date;
  degreeName: string | null;
}

function parseScorersHtml(html: string, hasDegrees: boolean): ScorerRow[] {
  const root = parse(html);
  const rows = root.querySelectorAll("tr");
  const results: ScorerRow[] = [];
  let currentDegree: string | null = null;

  for (const row of rows) {
    const cells = row.querySelectorAll("td, th");

    // Skip header rows (containing <th>)
    if (row.querySelector("th")) continue;

    // Skip empty rows
    if (cells.length < 3) continue;

    // Check for degree header in any cell
    if (hasDegrees) {
      const h3 = row.querySelector("h3");
      if (h3) {
        const text = h3.textContent.trim().toLowerCase();
        for (const [key, name] of Object.entries(DEGREE_MAP)) {
          if (text.includes(key)) {
            currentDegree = name;
            break;
          }
        }
        continue;
      }
    }

    // Extract data from cells
    const nameCell = cells[1]?.textContent?.trim();
    const originCell = cells[2]?.textContent?.trim();
    const dateCell = cells[3]?.textContent?.trim();

    // Skip rows with empty name or origin
    if (!nameCell || !originCell || nameCell === "" || originCell === "")
      continue;

    // Skip description rows (no date)
    if (!dateCell || dateCell === "") continue;

    const date = parseDate(dateCell);
    if (!date) continue;

    results.push({
      name: nameCell,
      origin: originCell,
      date,
      degreeName: hasDegrees ? currentDegree : null,
    });
  }

  return results;
}

async function main() {
  // Load all badges with degrees
  const badges = await prisma.badge.findMany({
    include: {
      degrees: true,
    },
  });

  const badgeMap = new Map(badges.map((b) => [b.slug, b]));

  for (const [pageIdStr, badgeSlug] of Object.entries(PAGE_IDS)) {
    const pageId = Number(pageIdStr);
    const badge = badgeMap.get(badgeSlug);
    if (!badge) {
      console.warn(`Badge not found for slug: ${badgeSlug}, skipping`);
      continue;
    }

    const page = await prisma.wp_posts.findUnique({
      where: { ID: pageId },
      select: { post_content: true },
    });

    if (!page?.post_content) {
      console.warn(`No content found for page ID ${pageId}`);
      continue;
    }

    const hasDegrees = badgeSlug === "z-dreptusiem-po-polsce";
    const scorers = parseScorersHtml(page.post_content, hasDegrees);

    console.log(
      `Parsed ${scorers.length} scorers for "${badge.name}" (page ${pageId})`,
    );

    for (const scorer of scorers) {
      // Upsert participant
      const participant = await prisma.participant.upsert({
        where: {
          name_origin: { name: scorer.name, origin: scorer.origin },
        },
        update: {},
        create: { name: scorer.name, origin: scorer.origin },
      });

      // Find degree if applicable
      let degreeId: number | null = null;
      if (scorer.degreeName) {
        const degree = badge.degrees.find((d) => d.name === scorer.degreeName);
        if (degree) {
          degreeId = degree.id;
        } else {
          console.warn(
            `Degree "${scorer.degreeName}" not found for badge "${badge.name}"`,
          );
        }
      }

      // Create badge scorer
      try {
        await prisma.badgeScorer.create({
          data: {
            participant_id: participant.id,
            badge_id: badge.id,
            degree_id: degreeId,
            date: scorer.date,
          },
        });
      } catch (error: unknown) {
        if (
          error instanceof Prisma.PrismaClientKnownRequestError &&
          error.code === "P2002"
        ) {
          console.warn(
            `Scorer already exists: ${scorer.name} for ${badge.name}`,
          );
        } else {
          throw error;
        }
      }
    }
  }

  console.log("Scorer seed completed successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
