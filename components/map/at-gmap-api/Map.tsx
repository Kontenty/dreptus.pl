import React, { Component } from "react";
import { GoogleMap, MarkerF } from "@react-google-maps/api";

const defaultContainerStyle = {
  width: "900px",
  height: "600px",
};

const defaultCenter = {
  lat: 21.018,
  lng: 52.241,
};

interface Props {
  center: { lat: number; lng: number };
  zoom?: number;
  containerStyle?: {
    width: string;
    height: string;
  };
  marker: {
    center: { lat: number; lng: number };

    icon?: string;
  };
}

class Map extends Component<Props> {
  render() {
    const {
      center = defaultCenter,
      containerStyle = defaultContainerStyle,
      zoom = 10,
      marker,
    } = this.props;
    const icon = marker.icon || "/image/icons/footman-circle.svg";
    return (
      <GoogleMap
        id="map-with-marker"
        mapContainerStyle={containerStyle}
        center={marker.center}
        zoom={zoom}
        options={{
          disableDefaultUI: true,
          fullscreenControl: true,
          zoomControl: true,
        }}
      >
        {/* Child components, such as markers, info windows, etc. */}
        <MarkerF
          position={center}
          icon={{
            url: icon,
          }}
        />
        <></>
      </GoogleMap>
    );
  }
}
export default Map;
