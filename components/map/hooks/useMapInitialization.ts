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
    const loadedImages = new Set<string>();

    map.on("styleimagemissing", async (e) => {
      if (loadedImages.has(e.id)) return;
      loadedImages.add(e.id);

      if (
        !e.id ||
        e.id.includes("DIN") ||
        e.id.includes("Offc") ||
        e.id.includes("glyphs")
      ) {
        return;
      }

      const maybeUrl = e.id.startsWith("/") ? e.id : e.id;

      try {
        const response = await fetch(maybeUrl);
        if (!response.ok) return;

        const contentType = response.headers.get("content-type") || "";
        let dataUrl: string;

        if (contentType.includes("image/svg")) {
          const svgText = await response.text();
          dataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgText)}`;
        } else if (e.id.endsWith(".png")) {
          const arrayBuffer = await response.arrayBuffer();
          const base64 = btoa(
            String.fromCharCode(...new Uint8Array(arrayBuffer)),
          );
          dataUrl = `data:image/png;base64,${base64}`;
        } else {
          const blob = await response.blob();
          dataUrl = URL.createObjectURL(blob);
        }

        const img = new Image();
        await new Promise<void>((resolve) => {
          img.onload = () => resolve();
          img.onerror = () => resolve();
          img.src = dataUrl;
        });

        if (map.style) {
          map.addImage(e.id, img);
        }
      } catch {
        // ignore fetch errors
      }
    });

    map.on("load", () => {
      isMapReady.current = true;
      onReady?.(map);
    });

    return () => {
      map.remove();
    };
  }, [containerRef, onReady]);

  return { mapRef, isMapReady };
}
