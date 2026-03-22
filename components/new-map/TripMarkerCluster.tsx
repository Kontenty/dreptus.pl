"use client";

import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { useMap } from "@vis.gl/react-google-maps";
import { useEffect, useRef } from "react";
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
  const clustererRef = useRef<MarkerClusterer | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);

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

  // Initialize clustering
  useEffect(() => {
    if (!map || !MarkerClusterer) {
      return;
    }

    // Clean up previous clusterer
    if (clustererRef.current) {
      clustererRef.current.clearMarkers();
    }

    // Create markers for clustering
    const markers: google.maps.Marker[] = trips.map((trip) => {
      const marker = new google.maps.Marker({
        position: trip.position,
        title: trip.title,
      });

      marker.addListener("click", () => {
        onTripClick?.(trip);
      });

      return marker;
    });

    // Create clusterer
    const clusterer = new MarkerClusterer({
      markers,
      map,
    });

    clustererRef.current = clusterer;
    markersRef.current = markers;

    // Cleanup on unmount
    return () => {
      clusterer.clearMarkers();
    };
  }, [map, trips, onTripClick]);

  return (
    <>
      {/* Render individual AdvancedMarkers for detailed interaction */}
      {trips.map((trip) => (
        <TripMarker
          key={trip.ID}
          trip={trip}
          onClick={() => onTripClick?.(trip)}
        />
      ))}
    </>
  );
}
