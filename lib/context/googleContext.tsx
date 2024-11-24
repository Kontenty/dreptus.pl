"use client";
import React, { createContext, useEffect, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { GoogleMapsT } from "../../src/types";

export const GoogleContext = createContext<{ googlemaps: GoogleMapsT | null }>({
  googlemaps: null,
});

type Props = { children: React.ReactNode };

export const GoogleProvider = ({ children }: Props) => {
  const [googlemaps, setGooglemaps] = useState<GoogleMapsT | null>(null);

  useEffect(() => {
    const loadGoogle = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY ?? "",
        version: "weekly",
        libraries: ["marker", "geometry"],
      });
      const loadedGoogle = await loader.load();
      setGooglemaps(loadedGoogle.maps);
    };
    loadGoogle();
  }, []);

  return (
    <GoogleContext.Provider value={{ googlemaps }}>
      {children}
    </GoogleContext.Provider>
  );
};
