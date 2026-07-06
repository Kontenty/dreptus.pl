"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function removeBadgeScorer(scorerId: number) {
  try {
    const scorer = await prisma.badgeScorer.findUnique({
      where: { id: scorerId },
    });

    if (!scorer) {
      throw new Error("Zdobywca odznaki nie został znaleziony");
    }

    await prisma.badgeScorer.delete({ where: { id: scorerId } });

    revalidatePath("/admin/badges");
    revalidatePath("/badges");
    revalidatePath("/");

    return { success: true, message: "Zdobywca odznaki został usunięty" };
  } catch (error) {
    console.error("Error removing badge scorer:", error);
    if (error instanceof Error) throw error;
    throw new Error("Nie udało się usunąć zdobywcy odznaki");
  }
}
