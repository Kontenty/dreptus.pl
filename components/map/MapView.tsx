"use client";

import maplibregl from "maplibre-gl";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "maplibre-gl/dist/maplibre-gl.css";
import type { TripFormMap } from "@/types";
import { PopupContent } from "./PopupContent";

type MapSize = "sm" | "lg";

interface MapViewProps {
  trips: TripFormMap[];
  size?: MapSize;
  className?: string;
  mode?: "multiple" | "single";
  onTripClick?: (trip: TripFormMap) => void;
}

function tripsToGeoJSON(trips: TripFormMap[]): GeoJSON.FeatureCollection {
  return {
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
  };
}

function fitToTrips(
  map: maplibregl.Map,
  trips: TripFormMap[],
  mode?: "multiple" | "single",
) {
  if (trips.length === 0) return;

  if (mode === "single" && trips[0]) {
    const trip = trips[0];
    map.flyTo({
      center: [Number(trip.lng), Number(trip.lat)],
      zoom: 12,
      duration: 1000,
      essential: true,
    });
  } else {
    const bounds = new maplibregl.LngLatBounds();
    trips.forEach((trip) => {
      bounds.extend([Number(trip.lng), Number(trip.lat)]);
    });
    map.fitBounds(bounds, {
      padding: 50,
      duration: 1000,
      essential: true,
    });
  }
}

const POLISH_TEXT_LAYERS = [
  "waterway_line_label",
  "water_name_point_label",
  "water_name_line_label",
  "poi_r20",
  "poi_r7",
  "poi_r1",
  "poi_transit",
  "highway-name-path",
  "highway-name-minor",
  "highway-name-major",
  "airport",
  "label_other",
  "label_village",
  "label_town",
  "label_state",
  "label_city",
  "label_city_capital",
  "label_country_3",
  "label_country_2",
  "label_country_1",
];

function setPolishLanguage(map: maplibregl.Map) {
  const textField = [
    "case",
    ["has", "name:pl"],
    ["get", "name:pl"],
    ["has", "name:nonlatin"],
    ["concat", ["get", "name:latin"], " ", ["get", "name:nonlatin"]],
    ["coalesce", ["get", "name_en"], ["get", "name"]],
  ];

  POLISH_TEXT_LAYERS.forEach((layerId) => {
    if (map.getLayer(layerId)) {
      map.setLayoutProperty(layerId, "text-field", textField);
    }
  });
}

export default function MapView({
  trips,
  size = "lg",
  className,
  mode,
  onTripClick,
}: MapViewProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<maplibregl.Map | null>(null);
  const popupRef = useRef<maplibregl.Popup | null>(null);
  const popupContentRef = useRef<HTMLDivElement | null>(null);
  const tripsRef = useRef(trips);
  const onTripClickRef = useRef(onTripClick);
  const modeRef = useRef(mode);
  const isMapReady = useRef(false);
  const [selectedTrip, setSelectedTrip] = useState<TripFormMap | null>(null);

  const data = useMemo(() => tripsToGeoJSON(trips), [trips]);
  const dataRef = useRef(data);

  tripsRef.current = trips;
  onTripClickRef.current = onTripClick;
  modeRef.current = mode;
  dataRef.current = data;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!mapContainer.current) return;

    mapInstance.current = new maplibregl.Map({
      container: mapContainer.current,
      style: "https://tiles.openfreemap.org/styles/liberty",
      center: [20.983333, 52.233333],
      zoom: 12,
    });

    const map = mapInstance.current;
    const currentData = dataRef.current;

    map.on("load", () => {
      const loadedImages = new Set<string>();

      map.on("styleimagemissing", async (e) => {
        if (loadedImages.has(e.id)) return;
        loadedImages.add(e.id);

        const response = await fetch(e.id);
        const svgText = await response.text();
        const svg = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgText)}`;

        const img = new Image();
        await new Promise<void>((resolve) => {
          img.onload = () => resolve();
          img.src = svg;
        });

        map.addImage(e.id, img);
      });

      map.addSource("markers", {
        type: "geojson",
        data: currentData,
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: 50,
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
          "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
          "text-size": 12,
        },
      });

      map.addLayer({
        id: "unclustered-point",
        type: "symbol",
        source: "markers",
        filter: ["!", ["has", "point_count"]],
        layout: {
          "icon-image": ["get", "icon"],
          "icon-size": 1,
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
        if (!geometry || geometry.type !== "Point") return;
        const coordinates = geometry.coordinates as [number, number];
        map.easeTo({
          center: coordinates,
          zoom,
        });
      });

      map.on("click", "unclustered-point", (e) => {
        if (!e.features || e.features.length === 0) return;
        const feature = e.features[0];
        const props = feature.properties;
        if (!props) return;

        const coordinates = (
          feature.geometry as GeoJSON.Point
        ).coordinates.slice() as [number, number];

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
          .setLngLat(coordinates)
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

      isMapReady.current = true;

      setPolishLanguage(map);

      if (tripsRef.current.length > 0) {
        fitToTrips(map, tripsRef.current, modeRef.current);
      }
    });

    return () => {
      if (popupRef.current) {
        popupRef.current.remove();
      }
      map.remove();
    };
  }, []);

  useEffect(() => {
    if (mapInstance.current?.getSource("markers")) {
      (
        mapInstance.current.getSource("markers") as maplibregl.GeoJSONSource
      ).setData(data);
    }
  }, [data]);

  useEffect(() => {
    const map = mapInstance.current;
    if (!map || !isMapReady.current) return;

    fitToTrips(map, trips, mode);
  }, [trips, mode]);

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
