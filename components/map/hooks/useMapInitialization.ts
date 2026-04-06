"use client";

import maplibregl from "maplibre-gl";
import { useEffect, useRef } from "react";

interface UseMapInitializationOptions {
  containerRef: React.RefObject<HTMLDivElement | null>;
  onReady?: (map: maplibregl.Map) => void;
}

interface UseMapInitializationResult {
  mapRef: React.MutableRefObject<maplibregl.Map | null>;
  isMapReady: React.MutableRefObject<boolean>;
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

      isMapReady.current = true;
      onReady?.(map);
    });

    return () => {
      map.remove();
    };
  }, [containerRef, onReady]);

  return { mapRef, isMapReady };
}
