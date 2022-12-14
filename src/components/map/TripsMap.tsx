import { useContext, useState } from "react";
import { TripFormMap } from "src/types";
import Map from "./Map";
import MarkerCluster from "./MarkerCluster";
// import InfoWindow from "./InfoWindow";
import { InfoWindowF } from "./InfoWindowF";
import { PopupContent } from "./TripPopupContent";
import { GoogleContext } from "context";

type Props = { trips: TripFormMap[] };

export function TripsMap({ trips }: Props) {
  const [tripInfo, setTripInfo] = useState<TripFormMap | null>(null);
  const { googlemaps } = useContext(GoogleContext);
  return googlemaps ? (
    <>
      <Map size="lg">
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
      </Map>
    </>
  ) : null;
}
