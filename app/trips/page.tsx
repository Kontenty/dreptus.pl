import type { Metadata } from "next";
import { Suspense } from "react";
import { TripsErrorBoundary } from "@/components/error-boundaries/TripsErrorBoundary";
import { TripsFilterSkeleton } from "@/components/skeletons/TripsFilterSkeleton";
import { TripsListSkeleton } from "@/components/skeletons/TripsListSkeleton";
import { TripsMapSkeleton } from "@/components/skeletons/TripsMapSkeleton";
import TripListFilterWrapper from "@/components/wrappers/TripListFilterWrapper";
import TripsListWrapper from "@/components/wrappers/TripsListWrapper";
import TripsMapWrapper from "@/components/wrappers/TripsMapWrapper";
import {
  getCachedLocations,
  getCachedTripsCount,
  getCachedTripsForMap,
} from "@/lib/db-cached";
import css from "./Trip.module.css";

export async function generateMetadata(): Promise<Metadata> {
  const count = await getCachedTripsCount();

  return {
    title: `Trasy (${count}) - Dreptus`,
    description: `Przeglądaj ${count} tras turystycznych z mapą i szczegółami.`,
  };
}

export default async function Trips({
  searchParams,
}: Readonly<{ searchParams: Promise<{ slug?: string }> }>) {
  const slug = (await searchParams)?.slug ?? "all";

  // Initiate all fetches without awaiting - enables true streaming
  const tripsPromise = getCachedTripsForMap(slug);
  const locationsPromise = getCachedLocations();
  const countPromise = getCachedTripsCount();

  return (
    <>
      <TripsErrorBoundary section="map">
        <Suspense fallback={<TripsMapSkeleton />}>
          <TripsMapWrapper tripsPromise={tripsPromise} />
        </Suspense>
      </TripsErrorBoundary>
      <div className={css.lists}>
        <div className="lg:pt-4" data-aos="fade-right">
          <TripsErrorBoundary section="filter">
            <Suspense fallback={<TripsFilterSkeleton />}>
              <TripListFilterWrapper
                locationsPromise={locationsPromise}
                countPromise={countPromise}
              />
            </Suspense>
          </TripsErrorBoundary>
        </div>
        <div
          className="bg-white rounded-md p-2 grow min-w-0 overflow-x-auto"
          data-aos="fade-left"
        >
          <TripsErrorBoundary section="list">
            <Suspense fallback={<TripsListSkeleton />}>
              <TripsListWrapper tripsPromise={tripsPromise} />
            </Suspense>
          </TripsErrorBoundary>
        </div>
      </div>
    </>
  );
}
