"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function removeTripParticipant(participantId: number) {
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
      tripId: Number(tripParticipant.trip_id),
    };
  } catch (error) {
    console.error("Error removing trip participant:", error);
    throw new Error("Nie udało się usunąć uczestnika");
  }
}
