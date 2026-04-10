"use client";

import dynamic from "next/dynamic";
import { use } from "react";
import { TripsMapSkeleton } from "@/components/skeletons/TripsMapSkeleton";
import type { TripFormMap } from "@/types";

const MapView = dynamic(() => import("../map/MapView"), {
  ssr: false,
  loading: () => <TripsMapSkeleton />,
});

interface Props {
  tripsPromise: Promise<TripFormMap[]>;
}

export default function TripsMapWrapper({ tripsPromise }: Props) {
  const trips = use(tripsPromise);

  return <MapView trips={trips} />;
}
