"use client";

import maplibregl from "maplibre-gl";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "maplibre-gl/dist/maplibre-gl.css";
import type { TripFormMap } from "@/types";
import { GEOJSON_SOURCE_OPTIONS, setPolishLanguage } from "./config/mapConfig";
import { useMapInitialization } from "./hooks/useMapInitialization";
import { PopupContent } from "./PopupContent";
import {
  fitToTrips,
  tripsToGeoJSON,
  tripToGeoJSONFeature,
} from "./utils/geoJsonUtils";

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
  const [selectedTrip, setSelectedTrip] = useState<TripFormMap | null>(null);
  const [popupContainer, setPopupContainer] = useState<HTMLDivElement | null>(
    null,
  );

  tripsRef.current = trips;
  onTripClickRef.current = onTripClick;

  const handleMapReady = useCallback(
    (map: maplibregl.Map) => {
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
        paint: {
          "circle-color": "#51bbd6",
          "circle-radius": 20,
        },
      });

      map.addLayer({
        id: "cluster-count",
        type: "symbol",
        source: "markers",
        filter: ["has", "point_count"],
        layout: {
          "text-field": "{point_count_abbreviated}",
          "text-size": 12,
          "text-font": ["Noto Sans Regular"],
        },
      });

      map.addLayer({
        id: "not-clustered-point",
        type: "symbol",
        source: "markers",
        filter: ["!", ["has", "point_count"]],
        layout: {
          "icon-image": ["get", "icon"],
          "icon-size": 0.8,
          "icon-allow-overlap": true,
        },
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
        if (geometry?.type !== "Point") return;
        const coordinates = geometry.coordinates as [number, number];
        map.easeTo({
          center: coordinates,
          zoom,
        });
      });

      map.on("click", "not-clustered-point", (e) => {
        const features = map.queryRenderedFeatures(e.point, {
          layers: ["not-clustered-point"],
        });
        if (!features.length || !features[0].properties) return;
        const props = features[0].properties;
        if (!props) return;

        if (popupRef.current) {
          popupRef.current.remove();
        }

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
          .setLngLat(e.lngLat)
          .setDOMContent(popupContent);
        popupRef.current.on("close", () => setSelectedTrip(null));
        popupRef.current.addTo(map);
      });

      map.on("mouseenter", "clusters", () => {
        map.getCanvas().style.cursor = "pointer";
      });

      map.on("mouseleave", "clusters", () => {
        map.getCanvas().style.cursor = "";
      });

      map.on("mouseenter", "not-clustered-point", () => {
        map.getCanvas().style.cursor = "pointer";
      });

      map.on("mouseleave", "not-clustered-point", () => {
        map.getCanvas().style.cursor = "";
      });

      setPolishLanguage(map);

      if (tripsRef.current.length > 0) {
        fitToTrips(map, tripsRef.current, mode);
      }
    },
    [mode],
  );

  const { mapRef, isMapReady } = useMapInitialization({
    containerRef: mapContainer,
    onReady: handleMapReady,
  });

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
