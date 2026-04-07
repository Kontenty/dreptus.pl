import { Suspense } from "react";
import { TripsErrorBoundary } from "@/components/error-boundaries/TripsErrorBoundary";
import { TripsFilterSkeleton } from "@/components/skeletons/TripsFilterSkeleton";
import { TripsListSkeleton } from "@/components/skeletons/TripsListSkeleton";
import { TripsMapSkeleton } from "@/components/skeletons/TripsMapSkeleton";
import TripListFilterWrapper from "@/components/wrappers/TripListFilterWrapper";
import TripsListWrapper from "@/components/wrappers/TripsListWrapper";
import TripsMapWrapper from "@/components/wrappers/TripsMapWrapper";
import { getLocations, getTripsCount, getTripsForMap } from "@/lib/db";
import css from "./Trip.module.css";

export default async function Trips({
  searchParams,
}: Readonly<{ searchParams: Promise<{ slug?: string }> }>) {
  const slug = (await searchParams)?.slug ?? "all";

  // Initiate all fetches without awaiting - enables true streaming
  const tripsPromise = getTripsForMap(slug);
  const locationsPromise = getLocations();
  const countPromise = getTripsCount();

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
        <div className="bg-white rounded-md p-2 grow" data-aos="fade-left">
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
