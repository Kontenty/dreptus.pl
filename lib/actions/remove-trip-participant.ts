"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function removeTripParticipant(participantId: number) {
  // Check authentication using NextAuth v5
  const session = await auth();
  if (!session?.user?.role || session.user.role !== "admin") {
    throw new Error("Unauthorized: Admin access required");
  }

  try {
    // Get the trip_id before deleting for revalidation
    const tripParticipant = await prisma.tripParticipant.findUnique({
      where: { id: participantId },
      select: { trip_id: true },
    });

    if (!tripParticipant) {
      throw new Error("Uczestnik nie został znaleziony");
    }

    await prisma.tripParticipant.delete({
      where: { id: participantId },
    });

    // Revalidate relevant paths
    revalidatePath("/");
    revalidatePath("/participants");
    revalidatePath(`/participants/${tripParticipant.trip_id}`);

    return {
      success: true,
      message: "Uczestnik został usunięty",
      tripId: tripParticipant.trip_id,
    };
  } catch (error) {
    console.error("Error removing trip participant:", error);
    throw new Error("Nie udało się usunąć uczestnika");
  }
}
