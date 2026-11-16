"use server";

import { revalidatePath } from "next/cache";
import * as v from "valibot";
import { prisma } from "@/lib/prisma";

const schema = v.object({
  id: v.number(),
  name: v.pipe(v.string(), v.nonEmpty()),
  description: v.optional(v.string()),
});

type EditBadgeDegreeData = {
  id: number;
  name: string;
  description?: string;
};

export async function editBadgeDegree(data: EditBadgeDegreeData) {
  const result = v.safeParse(schema, data);
  if (!result.success) {
    const errorMessages = result.issues.map((i) => i.message).join(", ");
    throw new Error(`Nieprawidłowe dane: ${errorMessages}`);
  }

  try {
    const degree = await prisma.badgeDegree.update({
      where: { id: data.id },
      data: {
        name: data.name,
        description: data.description ?? null,
      },
    });

    revalidatePath("/admin/badges");
    revalidatePath("/badges");
    revalidatePath("/");

    return { success: true, degree };
  } catch (error) {
    console.error("Error editing badge degree:", error);
    throw new Error("Nie udało się zaktualizować stopnia odznaki");
  }
}
