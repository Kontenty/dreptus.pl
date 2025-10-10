import React from "react";

import MainLayout from "@/components/layout/MainLayout";
import { getParticipantById } from "@/lib/db";
import { notFound } from "next/navigation";
import ParticipantsOnTrip from "@/components/ParticipantsOnTrip";

const cleanTitle = (title: string | undefined) =>
  title ? title.replace("<br>", " ").replaceAll("  ", " ") : "";

const getData = async (id: string) => {
  const tripId = Number(id);
  if (isNaN(tripId)) return null;
  const participants = await getParticipantById(tripId);
  if (!participants?.length) return null;
  return participants.map((el) => ({ ...el, ...el.participant }));
};

type Props = {
  params: Promise<{
    tripId: string;
  }>;
};
const TripParticipants = async ({ params }: Props) => {
  const tripId = (await params)?.tripId;
  const participantsList = await getData(tripId);

  if (!participantsList) {
    return notFound();
  }

  return (
    <MainLayout>
      <header>
        <h2 className="text-xl text-slate-700">Lista uczestników</h2>
        <h1 className="text-2xl">
          {cleanTitle(participantsList[0]?.trip?.post_title)}
        </h1>
      </header>
      <ParticipantsOnTrip participantsList={participantsList} />
    </MainLayout>
  );
};

export default TripParticipants;
