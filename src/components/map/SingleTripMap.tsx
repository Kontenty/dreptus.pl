import { getIconUrl } from "lib/utils";
import { Trip } from "src/types";
import Map from "./Map";
import Marker from "./Marker";

type Props = { trip: Trip };

export function SingleTripMap({ trip }: Props) {
  return (
    <Map size="sm" mapTypeId="terrain" center={trip.position} zoom={14}>
      <Marker
        position={trip.position}
        icon={getIconUrl(trip.type)}
        clickable={false}
      />
    </Map>
  );
}
