import type maplibregl from "maplibre-gl";

export const POLISH_TEXT_LAYERS = [
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
] as const;

export const CLUSTER_PAINT = {
  "circle-color": "#51bbd6",
  "circle-radius": 20,
};

export const CLUSTER_TEXT_LAYOUT = {
  "text-field": "{point_count_abbreviated}",
  "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
  "text-size": 12,
};

export const UNCLUSTERED_POINT_LAYOUT = {
  "icon-image": ["get", "icon"],
  "icon-size": 1,
  "icon-allow-overlap": true,
};

export const GEOJSON_SOURCE_OPTIONS = {
  type: "geojson" as const,
  cluster: true,
  clusterMaxZoom: 14,
  clusterRadius: 50,
};

export function setPolishLanguage(map: maplibregl.Map): void {
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
