"use server";

import { prisma } from "@/lib/prisma";

export async function getParticipants() {
  try {
    const participants = await prisma.participant.findMany({
      select: { id: true, name: true, origin: true },
      orderBy: { name: "asc" },
    });

    return participants;
  } catch (error) {
    console.error("Error fetching participants:", error);
    throw new Error("Nie udało się pobrać uczestników");
  }
}
