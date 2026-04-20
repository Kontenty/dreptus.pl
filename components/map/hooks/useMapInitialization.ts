"use client";

import maplibregl from "maplibre-gl";
import { useEffect, useRef, type RefObject } from "react";

const MAP_IMAGES = [
  { name: "dolina-bugu-icon", url: "/image/pieszo-dolina.png" },
  { name: "cyclist-icon", url: "/image/icons/cyclist-circle.svg" },
  { name: "footman-icon", url: "/image/icons/footman-circle.svg" },
];

interface UseMapInitializationOptions {
  containerRef: RefObject<HTMLDivElement | null>;
  onReady?: (map: maplibregl.Map) => void;
}

interface UseMapInitializationResult {
  mapRef: RefObject<maplibregl.Map | null>;
  isMapReady: RefObject<boolean>;
}

async function loadMapImages(
  map: maplibregl.Map,
  images: typeof MAP_IMAGES
): Promise<void> {
  await Promise.all(
    images.map(async ({ name, url }) => {
      if (url.endsWith(".svg")) {
        // Handle SVG files
        const response = await fetch(url);
        const svgText = await response.text();
        const svgDataUri =
          "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgText);
        const image = new Image();
        await new Promise<void>((resolve, reject) => {
          image.onload = () => resolve();
          image.onerror = () => reject(new Error(`Failed to load image: ${url}`));
          image.src = svgDataUri;
        });
        map.addImage(name, image);
      } else {
        // Handle PNG/raster files
        const { data } = await map.loadImage(url);
        map.addImage(name, data);
      }
    })
  );
}

export function useMapInitialization({
  containerRef,
  onReady,
}: UseMapInitializationOptions): UseMapInitializationResult {
  const mapRef = useRef<maplibregl.Map | null>(null);
  const isMapReady = useRef(false);

  useEffect(() => {
    if (!containerRef.current) return;

    mapRef.current = new maplibregl.Map({
      container: containerRef.current,
      style: "https://tiles.openfreemap.org/styles/liberty",
      center: [20.983333, 52.233333],
      zoom: 12,
    });

    const map = mapRef.current;

    map.on("load", async () => {
      isMapReady.current = true;
      await loadMapImages(map, MAP_IMAGES);
      onReady?.(map);
    });

    return () => {
      map.remove();
    };
  }, [containerRef, onReady]);

  return { mapRef, isMapReady };
}
