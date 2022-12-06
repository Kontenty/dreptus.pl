import { getIconUrl } from "lib/utils";
import { Trip } from "src/types";
import Map from "./Map";
import Marker from "./Marker";

type Props = { trip: Trip };

export function SingleTripMap({ trip }: Props) {
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
