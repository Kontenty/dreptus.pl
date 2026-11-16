"use server";

import { prisma } from "@/lib/prisma";
import type { BadgeScorerWithDetails } from "@/types";

export async function getBadgeScorers(
  badgeId: number,
): Promise<BadgeScorerWithDetails[]> {
  try {
    const scorers = await prisma.badgeScorer.findMany({
      where: { badge_id: badgeId },
      include: {
        participant: { select: { id: true, name: true, origin: true } },
        degree: { select: { id: true, name: true } },
      },
      orderBy: { participant: { name: "asc" } },
    });
    return scorers;
  } catch (error) {
    console.error("Error fetching badge scorers:", error);
    throw new Error("Nie udało się pobrać zdobywców odznaki");
  }
}
