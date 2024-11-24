import TripListFilter from "@/components/TripListFilter";
import { GoogleProvider } from "@/lib/context";
import TripsList from "@/components/TripsList";
import { TripsMap } from "@/components/map/TripsMap";
import { locationsList } from "@/lib/data";
import { sortTrips } from "@/lib/utils";
import css from "./Trip.module.css";
import { ssrClient, graphql } from "@/lib/graphql/urqlClient";
import { TripFormMap } from "@/types";

const query = graphql(`
  query GetTripDetailedList($location: String) {
    tripsDetailList(location: $location) {
      ID
      title
      slug
      length
      pk
      lat
      lng
      type
      number
      category_names
      category_slugs
      thumb_url
    }
    locations {
      name
      count
      slug
    }
    tripsCount
  }
`);
type Props = {
  searchParams: Promise<{
    slug?: string;
  }>;
};

export default async function Trips({ searchParams }: Readonly<Props>) {
  const slug = (await searchParams)?.slug ?? "all";
  const { data } = await ssrClient.query(query, { location: slug });
  const trips: TripFormMap[] =
    data?.tripsDetailList
      ?.map((trip) => ({
        ...trip,
        position: { lat: Number(trip.lat), lng: Number(trip.lng) },
        locations: trip?.category_names
          ?.split(",")
          .filter((name) => locationsList.includes(name.toLowerCase()))
          .toString(),
        dolinaBugu: !!trip?.category_slugs?.includes("dolina-bugu"),
      }))
      .sort(sortTrips) ?? [];

  return (
    <GoogleProvider>
      <TripsMap trips={trips} />
      <div className={css.lists}>
        <div className="lg:pt-4" data-aos="fade-right">
          <TripListFilter
            count={data?.tripsCount ?? 230}
            locationsList={data?.locations}
          />
        </div>
        <div className="bg-white rounded-md p-2 flex-grow" data-aos="fade-left">
          <TripsList trips={trips} />
        </div>
      </div>
    </GoogleProvider>
  );
}
