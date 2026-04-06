"use client";

import maplibregl from "maplibre-gl";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "maplibre-gl/dist/maplibre-gl.css";
import type { TripFormMap } from "@/types";
import {
  CLUSTER_PAINT,
  CLUSTER_TEXT_LAYOUT,
  GEOJSON_SOURCE_OPTIONS,
  setPolishLanguage,
  UNCLUSTERED_POINT_LAYOUT,
} from "./config/mapConfig";
import { useMapInitialization } from "./hooks/useMapInitialization";
import { useMapLayers } from "./hooks/useMapLayers";
import { PopupContent } from "./PopupContent";
import { fitToTrips, tripsToGeoJSON } from "./utils/geoJsonUtils";

type MapSize = "sm" | "lg";

interface MapViewProps {
  trips: TripFormMap[];
  size?: MapSize;
  className?: string;
  mode?: "multiple" | "single";
  onTripClick?: (trip: TripFormMap) => void;
}

export default function MapView({
  trips,
  size = "lg",
  className,
  mode,
  onTripClick,
}: MapViewProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const popupRef = useRef<maplibregl.Popup | null>(null);
  const popupContentRef = useRef<HTMLDivElement | null>(null);
  const tripsRef = useRef(trips);
  const onTripClickRef = useRef(onTripClick);
  const modeRef = useRef(mode);
  const [selectedTrip, setSelectedTrip] = useState<TripFormMap | null>(null);

  tripsRef.current = trips;
  onTripClickRef.current = onTripClick;
  modeRef.current = mode;

  const handleMapReady = useCallback((map: maplibregl.Map) => {
    const data = tripsToGeoJSON(tripsRef.current);

    map.addSource("markers", {
      ...GEOJSON_SOURCE_OPTIONS,
      data,
    });

    map.addLayer({
      id: "clusters",
      type: "circle",
      source: "markers",
      filter: ["has", "point_count"],
      paint: CLUSTER_PAINT,
    });

    map.addLayer({
      id: "cluster-count",
      type: "symbol",
      source: "markers",
      filter: ["has", "point_count"],
      layout: CLUSTER_TEXT_LAYOUT,
    });

    map.addLayer({
      id: "unclustered-point",
      type: "symbol",
      source: "markers",
      filter: ["!", ["has", "point_count"]],
      // @ts-expect-error - maplibre types don't fully capture expression-based layout properties
      layout: UNCLUSTERED_POINT_LAYOUT,
    });

    map.on("click", "clusters", async (e) => {
      const features = map.queryRenderedFeatures(e.point, {
        layers: ["clusters"],
      });
      if (!features.length || !features[0].properties) return;

      const clusterId = features[0].properties.cluster_id;
      const source = map.getSource("markers") as maplibregl.GeoJSONSource;

      const zoom = await source.getClusterExpansionZoom(clusterId);
      const geometry = features[0].geometry as GeoJSON.Point;
      if (!geometry || geometry.type !== "Point") return;
      const coordinates = geometry.coordinates as [number, number];
      map.easeTo({
        center: coordinates,
        zoom,
      });
    });

    map.on("click", "unclustered-point", (e) => {
      const features = map.queryRenderedFeatures(e.point, {
        layers: ["unclustered-point"],
      });
      if (!features.length || !features[0].properties) return;
      const props = features[0].properties;
      if (!props) return;

      const currentTrips = tripsRef.current;
      const trip = currentTrips.find((t) => t.ID === Number(props.id));
      if (trip) {
        onTripClickRef.current?.(trip);
        setSelectedTrip(trip);
      }

      if (popupRef.current) {
        popupRef.current.remove();
      }

      if (!popupContentRef.current) {
        popupContentRef.current = document.createElement("div");
      }

      popupRef.current = new maplibregl.Popup({
        closeButton: false,
        closeOnClick: true,
        offset: -30,
        maxWidth: "none",
        padding: { top: 100, bottom: 0, left: 0, right: 0 },
      })
        .setLngLat(e.lngLat)
        .setDOMContent(popupContentRef.current);
      popupRef.current.on("close", () => setSelectedTrip(null));
      popupRef.current.addTo(map);
    });

    map.on("mouseenter", "clusters", () => {
      map.getCanvas().style.cursor = "pointer";
    });

    map.on("mouseleave", "clusters", () => {
      map.getCanvas().style.cursor = "";
    });

    map.on("mouseenter", "unclustered-point", () => {
      map.getCanvas().style.cursor = "pointer";
    });

    map.on("mouseleave", "unclustered-point", () => {
      map.getCanvas().style.cursor = "";
    });

    setPolishLanguage(map);

    if (tripsRef.current.length > 0) {
      fitToTrips(map, tripsRef.current, modeRef.current);
    }
  }, []);

  const { mapRef, isMapReady } = useMapInitialization({
    containerRef: mapContainer,
    onReady: handleMapReady,
  });

  useMapLayers({
    mapRef,
    isMapReady,
    trips,
    mode,
  });

  useEffect(() => {
    return () => {
      if (popupRef.current) {
        popupRef.current.remove();
      }
    };
  }, []);

  const heightClass = size === "sm" ? "h-[300px]" : "h-[550px]";

  return (
    <div
      className={`${heightClass} w-full rounded-md overflow-hidden ${className ?? ""}`}
    >
      <div ref={mapContainer} className="h-full w-full" />
      {selectedTrip &&
        popupContentRef.current &&
        createPortal(
          <PopupContent
            trip={selectedTrip}
            onClose={() => popupRef.current?.remove()}
          />,
          popupContentRef.current,
        )}
    </div>
  );
}
