export const revalidate = 86400; // 24 hours

import { Breadcrumbs, BreadcrumbsItem } from "@heroui/react";
import { notFound } from "next/navigation";
import ParticipantsOnTrip from "@/components/ParticipantsOnTrip";
import Main from "@/components/ui/Main";
import { getParticipantById } from "@/lib/db";

const cleanTitle = (title: string | undefined) =>
  title ? title.replace("<br>", " ").replaceAll("  ", " ") : "";

const getData = async (id: string) => {
  const tripId = Number(id);
  if (Number.isNaN(tripId)) return null;
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
    <Main>
      <Breadcrumbs>
        <BreadcrumbsItem href="/participants">Uczestnicy</BreadcrumbsItem>
        <BreadcrumbsItem>
          {cleanTitle(participantsList[0]?.trip?.post_title)}
        </BreadcrumbsItem>
      </Breadcrumbs>
      <header>
        <h2 className="text-xl text-slate-700">Lista uczestników</h2>
        <h1 className="text-2xl">
          {cleanTitle(participantsList[0]?.trip?.post_title)}
        </h1>
      </header>
      <ParticipantsOnTrip participantsList={participantsList} />
    </Main>
  );
};

export default TripParticipants;
