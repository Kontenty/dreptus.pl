import React from "react";
import { type NextPage } from "next";
// import { signIn, signOut, useSession } from "next-auth/react";
// import { Button } from "primereact/button";
import ParticipantsOnTrip from "components/admin/ParticipantsOnTrip";
import AddParticipantOnTrip from "components/admin/AddParticipantOnTrip";
import { getTrips } from "lib/db";
import { sortTrips } from "lib/utils";

type Props = {
  trips: {
    label: string;
    value: number;
  }[];
};

const AdminPage: NextPage<Props> = ({ trips }) => {
  // const { data: session, status } = useSession();
  return (
    <div className="mt-24">
      <div className="flex mx-4 gap-4">
        <div className="flex-grow">
          <AddParticipantOnTrip tripsList={trips} />
          <ParticipantsOnTrip tripId={11870} />
        </div>
      </div>
    </div>
  );
  /* if (status !== "authenticated") {
    return (
      <div className="center-hv mt-24 mx-16">
        <Button onClick={() => signIn()}>Zaloguj się</Button>
      </div>
    );
  }
  return (
    <div className="mt-24">
      {session?.user.role === "admin" ? (
        <div className="flex mx-4 gap-4">
          <div>
            <Button onClick={() => signOut()}>Wyloguj się</Button>
          </div>
          <div className="flex-grow">
            <UsersAdmin />
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-3xl mb-4">Nie masz dostępu do tej strony</h2>
          <Button onClick={() => signOut()}>Wyloguj się</Button>
        </div>
      )}
    </div>
  ); */
};

export default AdminPage;

export const getStaticProps = async () => {
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
    },
  };
};
