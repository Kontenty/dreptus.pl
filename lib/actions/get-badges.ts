"use server";

import { prisma } from "@/lib/prisma";
import type { BadgeWithDegrees } from "@/types";

export async function getBadges(): Promise<BadgeWithDegrees[]> {
  try {
    const badges = await prisma.badge.findMany({
      include: {
        degrees: {
          include: {
            _count: { select: { scorers: true } },
          },
          orderBy: [{ sort_order: "asc" }, { id: "asc" }],
        },
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
