"use client";

import { InfoWindow } from "@vis.gl/react-google-maps";
import type { PropsWithChildren } from "react";
import type { TripFormMap } from "@/types";

export type TripInfoWindowProps = PropsWithChildren<{
  trip: TripFormMap | null;
  onCloseClick?: () => void;
}>;

export function TripInfoWindow({
  trip,
  onCloseClick,
  children,
}: TripInfoWindowProps) {
  if (!trip) {
    return null;
  }

  return (
    <InfoWindow
      position={trip.position}
      onCloseClick={onCloseClick}
      pixelOffset={[0, -50]}
    >
      {/* children should render a single root node */}
      <div>{children}</div>
    </InfoWindow>
  );
}
