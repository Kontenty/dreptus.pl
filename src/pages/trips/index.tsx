import { InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import TripListFilter from "components/TripListFilter";
import { getLocations, getTripsForMap } from "lib/db";
import TripsList from "components/TripsList";
import { TripsMap } from "components/map/TripsMap";
import { locationsList } from "lib/data";
import { sortTrips } from "lib/utils";

export const getStaticProps = async () => {
  const locations = await getLocations();
  const tripsData = await getTripsForMap();
  const trips = tripsData
    .map((trip) => ({
      ...trip,
      position: { lat: Number(trip.lat), lng: Number(trip.lng) },
      lat: Number(trip.lat),
      lng: Number(trip.lng),
      locations: trip.category_names
        .split(",")
        .filter((name) => locationsList.includes(name.toLowerCase()))
        .toString(),
      dolinaBugu: trip.category_slugs.includes("dolina-bugu"),
    }))
    .sort(sortTrips);
  return {
    props: {
      locations: locations ? JSON.parse(JSON.stringify(locations)) : [],
      trips: trips || [],
    },
  };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export default function Trips({ locations, trips }: Props) {
  const router = useRouter();
  const { slug } = router.query;
  const [data, setData] = useState<typeof trips>();

  useEffect(() => {
    setData(trips);
  }, [trips]);

  useEffect(() => {
    if (slug === "all") {
      setData(trips);
    } else if (typeof slug === "string") {
      const newData = trips?.filter((d) => d.category_slugs.includes(slug));
      setData(newData);
    }
  }, [slug, trips]);

  return (
    <>
      <TripsMap trips={data || trips} />
      <div className="flex gap-10 w-[1100px] mx-auto py-4 overflow-x-auto">
        <div className="lg:pt-4">
          <TripListFilter locationsList={locations} />
        </div>
        <div className="bg-white rounded-md p-2 flex-grow">
          <TripsList trips={data || trips} />
        </div>
      </div>
    </>
  );
}
