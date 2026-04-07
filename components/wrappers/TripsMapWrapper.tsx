"use client";

import { use } from "react";
import type { TripFormMap } from "@/types";
import { MapView } from "../map";

interface Props {
  tripsPromise: Promise<TripFormMap[]>;
}

export default function TripsMapWrapper({ tripsPromise }: Props) {
  const trips = use(tripsPromise);

  return <MapView trips={trips} />;
}
