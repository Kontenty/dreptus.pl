"use server";

import { revalidatePath } from "next/cache";
import * as v from "valibot";
import { prisma } from "@/lib/prisma";

const schema = v.object({
  participant_id: v.number(),
  badge_id: v.number(),
  degree_id: v.optional(v.number()),
  date: v.optional(v.string()),
});

type AddBadgeScorerData = {
  participant_id: number;
  badge_id: number;
  degree_id?: number;
  date?: string;
};

export async function addBadgeScorer(data: AddBadgeScorerData) {
  const result = v.safeParse(schema, data);
  if (!result.success) {
    const errorMessages = result.issues.map((i) => i.message).join(", ");
    throw new Error(`Nieprawidłowe dane: ${errorMessages}`);
  }

  try {
    const existing = await prisma.badgeScorer.findUnique({
      where: {
        participant_id_badge_id: {
          participant_id: data.participant_id,
          badge_id: data.badge_id,
        },
      },
    });
    if (existing) {
      throw new Error("Ten uczestnik już ma przypisaną tę odznakę");
    }

    const scorer = await prisma.badgeScorer.create({
      data: {
        participant_id: data.participant_id,
        badge_id: data.badge_id,
        degree_id: data.degree_id ?? null,
        date: data.date ? new Date(data.date) : new Date(),
      },
      include: {
        participant: { select: { id: true, name: true, origin: true } },
        degree: { select: { id: true, name: true } },
      },
    });

    revalidatePath("/admin/badges");
    revalidatePath("/badges");
    revalidatePath("/");

    return { success: true, scorer };
  } catch (error) {
    console.error("Error adding badge scorer:", error);
    if (error instanceof Error) throw error;
    throw new Error("Nie udało się dodać zdobywcy odznaki");
  }
}
