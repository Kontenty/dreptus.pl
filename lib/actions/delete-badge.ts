"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function deleteBadge(badgeId: number) {
  try {
    const badge = await prisma.badge.findUnique({
      where: { id: badgeId },
      include: { _count: { select: { scorers: true } } },
    });

    if (!badge) {
      throw new Error("Odznaka nie została znaleziona");
    }

    await prisma.badge.delete({ where: { id: badgeId } });

    revalidatePath("/admin/badges");
    revalidatePath("/badges");
    revalidatePath("/");

    return { success: true, message: "Odznaka została usunięta" };
  } catch (error) {
    console.error("Error deleting badge:", error);
    if (error instanceof Error) throw error;
    throw new Error("Nie udało się usunąć odznaki");
  }
}
