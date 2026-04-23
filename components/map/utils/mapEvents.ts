import type maplibregl from "maplibre-gl";

interface MapEventsOptions {
  onPointClick: (
    properties: Record<string, unknown>,
    lngLat: maplibregl.LngLat,
  ) => void;
  mode: "multiple" | "single";
}

export function setupMapEvents(
  map: maplibregl.Map,
  { onPointClick, mode }: MapEventsOptions,
) {
  if (mode === "single") {
    // In single mode, the marker is non-interactive
    return;
  }

  // Handle cluster clicks
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

  map.on("mouseenter", "clusters", () => {
    map.getCanvas().style.cursor = "pointer";
  });

  map.on("mouseleave", "clusters", () => {
    map.getCanvas().style.cursor = "";
  });

  // Handle individual point clicks
  map.on("click", "not-clustered-point", (e) => {
    const features = map.queryRenderedFeatures(e.point, {
      layers: ["not-clustered-point"],
    });
    if (!features.length || !features[0].properties) return;

    onPointClick(features[0].properties, e.lngLat);
  });

  map.on("mouseenter", "not-clustered-point", () => {
    map.getCanvas().style.cursor = "pointer";
  });

  map.on("mouseleave", "not-clustered-point", () => {
    map.getCanvas().style.cursor = "";
  });
}
