import React from "react";
import {
  useJsApiLoader,
  GoogleMap,
  MarkerF,
  type GoogleMapProps,
} from "@react-google-maps/api";

const defaultContainerStyle = {
  width: "900px",
  height: "600px",
};

const defaultCenter = {
  lat: 21.018,
  lng: 52.241,
};

interface Props extends GoogleMapProps {
  containerStyle?: {
    width: string;
    height: string;
  };
  marker?: {
    center: { lat: number; lng: number };

    icon?: string;
  };
}

const Map = ({
  center = defaultCenter,
  containerStyle = defaultContainerStyle,
  zoom = 10,
  marker,
  children,
}: Props) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || "",
  });
  function markerRender() {
    const icon = marker?.icon ?? "/image/icons/footman-circle.svg";
    return marker ? (
      <MarkerF
        position={marker.center}
        icon={{
          url: icon,
        }}
      />
    ) : null;
  }
  return isLoaded ? (
    <GoogleMap
      id="map-with-marker"
      mapContainerStyle={containerStyle}
      center={center}
      zoom={zoom}
      options={{
        disableDefaultUI: true,
        fullscreenControl: true,
        zoomControl: true,
        mapTypeId: "terrain",
      }}
    >
      {/* Child components, such as markers, info windows, etc. */}
      {children}
      {marker && markerRender()}
      <></>
    </GoogleMap>
  ) : (
    <div style={containerStyle} className="flex justify-center items-center">
      <h1 className="text-2xl">Map loading</h1>
    </div>
  );
};
export default React.memo(Map);
