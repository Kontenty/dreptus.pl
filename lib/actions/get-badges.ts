"use server";

import { prisma } from "@/lib/prisma";
import type { BadgeWithDegrees } from "@/types";

export async function getBadges(): Promise<BadgeWithDegrees[]> {
  try {
    const badges = await prisma.badge.findMany({
      include: {
        degrees: { orderBy: { sort_order: "asc" } },
        _count: { select: { scorers: true } },
      },
      orderBy: { name: "asc" },
    });
    return badges;
  } catch (error) {
    console.error("Error fetching badges:", error);
    throw new Error("Nie udało się pobrać odznak");
  }
}
