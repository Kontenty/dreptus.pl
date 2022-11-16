import React from "react";
import { MarkerClusterer, Marker } from "@react-google-maps/api";
import { getIconUrl } from "lib/utils";
import { TripFormMap } from "types";

type Props = {
  trips: TripFormMap[];
};

const TripMarkerCluster = ({ trips }: Props) => {
  return (
    <MarkerClusterer clusterClass="trip-cluster">
      {(clusterer) => (
        <>
          {trips.map((trip) => (
            <Marker
              key={trip.ID}
              position={{ lat: trip.lat, lng: trip.lon }}
              icon={
                trip.dolinaBugu
                  ? "/image/pieszo-dolina.png"
                  : getIconUrl(trip.type)
              }
              clusterer={clusterer}
              onClick={() => console.log(trip)}
            />
          ))}
        </>
      )}
    </MarkerClusterer>
  );
};

export default TripMarkerCluster;
