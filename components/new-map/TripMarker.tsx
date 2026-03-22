"use client";

import { AdvancedMarker } from "@vis.gl/react-google-maps";
import Image from "next/image";
import { getIconUrl } from "@/lib/utils";
import type { TripFormMap } from "@/types";

export type TripMarkerProps = {
  trip: TripFormMap;
  onClick?: () => void;
};

export function TripMarker({ trip, onClick }: TripMarkerProps) {
  const iconUrl = trip.dolinaBugu
    ? "/image/pieszo-dolina.png"
    : getIconUrl(trip.type);

  return (
    <AdvancedMarker
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
