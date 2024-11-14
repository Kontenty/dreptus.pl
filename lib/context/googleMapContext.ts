import { createContext } from "react";

export const GmapContext = createContext<{ map: google.maps.Map | null }>({
  map: null,
});
