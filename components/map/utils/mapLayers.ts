import type maplibregl from "maplibre-gl";

export function addMapLayers(
  map: maplibregl.Map,
  data: GeoJSON.FeatureCollection,
  mode: "multiple" | "single" = "multiple",
) {
  map.addSource("markers", {
    type: "geojson",
    cluster: mode === "multiple",
    clusterMaxZoom: 14,
    clusterRadius: 30,
    data,
  });

  if (mode === "multiple") {
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
  }

  map.addLayer({
    id: "not-clustered-point",
    type: "symbol",
    source: "markers",
    ...(mode === "multiple" && { filter: ["!", ["has", "point_count"]] }),
    layout: {
      "icon-image": ["get", "icon"],
      "icon-size": 0.8,
      "icon-allow-overlap": true,
    },
  });
}
