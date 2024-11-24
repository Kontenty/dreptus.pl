"use client";
import { createContext } from "react";

export const GoogleMapContext = createContext<{ map: google.maps.Map | null }>({
  map: null,
});
