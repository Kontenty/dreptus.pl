"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import * as Yup from "yup";

const schema = Yup.object({
  name: Yup.string().required(),
  origin: Yup.string().required(),
  answers: Yup.string().required(),
  id: Yup.number().required(),
  participant_id: Yup.number().required(),
  report_date: Yup.string().required(),
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

  try {
    // Validate input data
    await schema.validate(data);
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      throw new Error("Nieprawidłowe dane: " + error.message);
    }
    throw new Error("Błąd walidacji danych");
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
