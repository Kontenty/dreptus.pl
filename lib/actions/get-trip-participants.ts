"use server";

import { prisma } from "@/lib/prisma";

export async function getTripParticipants(tripId: number) {
  try {
    const data = await prisma.wp_posts.findUnique({
      include: {
        trip_participant: {
          include: { participant: true },
          orderBy: { report_date: "desc" },
        },
      },
      where: { ID: tripId },
    });

    if (!data) {
      throw new Error("Trasa nie została znaleziona");
    }

    const tripParticipants = {
      name: data.post_title?.replace("<br>", " ").replaceAll("  ", "") || "",
      participants: data.trip_participant.map((tp) => ({
        id: tp.id,
        participant_id: tp.participant_id,
        trip_id: tp.trip_id,
        answers: tp.answers,
        report_date: tp.report_date,
        name: tp.participant.name,
        origin: tp.participant.origin,
      })),
    };

    return {
      success: true,
      tripParticipants,
    };
  } catch (error) {
    console.error("Error fetching trip participants:", error);
    throw new Error("Nie udało się pobrać danych trasy");
  }
}
