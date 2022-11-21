import React, { useState } from "react";
import Link from "next/link";
import { InfoWindow, MarkerClusterer, Marker } from "@react-google-maps/api";
import { getIconUrl } from "lib/utils";
import { TripFormMap } from "types";
import Image from "next/image";
import { EyeIcon, MapPinIcon } from "@heroicons/react/24/outline";
import css from "./map.module.css";

type Props = {
  trips: TripFormMap[];
};

const TripMarkerCluster = ({ trips }: Props) => {
  const [popupData, setPopup] = useState<TripFormMap | null>(null);
  return (
    <>
      {popupData && (
        <InfoWindow
          options={{ pixelOffset: new google.maps.Size(0, -50) }}
          position={{ lat: popupData.lat, lng: popupData.lng }}
          onCloseClick={() => setPopup(null)}
        >
          <Popup trip={popupData} />
        </InfoWindow>
      )}
      <MarkerClusterer clusterClass="trip-cluster">
        {(clusterer) => (
          <>
            {trips.map((trip) => (
              <Marker
                key={trip.ID}
                position={{ lat: trip.lat, lng: trip.lng }}
                icon={
                  trip.dolinaBugu
                    ? "/image/pieszo-dolina.png"
                    : getIconUrl(trip.type)
                }
                clusterer={clusterer}
                onClick={() => setPopup(trip)}
                options={{ animation: google.maps.Animation.DROP }}
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
        <a>
          <div className="relative h-[200px]">
            <Image
              src={trip.thumb_url}
              layout="fill"
              objectFit="cover"
              alt="trip thumb image"
            />
            <div className={css.imgOverlay}>
              <EyeIcon className={css.imgIcon} />
            </div>
          </div>
        </a>
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
