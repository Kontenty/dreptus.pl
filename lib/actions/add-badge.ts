"use server";

import { revalidatePath } from "next/cache";
import * as v from "valibot";
import { prisma } from "@/lib/prisma";

const schema = v.object({
  name: v.pipe(v.string(), v.nonEmpty()),
  slug: v.pipe(v.string(), v.nonEmpty()),
  description: v.optional(v.string()),
  rules_page_id: v.optional(v.number()),
});

type AddBadgeData = {
  name: string;
  slug: string;
  description?: string;
  rules_page_id?: number;
};

export async function addBadge(data: AddBadgeData) {
  const result = v.safeParse(schema, data);
  if (!result.success) {
    const errorMessages = result.issues.map((i) => i.message).join(", ");
    throw new Error(`Nieprawidłowe dane: ${errorMessages}`);
  }

  try {
    const existing = await prisma.badge.findUnique({
      where: { slug: data.slug },
    });
    if (existing) {
      throw new Error("Odznaka z tym slugiem już istnieje");
    }

    const badge = await prisma.badge.create({
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description ?? null,
        rules_page_id: data.rules_page_id ?? null,
      },
    });

    revalidatePath("/admin/badges");
    revalidatePath("/badges");
    revalidatePath("/");

    return { success: true, badge };
  } catch (error) {
    console.error("Error adding badge:", error);
    if (error instanceof Error) throw error;
    throw new Error("Nie udało się dodać odznaki");
  }
}
