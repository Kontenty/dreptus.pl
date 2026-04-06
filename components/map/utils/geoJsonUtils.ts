import maplibregl from "maplibre-gl";
import type { TripFormMap } from "@/types";

export function tripsToGeoJSON(
  trips: TripFormMap[],
): GeoJSON.FeatureCollection {
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

export function fitToTrips(
  map: maplibregl.Map,
  trips: TripFormMap[],
  mode?: "multiple" | "single",
): void {
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
