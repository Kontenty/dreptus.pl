import React, { useState } from "react";
import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import ParticipantsOnTrip from "components/admin/ParticipantsOnTrip";
import AddParticipantOnTrip from "components/admin/AddParticipantOnTrip";
import { getTrips } from "lib/db";
import { sortTrips } from "lib/utils";
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
          <label htmlFor="trip-select">Trasa</label>
          <Dropdown
            filter
            id="trip-select"
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
  const tripsParticipantsData = await getTrips();
  const tripsParticipants = tripsParticipantsData
    .map((t) => ({
      ...t,
      number: t.wp_postmeta[0].meta_value,
      value: t.ID,
      label: `${t.wp_postmeta[0].meta_value} ${t.post_title.replace(
        /,?<br> ?/,
        ", "
      )}`,
    }))
    .sort(sortTrips);
  return {
    props: {
      tripsParticipants,
    },
  };
};
