"use client";

import maplibregl from "maplibre-gl";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "maplibre-gl/dist/maplibre-gl.css";
import type { TripFormMap } from "@/types";
import { setPolishLanguage } from "./config/mapConfig";
import { useMapInitialization } from "./hooks/useMapInitialization";
import { PopupContent } from "./PopupContent";
import {
  fitToTrips,
  tripsToGeoJSON,
  tripToGeoJSONFeature,
} from "./utils/geoJsonUtils";
import { setupMapEvents } from "./utils/mapEvents";
import { addMapLayers } from "./utils/mapLayers";

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
}: Readonly<MapViewProps>) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const popupRef = useRef<maplibregl.Popup | null>(null);
  const tripsRef = useRef(trips);
  const onTripClickRef = useRef(onTripClick);
  const modeRef = useRef(mode);
  const [selectedTrip, setSelectedTrip] = useState<TripFormMap | null>(null);
  const [popupContainer, setPopupContainer] = useState<HTMLDivElement | null>(
    null,
  );

  tripsRef.current = trips;
  onTripClickRef.current = onTripClick;
  modeRef.current = mode;

  const handleMapReady = useCallback((map: maplibregl.Map) => {
    const currentMode = modeRef.current;
    const data = tripsToGeoJSON(tripsRef.current);

    addMapLayers(map, data, currentMode);

    setupMapEvents(map, {
      mode: currentMode ?? "multiple",
      onPointClick: (props, lngLat) => {
        if (popupRef.current) {
          popupRef.current.remove();
        }

        const currentTrips = tripsRef.current;
        const trip = currentTrips.find((t) => t.ID === Number(props.id));
        if (trip) {
          onTripClickRef.current?.(trip);
          setSelectedTrip(trip);
        }

        const popupContent = document.createElement("div");
        setPopupContainer(popupContent);

        popupRef.current = new maplibregl.Popup({
          closeButton: false,
          closeOnClick: true,
          anchor: "left",
          offset: 20,
          maxWidth: "none",
          padding: { top: 100, bottom: 0, left: 0, right: 0 },
        })
          .setLngLat(lngLat)
          .setDOMContent(popupContent);
        popupRef.current.on("close", () => setSelectedTrip(null));
        popupRef.current.addTo(map);
      },
    });

    setPolishLanguage(map);

    if (tripsRef.current.length > 0) {
      fitToTrips(map, tripsRef.current, currentMode);
    }
  }, []);

  const { mapRef, isMapReady } = useMapInitialization({
    containerRef: mapContainer,
    onReady: handleMapReady,
  });

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !isMapReady) return;

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

  useEffect(() => {
    return () => {
      if (popupRef.current) {
        popupRef.current.remove();
      }
    };
  }, []);

  const heightClass = size === "sm" ? "h-75" : "h-135";

  return (
    <div
      className={`${heightClass} w-full rounded-md overflow-hidden ${className ?? ""}`}
    >
      <div ref={mapContainer} className="h-full w-full" />
      {selectedTrip &&
        popupContainer &&
        createPortal(
          <PopupContent
            trip={selectedTrip}
            onClose={() => popupRef.current?.remove()}
          />,
          popupContainer,
        )}
    </div>
  );
}
