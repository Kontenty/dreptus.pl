import Main from "@/components/layout/MainLayout";
import { sortTrips } from "@/lib/utils";
import TripsWithParticipantsList from "@/components/TripsWithParticipantsList";
import { getTripsParticipants } from "@/lib/db";
import { ParticipantOnTrip } from "@/types";

const dummyListEl = {
  id: 0,
  trip_id: 0,
  report_date: null,
  pptCount: null,
  number: "",
};

const chunkData = (trips: ParticipantOnTrip[] | null | undefined) => {
  if (!trips) {
    return null;
  }
  const chunked = [...trips].sort(sortTrips).reduce((result, current) => {
    const extendArray = (position: number) => {
      if (!result[position]) {
        result[position] = [];
      }
      result[position].push(current);
    };
    const { number } = current;
    if (typeof number !== "string") {
      return result;
    }
    if (/^[A-Z]\d{2}/.test(number)) {
      extendArray(0);
    } else if (/^\d{3}/.test(number)) {
      extendArray(1);
    } else if (/^#\d{2}/.test(number)) {
      extendArray(2);
    }
    return result;
  }, [] as (typeof trips)[]);
  chunked.unshift([
    { ...dummyListEl, post_title: "Z Dreptusiem po Dolinie Bugu:", id: 100001 },
  ]);
  chunked.splice(2, 0, [
    { ...dummyListEl, post_title: "Z Dreptusiem po Polsce:", id: 100002 },
  ]);
  return chunked.flat() || null;
};

const getData = async () => {
  const tripsData = await getTripsParticipants();
  if (!tripsData) {
    return null;
  }
  const trips = chunkData(tripsData);
  return trips;
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
