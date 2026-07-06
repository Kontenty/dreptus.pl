"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function deleteBadgeDegree(degreeId: number) {
  try {
    const degree = await prisma.badgeDegree.findUnique({
      where: { id: degreeId },
      include: { _count: { select: { scorers: true } } },
    });

    if (!degree) {
      throw new Error("Stopień odznaki nie został znaleziony");
    }

    if (degree._count.scorers > 0) {
      throw new Error(
        "Nie można usunąć stopnia, który ma przypisanych zdobywców. Najpierw usuń lub zmień stopień zdobywcom.",
      );
    }

    await prisma.badgeDegree.delete({ where: { id: degreeId } });

    revalidatePath("/admin/badges");
    revalidatePath("/badges");
    revalidatePath("/");

    return { success: true, message: "Stopień odznaki został usunięty" };
  } catch (error) {
    console.error("Error deleting badge degree:", error);
    if (error instanceof Error) throw error;
    throw new Error("Nie udało się usunąć stopnia odznaki");
  }
}
