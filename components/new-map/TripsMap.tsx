"use client";

import { useState } from "react";
import type { TripFormMap } from "@/types";
import { GoogleMapView } from "./GoogleMapView";
import { TripInfoWindow } from "./TripInfoWindow";
import { TripMarker } from "./TripMarker";
import { TripMarkerCluster } from "./TripMarkerCluster";
import { TripPopupContent } from "./TripPopupContent";

export type TripsMapProps = {
  trips: TripFormMap[];
  size?: "sm" | "lg";
  /** Optional wrapper class (e.g. for rounding / shadow). */
  className?: string;
  mode?: "multiple" | "single";
};

/**
 * New map implementation based on @vis.gl/react-google-maps.
 * - Uses AdvancedMarker components for modern Google Maps markers
 * - InfoWindow popup for trip details
 * - Fits bounds automatically when trips change
 */
export function TripsMap({
  trips,
  size = "lg",
  className,
  mode,
}: TripsMapProps) {
  const [selectedTrip, setSelectedTrip] = useState<TripFormMap | null>(null);

  if (mode === "single") {
    const trip = trips[0];
    return (
      <GoogleMapView
        center={{ lat: Number(trip.lat), lng: Number(trip.lng) }}
        size="sm"
        className={className ?? "rounded-md overflow-hidden"}
        zoom={12}
      >
        <TripMarker trip={trip} />
      </GoogleMapView>
    );
  }

  return (
    <GoogleMapView
      size={size}
      className={className ?? "rounded-md overflow-hidden"}
    >
      <TripMarkerCluster
        trips={trips}
        onTripClick={(trip) => setSelectedTrip(trip)}
      />

      <TripInfoWindow
        trip={selectedTrip}
        onCloseClick={() => setSelectedTrip(null)}
      >
        <TripPopupContent trip={selectedTrip} />
      </TripInfoWindow>
    </GoogleMapView>
  );
}
