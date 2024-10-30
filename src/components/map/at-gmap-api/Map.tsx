import React from "react";
import {
  GoogleMap,
  type GoogleMapProps,
  MarkerF,
  useJsApiLoader,
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

const MapComponent = ({
  center = defaultCenter,
  containerStyle = defaultContainerStyle,
  zoom = 10,
  marker,
  children,
}: Props) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY ?? "",
  });
  function markerRender() {
    const icon = marker?.icon ?? "/image/icons/footman-circle.svg";
    return marker ? (
      <MarkerF
        icon={{
          url: icon,
        }}
        position={marker.center}
      />
    ) : null;
  }
  return isLoaded ? (
    <GoogleMap
      center={center}
      id="map-with-marker"
      mapContainerStyle={containerStyle}
      options={{
        disableDefaultUI: true,
        fullscreenControl: true,
        zoomControl: true,
        mapTypeId: "roadmap",
      }}
      zoom={zoom}
    >
      {/* Child components, such as markers, info windows, etc. */}
      {children}
      {marker && markerRender()}
      <></>
    </GoogleMap>
  ) : (
    <div className="flex justify-center items-center" style={containerStyle}>
      <h1 className="text-2xl">Map loading</h1>
    </div>
  );
};
export default React.memo(MapComponent);
