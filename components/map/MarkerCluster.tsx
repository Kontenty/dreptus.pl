import React, { useContext, useEffect, useState } from "react";
import { MarkerClusterer as gMarkerclusterer } from "@googlemaps/markerclusterer";
import { GmapContext } from "@/lib/context";
import { getIconUrl } from "@/lib/utils";
import { TripFormMap } from "@/types";

interface Props {
  locations: TripFormMap[];
  onClick?: (trip: TripFormMap) => void;
}

const MarkerCluster = ({ locations, onClick }: Props) => {
  const { map } = useContext(GmapContext);
  const [cluster, setCluster] = useState<gMarkerclusterer | null>(null);

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
          onClick && onClick(trip);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locations, map]);

  return <></>;
};

export default React.memo(MarkerCluster);
