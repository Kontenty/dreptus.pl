import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  InfoWindow,
  Marker,
  MarkerClusterer,
  useGoogleMap,
} from "@react-google-maps/api";
import { getIconUrl } from "@/lib/utils";
import { TripFormMap } from "@/types";
import Image from "next/image";
import { EyeIcon, MapPinIcon } from "@heroicons/react/24/outline";
import css from "./map.module.css";

type Props = {
  trips: TripFormMap[];
};

const TripMarkerCluster = ({ trips }: Props) => {
  const [popupData, setPopup] = useState<TripFormMap | null>(null);
  const gMap = useGoogleMap();

  useEffect(() => {
    if (trips && gMap) {
      const bounds = new google.maps.LatLngBounds();
      trips.forEach((d) => bounds.extend(d.position));
      gMap.fitBounds(bounds);
    }
  }, [gMap, trips]);
  return (
    <>
      {popupData && (
        <InfoWindow
          onCloseClick={() => setPopup(null)}
          options={{ pixelOffset: new google.maps.Size(0, -50) }}
          position={popupData.position}
        >
          <Popup trip={popupData} />
        </InfoWindow>
      )}
      <MarkerClusterer clusterClass="trip-cluster">
        {(clusterer) => (
          <>
            {trips.map((trip) => (
              <Marker
                clusterer={clusterer}
                icon={
                  trip.dolinaBugu
                    ? "/image/pieszo-dolina.png"
                    : getIconUrl(trip.type)
                }
                key={trip.ID}
                onClick={() => setPopup(trip)}
                options={{ animation: google.maps.Animation.DROP }}
                position={trip.position}
              />
            ))}
          </>
        )}
      </MarkerClusterer>
    </>
  );
};

export default TripMarkerCluster;

interface PopupProps {
  trip: TripFormMap;
}
function Popup({ trip }: PopupProps) {
  return (
    <div className="relative bg-white w-[300px] min-h-[200px]">
      <Link href={trip.slug ? `/trips/${trip.slug}` : "/trips"}>
        <div className="relative h-[200px]">
          <Image
            alt="trip thumb image"
            fill
            src={trip.thumb_url}
            style={{ objectFit: "cover" }}
            unoptimized
          />
          <div className={css.imgOverlay}>
            <EyeIcon className={css.imgIcon} />
          </div>
        </div>
      </Link>
      <div className="p-4">
        <p
          className="text-sm leading-tight font-semibold mb-1 text-slate-600"
          dangerouslySetInnerHTML={{ __html: trip.title }}
        ></p>
        {trip.lat && (
          <small>
            <MapPinIcon className="w-3 h-3 mr-1 inline-block" />
            {trip.lat.toFixed(4)} {trip.lng.toFixed(4)}
          </small>
        )}
      </div>
    </div>
  );
}
