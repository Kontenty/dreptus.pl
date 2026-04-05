export const revalidate = 86400; // 24 hours

import { Suspense } from "react";
import MapView from "@/components/map/MapView";
import TripListFilter from "@/components/TripListFilter";
import TripsList from "@/components/TripsList";
import { locationsList } from "@/lib/data";
import { getLocations, getTripsCount, getTripsForMap } from "@/lib/db";
import { sortTrips } from "@/lib/utils";
import type { TripFormMap } from "@/types";
import css from "./Trip.module.css";

export default async function Trips({
  searchParams,
}: Readonly<{ searchParams: Promise<{ slug?: string }> }>) {
  const slug = (await searchParams)?.slug ?? "all";
  const rawTrips = await getTripsForMap(slug);
  const rawLocations = await getLocations();
  const tripsCount = await getTripsCount();
  const locationsListForFilter = rawLocations.map((l) => ({
    ...l,
    count: l.count.toString(),
  }));
  const trips: TripFormMap[] =
    rawTrips
      ?.map((trip) => ({
        id: trip.ID,
        ID: trip.ID,
        title: trip.title,
        slug: trip.slug,
        length: trip.length,
        pk: trip.pk,
        lat: trip.lat.toString(),
        lng: trip.lng.toString(),
        type: trip.type,
        number: trip.number,
        category_names: trip.category_names,
        category_slugs: trip.category_slugs,
        thumb_url: trip.thumb_url,
        position: { lat: Number(trip.lat), lng: Number(trip.lng) },
        locations: trip.category_names
          ?.split(",")
          .filter((name) => locationsList.includes(name.toLowerCase()))
          .toString(),
        dolinaBugu: !!trip.category_slugs?.includes("dolina-bugu"),
      }))
      .sort(sortTrips) ?? [];
  return (
    <>
      <Suspense
        fallback={
          <div className="h-[550px] w-full rounded-md bg-slate-100 text-slate-700 flex items-center justify-center animate-pulse">
            Loading...
          </div>
        }
      >
        <MapView trips={trips} />
      </Suspense>
      <div className={css.lists}>
        <div className="lg:pt-4" data-aos="fade-right">
          <TripListFilter
            count={tripsCount}
            locationsList={locationsListForFilter}
          />
        </div>
        <div className="bg-white rounded-md p-2 grow" data-aos="fade-left">
          <TripsList trips={trips} />
        </div>
      </div>
    </>
  );
}
