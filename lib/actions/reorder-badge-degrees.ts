"use server";

import { revalidatePath, updateTag } from "next/cache";
import * as v from "valibot";
import { prisma } from "@/lib/prisma";

const schema = v.object({
  badgeId: v.pipe(v.number(), v.integer(), v.minValue(1)),
  degreeIds: v.pipe(
    v.array(v.pipe(v.number(), v.integer(), v.minValue(1))),
    v.minLength(1),
  ),
});

export async function reorderBadgeDegrees(data: {
  badgeId: number;
  degreeIds: number[];
}) {
  const result = v.safeParse(schema, data);
  if (
    !result.success ||
    new Set(data.degreeIds).size !== data.degreeIds.length
  ) {
    throw new Error("Nieprawidłowa kolejność stopni odznaki");
  }

  await prisma.$transaction(async (tx) => {
    const degrees = await tx.badgeDegree.findMany({
      where: { badge_id: data.badgeId },
      select: { id: true },
    });
    const currentIds = new Set(degrees.map((degree) => degree.id));
    if (
      currentIds.size !== data.degreeIds.length ||
      data.degreeIds.some((id) => !currentIds.has(id))
    ) {
      throw new Error(
        "Lista stopni uległa zmianie. Odśwież stronę i spróbuj ponownie.",
      );
    }

    for (const [sortOrder, id] of data.degreeIds.entries()) {
      await tx.badgeDegree.update({
        where: { id, badge_id: data.badgeId },
        data: { sort_order: sortOrder },
      });
    }
  });

  updateTag("badges");
  revalidatePath("/admin/badges");
  revalidatePath("/badges", "layout");
  revalidatePath("/");
}
