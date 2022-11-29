import React, { useEffect, useState, useRef, useContext } from "react";
import { GoogleContext, GmapContext } from "context";
import { cva } from "class-variance-authority";
import css from "./Map.module.css";

const mapdiv = cva(["w-full"], {
  variants: {
    size: {
      sm: css.mapSm,
      lg: css.mapLg,
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

interface Props extends google.maps.MapOptions {
  children?: React.ReactNode;
  size?: "sm" | "lg";
}

const Map = ({ children, size = "lg", ...mapProps }: Props) => {
  const [gmap, setGmap] = useState<google.maps.Map | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const { googlemaps } = useContext(GoogleContext);

  useEffect(() => {
    const loadGmap = async () => {
      if (googlemaps && mapRef?.current) {
        const newGmap = new googlemaps.Map(mapRef.current, {
          mapTypeId: "terrain",
          mapTypeControl: false,
          ...mapProps,
        });
        setGmap(newGmap);
      }
    };
    loadGmap();

    return () => {
      setGmap(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [googlemaps, mapRef]);

  useEffect(() => {
    if (gmap && mapProps) {
      gmap.setOptions(mapProps);
    }
  }, [gmap, mapProps]);

  return googlemaps ? (
    <GmapContext.Provider value={{ map: gmap }}>
      <div className={mapdiv({ size })} ref={mapRef}>
        {children}
      </div>
    </GmapContext.Provider>
  ) : null;
};

export default React.memo(Map);
