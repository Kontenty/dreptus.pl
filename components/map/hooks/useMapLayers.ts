"use client";

import type maplibregl from "maplibre-gl";
import { useEffect } from "react";
import type { TripFormMap } from "@/types";
import { fitToTrips } from "../utils/geoJsonUtils";

interface UseMapLayersOptions {
  mapRef: React.MutableRefObject<maplibregl.Map | null>;
  isMapReady: React.RefObject<boolean>;
  trips: TripFormMap[];
  mode?: "multiple" | "single";
}

export function useMapLayers({
  mapRef,
  isMapReady,
  trips,
  mode,
}: UseMapLayersOptions): void {
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !isMapReady.current) return;

    const source = map.getSource("markers") as
      | maplibregl.GeoJSONSource
      | undefined;
    if (!source) return;

    source.setData({
      type: "FeatureCollection",
      features: trips.map((trip) => {
        const icon = trip.dolinaBugu
          ? "/image/pieszo-dolina.png"
          : trip.type === "bike"
            ? "/image/icons/cyclist-circle.svg"
            : "/image/icons/footman-circle.svg";

        return {
          type: "Feature",
          properties: {
            id: trip.ID,
            title: trip.title,
            slug: trip.slug,
            thumb_url: trip.thumb_url,
            lat: trip.lat,
            lng: trip.lng,
            type: trip.type,
            dolinaBugu: trip.dolinaBugu,
            icon,
          },
          geometry: {
            type: "Point",
            coordinates: [Number(trip.lng), Number(trip.lat)],
          },
        };
      }),
    });
  }, [mapRef, isMapReady, trips]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !isMapReady.current) return;

    fitToTrips(map, trips, mode);
  }, [mapRef, isMapReady, trips, mode]);
}
