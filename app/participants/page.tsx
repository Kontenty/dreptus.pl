export const revalidate = 86400; // 24 hours

import TripsWithParticipantsList from "@/components/TripsWithParticipantsList";
import Main from "@/components/ui/Main";
import { getTripsParticipants } from "@/lib/db";

const getData = async () => {
  const tripsData = await getTripsParticipants();
  return tripsData;
};

export default async function Participants() {
  const trips = await getData();

  return (
    <Main>
      <article
        className="flex flex-col gap-2 min-w-[670px] overflow-x-auto"
        data-aos="fade-up"
      >
        <div>
          <h1 className="page-title">Lista uczestników tras</h1>
          <TripsWithParticipantsList trips={trips ?? []} />
        </div>
      </article>
    </Main>
  );
}
