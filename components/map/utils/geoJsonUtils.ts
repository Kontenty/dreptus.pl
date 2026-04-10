import maplibregl from "maplibre-gl";
import { getIconUrl } from "@/lib/utils";
import type { TripFormMap } from "@/types";

export function tripToGeoJSONFeature(
  trip: TripFormMap,
): GeoJSON.Feature<GeoJSON.Point> {
  const icon = getIconUrl(trip);

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
}

export function tripsToGeoJSON(
  trips: TripFormMap[],
): GeoJSON.FeatureCollection {
  return {
    type: "FeatureCollection",
    features: trips.map(tripToGeoJSONFeature),
  };
}

interface FitToTripsOptions {
  duration?: number;
}

export function fitToTrips(
  map: maplibregl.Map,
  trips: TripFormMap[],
  mode?: "multiple" | "single",
  options: FitToTripsOptions = {},
): void {
  if (trips.length === 0) return;

  const duration = options.duration ?? 1000;

  if (mode === "single" && trips[0]) {
    const trip = trips[0];
    map.flyTo({
      center: [Number(trip.lng), Number(trip.lat)],
      zoom: 12,
      duration,
      essential: true,
    });
  } else {
    const bounds = new maplibregl.LngLatBounds();
    trips.forEach((trip) => {
      bounds.extend([Number(trip.lng), Number(trip.lat)]);
    });
    map.fitBounds(bounds, {
      padding: 50,
      duration,
      essential: true,
    });
  }
}
