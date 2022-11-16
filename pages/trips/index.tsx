// import Link from "next/link";
import { GetStaticProps } from "next";
import LocationsList from "components/LocationsList";
import { getLocations, getTripsForMap } from "lib/db";
import { TripFormMap } from "types";
import TripsList from "components/TripsList";
import { locationsList } from "lib/data";
// import Map from "components/map/at-gmap-api";

export const getStaticProps: GetStaticProps = async () => {
  const locations = await getLocations();
  const tripsData = await getTripsForMap();
  const trips = tripsData.map((trip) => ({
    ...trip,
    locations: trip.category_names
      .split(",")
      .filter((name) => locationsList.includes(name.toLowerCase()))
      .toString(),
  }));
  return {
    props: {
      locations: locations ? JSON.parse(JSON.stringify(locations)) : [],
      trips: trips || [],
    }, // will be passed to the page component as props
  };
};

interface Props {
  locations: { name: string; count: number; slug: string }[];
  trips: TripFormMap[];
}

export default function Trips({ locations, trips }: Props) {
  return (
    <div className="flex gap-10 w-[1100px] mx-auto py-4">
      <div className="lg:pt-4">
        <h2 className="text-lg mb-1">Filtry</h2>
        <LocationsList list={locations} />
      </div>
      <div className="bg-white rounded-md p-2 flex-grow">
        <TripsList trips={trips} />
      </div>
    </div>
  );
}
