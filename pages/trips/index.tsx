import { InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import LocationsList from "components/LocationsList";
import { getLocations, getTripsForMap } from "lib/db";
import TripsList from "components/TripsList";
import Map from "components/map/at-gmap-api";
import { locationsList } from "lib/data";
import TripMarkerCluster from "components/map/at-gmap-api/TripMarkerCluster";

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
    .sort((a, b) => {
      const is1Hash = a.number.charAt(0) === "#";
      const is2Hash = b.number.charAt(0) === "#";
      if (is1Hash && is2Hash) {
        return Number(a.number.replace("#", "")) <
          Number(b.number.replace("#", ""))
          ? -1
          : 1;
      }
      if (is1Hash) return 1;
      if (is2Hash) return -1;
      const n1 = Number(a.number);
      const n2 = Number(b.number);
      if (n1 < n2) {
        return -1;
      } else if (n1 > n2) {
        return 1;
      }
      return 0;
    });
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
    if (slug === "all") setData(trips);
    else if (typeof slug === "string") {
      const newData = trips?.filter((d) => d.category_slugs.includes(slug));
      setData(newData);
    }
  }, [slug, trips]);

  return (
    <>
      <Map
        center={{ lat: 52, lng: 19 }}
        zoom={6}
        containerStyle={{ width: "100%", height: "550px" }}
        options={{}}
      >
        <TripMarkerCluster trips={data || trips} />
      </Map>
      <div className="flex gap-10 w-[1100px] mx-auto py-4">
        <div className="lg:pt-4">
          <h2 className="text-lg mb-1">Filtry</h2>
          <LocationsList list={locations} />
        </div>
        <div className="bg-white rounded-md p-2 flex-grow">
          <TripsList trips={data || trips} />
        </div>
      </div>
    </>
  );
}
