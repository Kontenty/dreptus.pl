"use server";

import { revalidatePath } from "next/cache";
import * as v from "valibot";
import { prisma } from "@/lib/prisma";

const schema = v.object({
  badge_id: v.number(),
  name: v.pipe(v.string(), v.nonEmpty()),
  description: v.optional(v.string()),
});

type AddBadgeDegreeData = {
  badge_id: number;
  name: string;
  description?: string;
};

export async function addBadgeDegree(data: AddBadgeDegreeData) {
  const result = v.safeParse(schema, data);
  if (!result.success) {
    const errorMessages = result.issues.map((i) => i.message).join(", ");
    throw new Error(`Nieprawidłowe dane: ${errorMessages}`);
  }

  try {
    const degree = await prisma.$transaction(async (tx) => {
      const lastDegree = await tx.badgeDegree.findFirst({
        where: { badge_id: data.badge_id },
        orderBy: { sort_order: "desc" },
      });
      return tx.badgeDegree.create({
        data: {
          badge_id: data.badge_id,
          name: data.name,
          description: data.description ?? null,
          sort_order: lastDegree ? lastDegree.sort_order + 1 : 0,
        },
      });
    });

    revalidatePath("/admin/badges");
    revalidatePath("/badges");
    revalidatePath("/");

    return { success: true, degree };
  } catch (error) {
    console.error("Error adding badge degree:", error);
    throw new Error("Nie udało się dodać stopnia odznaki");
  }
}
