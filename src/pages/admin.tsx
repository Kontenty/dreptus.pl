import React, { useState } from "react";
import { type NextPage } from "next";
import { Dropdown } from "primereact/dropdown";
import ParticipantsOnTrip from "components/admin/ParticipantsOnTrip";
import AddParticipantOnTrip from "components/admin/AddParticipantOnTrip";
import { getTrips } from "lib/db";
import { sortTrips } from "lib/utils";
import prismaClient from "src/lib/prisma";
import Main from "components/layout/MainLayout";

type Props = {
  trips: {
    label: string;
    value: number;
  }[];
  tripsParticipants: {
    label: string;
    value: number;
  }[];
};

const AdminPage: NextPage<Props> = ({ trips, tripsParticipants }) => {
  const [selectedTripId, setSelectedTripId] = useState<number | null>(null);
  return (
    <Main>
      <AddParticipantOnTrip tripsList={trips} />
      <div>
        <h2 className="text-2xl mb-2">Zarządzaj uczestnikami</h2>
        <div className="flex flex-col mb-4 w-[600px]">
          <label>Trasa</label>
          <Dropdown
            filter
            onChange={(e) => setSelectedTripId(e.value)}
            options={tripsParticipants}
            placeholder="Wybierz trasę"
            value={selectedTripId}
          />
        </div>
        <ParticipantsOnTrip tripId={selectedTripId} />
      </div>
    </Main>
  );
};

export default AdminPage;

export const getServerSideProps = async () => {
  // const t = await getParticipantsPostsList();
  const tripsParticipantsData = await prismaClient.wp_posts.findMany({
    where: { post_status: "publish", post_type: "post" },
  });
  const tripsParticipants = tripsParticipantsData
    .map((t) => ({
      ...t,
      number: t.post_title.split(" ").at(0),
      value: t.ID,
      label: `${t.post_title.replace(/,?<br> ?/, ", ")}`,
    }))
    .sort(sortTrips);
  const tripsData = await getTrips(10000);
  const trips = tripsData
    .map((t) => ({ ...t, number: t.wp_postmeta[0].meta_value }))
    .sort(sortTrips)
    .map((t) => ({
      label: `${t.number} ${t.post_title.replace("<br>", ", ")}`,
      value: t.ID,
    }));
  return {
    props: {
      trips: trips || [],
      tripsParticipants,
    },
  };
};
