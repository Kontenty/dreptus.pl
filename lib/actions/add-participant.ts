"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import * as Yup from "yup";

const schema = Yup.object({
  name: Yup.string().required("Pole jest wymagane"),
  origin: Yup.string().required("Pole jest wymagane"),
  answers: Yup.string().required("Pole jest wymagane"),
  tripId: Yup.number().required("Pole jest wymagane"),
  date: Yup.string().required("Pole jest wymagane"),
});

type AddParticipantData = {
  name: string;
  origin: string;
  tripId: number;
  date: string;
  answers: string;
};

export async function addParticipant(data: AddParticipantData) {
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
    const { name, origin, tripId, date, answers } = data;

    // Find existing participant or create new one
    const participant =
      (await prisma.participant.findFirst({
        where: { name, origin },
      })) ??
      (await prisma.participant.create({
        data: {
          name,
          origin,
        },
      }));

    // Create trip participant
    const newTripParticipant = await prisma.tripParticipant.create({
      data: {
        participant_id: participant.id,
        report_date: date,
        trip_id: tripId,
        answers: answers,
      },
    });

    // Revalidate relevant paths
    revalidatePath("/");
    revalidatePath("/participants");
    revalidatePath(`/participants/${tripId}`);

    return {
      success: true,
      tripParticipant: newTripParticipant,
      participant: participant,
    };
  } catch (error) {
    console.error("Error adding participant:", error);
    throw new Error("Nie udało się dodać uczestnika");
  }
}
