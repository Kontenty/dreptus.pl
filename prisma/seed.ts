import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../lib/generated/prisma/client";

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

async function main() {
  const badgeData = [
    {
      name: "Z Dreptusiem po Polsce",
      slug: "z-dreptusiem-po-polsce",
      rules_page_id: 11620,
      degrees: [
        {
          name: "Honorowy",
          description: "Za promowanie idei TRIP",
          sort_order: 0,
        },
        { name: "Zielony", description: "Minimum 5 tras", sort_order: 1 },
        { name: "Żółty", description: "Ponad 60 tras", sort_order: 2 },
        {
          name: "Niebieski",
          description: "Co najmniej 160 tras",
          sort_order: 3,
        },
      ],
    },
    {
      name: "Z Dreptusiem po Dolinie Bugu",
      slug: "z-dreptusiem-po-dolinie-bugu",
      rules_page_id: 11617,
      degrees: [],
    },
    {
      name: "Z Dreptusiem Traktem Królewskim",
      slug: "z-dreptusiem-traktem-krolewskim",
      rules_page_id: 14076,
      degrees: [],
    },
  ];

  for (const badge of badgeData) {
    const created = await prisma.badge.upsert({
      where: { slug: badge.slug },
      update: {
        name: badge.name,
        rules_page_id: badge.rules_page_id,
      },
      create: {
        name: badge.name,
        slug: badge.slug,
        rules_page_id: badge.rules_page_id,
      },
    });

    for (const degree of badge.degrees) {
      const existing = await prisma.badgeDegree.findFirst({
        where: { badge_id: created.id, name: degree.name },
      });
      if (existing) {
        await prisma.badgeDegree.update({
          where: { id: existing.id },
          data: {
            description: degree.description,
            sort_order: degree.sort_order,
          },
        });
      } else {
        await prisma.badgeDegree.create({
          data: {
            badge_id: created.id,
            name: degree.name,
            description: degree.description,
            sort_order: degree.sort_order,
          },
        });
      }
    }
  }

  console.log("Seed completed successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
