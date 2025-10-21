"use server";

import { revalidatePath } from "next/cache";

import * as v from "valibot";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const schema = v.object({
  name: v.pipe(v.string(), v.nonEmpty()),
  origin: v.pipe(v.string(), v.nonEmpty()),
  answers: v.pipe(v.string(), v.nonEmpty()),
  id: v.number(),
  participant_id: v.number(),
  report_date: v.pipe(v.string(), v.nonEmpty()),
});

type EditTripParticipantData = {
  name: string;
  origin: string;
  id: number;
  participant_id: number;
  trip_id: number;
  report_date: string;
  answers: string;
};

export async function editTripParticipant(data: EditTripParticipantData) {
  // Check authentication using NextAuth v5
  const session = await auth();
  if (!session?.user?.role || session.user.role !== "admin") {
    throw new Error("Unauthorized: Admin access required");
  }

  // Validate input data
  const result = v.safeParse(schema, data);
  if (!result.success) {
    const errorMessages = result.issues
      .map((issue) => issue.message)
      .join(", ");
    throw new Error(`Nieprawidłowe dane: ${errorMessages}`);
  }

  try {
    const { name, origin, id, participant_id, report_date, answers } = data;

    // Find the participant
    const participant = await prisma.participant.findUnique({
      where: { id: participant_id },
    });

    if (!participant) {
      throw new Error("Uczestnik nie został znaleziony");
    }

    // Update participant if name or origin changed
    if (participant.name !== name || participant.origin !== origin) {
      await prisma.participant.update({
        where: { id: participant_id },
        data: { name, origin },
      });
    }

    // Update trip participant
    const updatedTripParticipant = await prisma.tripParticipant.update({
      where: { id },
      data: {
        report_date,
        answers,
      },
      include: {
        participant: true,
      },
    });

    // Revalidate relevant paths
    revalidatePath("/");
    revalidatePath("/participants");
    revalidatePath(`/participants/${updatedTripParticipant.trip_id}`);

    return {
      success: true,
      tripParticipant: {
        id: updatedTripParticipant.id,
        participant_id: updatedTripParticipant.participant_id,
        trip_id: updatedTripParticipant.trip_id,
        answers: updatedTripParticipant.answers,
        report_date: updatedTripParticipant.report_date,
        name: updatedTripParticipant.participant.name,
        origin: updatedTripParticipant.participant.origin,
      },
    };
  } catch (error) {
    console.error("Error editing trip participant:", error);
    throw new Error("Nie udało się zapisać zmian");
  }
}
