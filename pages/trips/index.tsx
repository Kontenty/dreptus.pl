import { InferGetStaticPropsType } from "next";

import LocationsList from "components/LocationsList";
import { getLocations, getTripsForMap } from "lib/db";
import TripsList from "components/TripsList";
import Map from "components/map/at-gmap-api";
import { locationsList } from "lib/data";
import TripMarkerCluster from "components/map/at-gmap-api/TripMarkerCluster";

export const getStaticProps = async () => {
  const locations = await getLocations();
  const tripsData = await getTripsForMap();
  const trips = tripsData.map((trip) => ({
    ...trip,
    lat: Number(trip.lat),
    lng: Number(trip.lng),
    locations: trip.category_names
      .split(",")
      .filter((name) => locationsList.includes(name.toLowerCase()))
      .toString(),
    dolinaBugu: trip.category_slugs.includes("dolina-bugu"),
  }));
  return {
    props: {
      locations: locations ? JSON.parse(JSON.stringify(locations)) : [],
      trips: trips || [],
    },
  };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export default function Trips({ locations, trips }: Props) {
  return (
    <>
      <Map
        center={{ lat: 52, lng: 19 }}
        zoom={6}
        containerStyle={{ width: "100%", height: "550px" }}
      >
        <TripMarkerCluster trips={trips} />
      </Map>
      <div className="flex gap-10 w-[1100px] mx-auto py-4">
        <div className="lg:pt-4">
          <h2 className="text-lg mb-1">Filtry</h2>
          <LocationsList list={locations} />
        </div>
        <div className="bg-white rounded-md p-2 flex-grow">
          <TripsList trips={trips} />
        </div>
      </div>
    </>
  );
}
