"use client";

import {
  APIProvider,
  Map as GoogleMapComponent,
} from "@vis.gl/react-google-maps";
import { cva } from "class-variance-authority";

type MapSize = "sm" | "lg";

const mapWrapper = cva(["w-full"], {
  variants: {
    size: {
      sm: "h-[300px]",
      lg: "h-[550px]",
    },
  },
  defaultVariants: {
    size: "lg",
  },
});

const defaultCenter: google.maps.LatLngLiteral = {
  // Warsaw-ish; the legacy map had lat/lng swapped.
  lat: 52.237,
  lng: 21.017,
};

export type GoogleMapViewProps = {
  size?: MapSize;
  className?: string;
  center?: google.maps.LatLngLiteral;
  zoom?: number;
  children?: React.ReactNode;
};

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

export function GoogleMapView({
  size = "lg",
  className,
  center = defaultCenter,
  zoom = 7,
  children,
}: GoogleMapViewProps) {
  if (!apiKey) {
    return (
      <div
        className={`${mapWrapper({ size })} ${className ?? ""} flex items-center justify-center rounded-md bg-slate-100 text-slate-700`}
      >
        <p className="text-sm">Google Maps API key not configured</p>
      </div>
    );
  }

  return (
    <APIProvider apiKey={apiKey}>
      <div className={`${mapWrapper({ size })} ${className ?? ""}`}>
        <GoogleMapComponent
          style={{ width: "100%", height: "100%" }}
          defaultCenter={center}
          defaultZoom={zoom}
          gestureHandling="greedy"
          disableDefaultUI={true}
          fullscreenControl={true}
          zoomControl={true}
          mapId="dreptus-new-map"
        >
          {children}
        </GoogleMapComponent>
      </div>
    </APIProvider>
  );
}
