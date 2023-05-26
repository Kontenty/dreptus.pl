import React, { useState } from "react";
import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import ParticipantsOnTrip from "components/admin/ParticipantsOnTrip";
import AddParticipantOnTrip from "components/admin/AddParticipantOnTrip";
import { sortTrips } from "lib/utils";
import prismaClient from "src/lib/prisma";
import Main from "components/layout/MainLayout";

type Props = {
  tripsParticipants: {
    label: string;
    value: number;
  }[];
};

const AdminPage: NextPage<Props> = ({ tripsParticipants }) => {
  const [selectedTripId, setSelectedTripId] = useState<number | null>(null);

  const { data: session, status } = useSession();
  if (status !== "authenticated") {
    return (
      <div className="center-hv mt-24 mx-16">
        <Button onClick={() => signIn()}>Zaloguj się</Button>
      </div>
    );
  }

  if (session?.user.role !== "admin") {
    return (
      <div>
        <h2 className="text-3xl mb-4">Nie masz dostępu do tej strony</h2>
        <Button onClick={() => signOut()}>Wyloguj się</Button>
      </div>
    );
  }
  return (
    <Main>
      <AddParticipantOnTrip tripsList={tripsParticipants} />
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
  return {
    props: {
      tripsParticipants,
    },
  };
};
