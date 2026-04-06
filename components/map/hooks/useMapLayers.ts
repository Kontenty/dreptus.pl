"use client";

import type maplibregl from "maplibre-gl";
import { useEffect } from "react";
import type { TripFormMap } from "@/types";
import { fitToTrips, tripToGeoJSONFeature } from "../utils/geoJsonUtils";

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
      features: trips.map(tripToGeoJSONFeature),
    });

    fitToTrips(map, trips, mode);
  }, [mapRef, isMapReady, trips, mode]);
}
