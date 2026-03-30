"use client";

import { AdvancedMarker } from "@vis.gl/react-google-maps";
import Image from "next/image";
import { useCallback } from "react";
import { getIconUrl } from "@/lib/utils";
import type { TripFormMap } from "@/types";

export type TripMarkerProps = {
  trip: TripFormMap;
  onClick?: () => void;
  setMarkerRef?: (
    marker: google.maps.marker.AdvancedMarkerElement | null,
    key: string | number,
  ) => void;
};

export function TripMarker({ trip, onClick, setMarkerRef }: TripMarkerProps) {
  const iconUrl = trip.dolinaBugu
    ? "/image/pieszo-dolina.png"
    : getIconUrl(trip.type);

  const ref = useCallback(
    (marker: google.maps.marker.AdvancedMarkerElement | null) =>
      setMarkerRef?.(marker, trip.ID),
    [setMarkerRef, trip.ID],
  );

  return (
    <AdvancedMarker
      ref={ref}
      position={trip.position}
      onClick={onClick}
      clickable={!!onClick}
      title={trip.title}
    >
      <div className="relative">
        <Image
          src={iconUrl}
          alt={trip.title || "Trip marker"}
          width={32}
          height={32}
          className="object-contain"
          style={{
            filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
          }}
        />
      </div>
    </AdvancedMarker>
  );
}
