import React, { useContext, useEffect } from "react";
import { GmapContext } from "@/lib/context";

type Props = google.maps.MarkerOptions & {
  onClick?: () => void;
};

const Marker = ({ icon, position, onClick }: Props) => {
  const { map } = useContext(GmapContext);

  useEffect(() => {
    if (map) {
      const marker = new google.maps.Marker({
        position,
        map,
        icon,
        animation: google.maps.Animation.DROP,
      });
      if (onClick) {
        marker.addListener("click", () => onClick());
      }
    }
  }, [icon, map, onClick, position]);

  return null;
};

export default React.memo(Marker);
