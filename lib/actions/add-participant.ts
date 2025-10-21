"use server";

import { revalidatePath } from "next/cache";

import * as v from "valibot";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const schema = v.object({
  name: v.pipe(v.string(), v.nonEmpty()),
  origin: v.pipe(v.string(), v.nonEmpty()),
  answers: v.pipe(v.string(), v.nonEmpty()),
  tripId: v.number(),
  date: v.pipe(v.string(), v.nonEmpty()),
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

  // Validate input data
  const result = v.safeParse(schema, data);
  if (!result.success) {
    const errorMessages = result.issues
      .map((issue) => issue.message)
      .join(", ");
    throw new Error(`Nieprawidłowe dane: ${errorMessages}`);
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
