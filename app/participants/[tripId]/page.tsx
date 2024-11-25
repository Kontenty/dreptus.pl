import React from "react";

import MainLayout from "@/components/layout/MainLayout";
import { ssrClient, graphql } from "@/lib/graphql/urqlClient";
import { notFound } from "next/navigation";
import ParticipantsOnTrip from "@/components/ParticipantsOnTrip";

const query = graphql(`
  query GetParticipantsOnTrip($trip_id: Int!) {
    participantsOnTrip(id: $trip_id) {
      id
      report_date
      answers
      participant {
        name
        origin
      }
      trip {
        post_title
      }
    }
  }
`);

const cleanTitle = (title: string | undefined) =>
  title ? title.replace("<br>", " ").replaceAll("  ", " ") : "";

const getData = async (id: string) => {
  const tripId = Number(id);
  if (typeof tripId !== "number" || isNaN(tripId)) {
    return null;
  }
  const { data } = await ssrClient.query(query, { trip_id: tripId });

  if (!data?.participantsOnTrip) return null;
  return data.participantsOnTrip.map((el) => ({ ...el, ...el?.participant }));
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
