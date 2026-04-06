"use client";

import { use } from "react";
import TripListFilter from "@/components/TripListFilter";

interface Location {
  name: string;
  count: number;
  slug: string;
}

interface Props {
  locationsPromise: Promise<Location[]>;
  countPromise: Promise<number>;
}

export default function TripListFilterWrapper({
  locationsPromise,
  countPromise,
}: Props) {
  const rawLocations = use(locationsPromise);
  const tripsCount = use(countPromise);

  const locationsListForFilter = rawLocations.map((l) => ({
    ...l,
    count: l.count.toString(),
  }));

  return (
    <TripListFilter count={tripsCount} locationsList={locationsListForFilter} />
  );
}
