import React, { createContext, useEffect, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { GoogleMapsT } from "../types";

export const GoogleContext = createContext<{ googlemaps: GoogleMapsT | null }>({
  googlemaps: null,
});

type Props = { children: React.ReactNode };

export const GoogleProvider = ({ children }: Props) => {
  const [googlemaps, setGooglemaps] = useState<GoogleMapsT | null>(null);

  useEffect(() => {
    const loadGoogle = async () => {
      const loader = new Loader({
        apiKey: "AIzaSyB1XwgwHr9tgBinodv48WPifH4euSOn9CA",
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
