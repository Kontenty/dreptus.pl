"use server";

import { revalidatePath } from "next/cache";
import * as v from "valibot";
import { prisma } from "@/lib/prisma";

const schema = v.object({
  id: v.number(),
  degree_id: v.optional(v.number()),
  date: v.optional(v.string()),
});

type EditBadgeScorerData = {
  id: number;
  degree_id?: number;
  date?: string;
};

export async function editBadgeScorer(data: EditBadgeScorerData) {
  const result = v.safeParse(schema, data);
  if (!result.success) {
    const errorMessages = result.issues.map((i) => i.message).join(", ");
    throw new Error(`Nieprawidłowe dane: ${errorMessages}`);
  }

  try {
    const scorer = await prisma.badgeScorer.update({
      where: { id: data.id },
      data: {
        degree_id: data.degree_id ?? null,
        date: data.date ? new Date(data.date) : undefined,
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
    console.error("Error editing badge scorer:", error);
    throw new Error("Nie udało się zaktualizować zdobywcy odznaki");
  }
}
