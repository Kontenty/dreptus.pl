import { MarkerClusterer as gMarkerclusterer } from "@googlemaps/markerclusterer";
import React, { useContext, useEffect, useState } from "react";
import { GoogleMapContext } from "@/lib/context";
import { getIconUrl } from "@/lib/utils";
import type { TripFormMap } from "@/types";

interface Props {
  locations: TripFormMap[];
  onClick?: (trip: TripFormMap) => void;
}

const MarkerCluster = ({ locations, onClick }: Props) => {
  const { map } = useContext(GoogleMapContext);
  const [cluster, setCluster] = useState<gMarkerclusterer | null>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <causes loop>
  useEffect(() => {
    if (map && locations?.length) {
      const bounds = new google.maps.LatLngBounds();
      const markers = locations.map((trip) => {
        const { position } = trip;
        const marker = new google.maps.Marker({
          position,
          animation: google.maps.Animation.DROP,
          icon: trip.dolinaBugu
            ? "/image/pieszo-dolina.png"
            : getIconUrl(trip.type),
        });
        marker.addListener("click", () => {
          onClick?.(trip);
        });
        bounds.extend(position);
        return marker;
      });

      if (cluster) {
        cluster?.clearMarkers();
        cluster?.addMarkers(markers);
      } else {
        const nextCluster = new gMarkerclusterer({ map, markers });
        setCluster(nextCluster);
      }
      map.fitBounds(bounds);
    }

    return () => {
      cluster?.setMap(null);
      setCluster(null);
    };
  }, [locations, map]);

  return null;
};

export default React.memo(MarkerCluster);
