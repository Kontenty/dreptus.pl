"use client";

import { type Marker, MarkerClusterer } from "@googlemaps/markerclusterer";
import { useMap } from "@vis.gl/react-google-maps";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { TripFormMap } from "@/types";
import { TripMarker } from "./TripMarker";

export type TripMarkerClusterProps = {
  trips: TripFormMap[];
  onTripClick?: (trip: TripFormMap) => void;
  /** Automatically fit map bounds to provided trips (default: true) */
  autoFitBounds?: boolean;
};

export function TripMarkerCluster({
  trips,
  onTripClick,
  autoFitBounds = true,
}: TripMarkerClusterProps) {
  const map = useMap();
  const [markers, setMarkers] = useState<{
    [key: string | number]: Marker;
  }>({});

  // Auto-fit bounds
  useEffect(() => {
    if (!autoFitBounds || !map || trips.length === 0) {
      return;
    }

    const bounds = new google.maps.LatLngBounds();
    for (const trip of trips) {
      bounds.extend(trip.position);
    }
    map.fitBounds(bounds);
  }, [autoFitBounds, map, trips]);

  // Create the MarkerClusterer once the map is available
  const clusterer = useMemo(() => {
    if (!map) return null;
    return new MarkerClusterer({ map });
  }, [map]);

  // Sync markers to clusterer whenever they change
  useEffect(() => {
    if (!clusterer) return;
    clusterer.clearMarkers();
    clusterer.addMarkers(Object.values(markers));
  }, [clusterer, markers]);

  // Ref callback to track markers registered on the map
  const setMarkerRef = useCallback(
    (marker: Marker | null, key: string | number) => {
      setMarkers((markers) => {
        if ((marker && markers[key]) || (!marker && !markers[key]))
          return markers;

        if (marker) {
          return { ...markers, [key]: marker };
        }
        const { [key]: _, ...rest } = markers;
        return rest;
      });
    },
    [],
  );

  return (
    <>
      {trips.map((trip) => (
        <TripMarker
          key={trip.ID}
          trip={trip}
          onClick={() => onTripClick?.(trip)}
          setMarkerRef={setMarkerRef}
        />
      ))}
    </>
  );
}
