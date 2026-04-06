"use client";

import { use } from "react";
import TripsList from "@/components/TripsList";
import type { TripFormMap } from "@/types";

interface Props {
  tripsPromise: Promise<TripFormMap[]>;
}

export default function TripsListWrapper({ tripsPromise }: Props) {
  const trips = use(tripsPromise);

  return <TripsList trips={trips} />;
}
