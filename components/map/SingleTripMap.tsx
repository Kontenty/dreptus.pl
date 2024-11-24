import { getIconUrl } from "@/lib/utils";
import { TripDetails } from "@/types";
import Map from "./Map";
import Marker from "./Marker";

type Props = { trip: TripDetails };

export function SingleTripMap({ trip }: Readonly<Props>) {
  return (
    <Map center={trip.position} mapTypeId="terrain" size="sm" zoom={14}>
      <Marker
        clickable={false}
        icon={getIconUrl(trip.type)}
        position={trip.position}
      />
    </Map>
  );
}
