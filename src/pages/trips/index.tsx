import { InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { GoogleProvider } from "context";

import TripListFilter from "components/TripListFilter";
import { getLocations, getTripsCount, getTripsForMap } from "lib/db";
import TripsList from "components/TripsList";
import { TripsMap } from "components/map/TripsMap";
import { locationsList } from "lib/data";
import { sortTrips } from "lib/utils";
import css from "src/styles/Trip.module.css";

export const getStaticProps = async () => {
  const [count, locations, tripsData] = await Promise.all([
    getTripsCount(),
    getLocations(),
    getTripsForMap(),
  ]);
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
      count,
      locations: locations || [],
      trips: trips || [],
      revalidate: 60 * 60 * 12,
    },
  };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;
export type TripsForMap = Props["trips"];

export default function Trips({ count, locations, trips }: Readonly<Props>) {
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
    <GoogleProvider>
      <TripsMap trips={data ?? trips} />
      <div className={css.lists}>
        <div className="lg:pt-4" data-aos="fade-right">
          <TripListFilter count={count} locationsList={locations} />
        </div>
        <div className="bg-white rounded-md p-2 flex-grow" data-aos="fade-left">
          <TripsList trips={data ?? trips} />
        </div>
      </div>
    </GoogleProvider>
  );
}
