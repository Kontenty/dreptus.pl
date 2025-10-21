import { getIconUrl } from "@/lib/utils";
import type { TripDetails } from "@/types";
import Map from "./Map";
import Marker from "./Marker";

type Props = { trip: TripDetails };
export function SingleTripMap({ trip }: Readonly<Props>) {
  const position = { lat: Number(trip.lat), lng: Number(trip.lng) };
  return (
    <Map center={position} mapTypeId="terrain" size="sm" zoom={14}>
      <Marker
        clickable={false}
        icon={getIconUrl(trip.type)}
        position={position}
      />
    </Map>
  );
}
