"use client";
import { useContext, useState } from "react";
import { GoogleContext } from "@/lib/context";
import type { TripFormMap } from "@/types";
import { InfoWindowF } from "./InfoWindowF";
import MapComponent from "./Map";
import MarkerCluster from "./MarkerCluster";
import { PopupContent } from "./TripPopupContent";

type Props = { trips: TripFormMap[] };

export function TripsMap({ trips }: Props) {
  const [tripInfo, setTripInfo] = useState<TripFormMap | null>(null);
  const { googlemaps } = useContext(GoogleContext);
  return googlemaps ? (
    <MapComponent size="lg">
      <MarkerCluster locations={trips} onClick={(t) => setTripInfo(t)} />
      {tripInfo && (
        <InfoWindowF
          onCloseClick={() => setTripInfo(null)}
          options={{ pixelOffset: new googlemaps.Size(0, -50) }}
          position={tripInfo?.position}
        >
          <PopupContent trip={tripInfo} />
        </InfoWindowF>
      )}
    </MapComponent>
  ) : null;
}
