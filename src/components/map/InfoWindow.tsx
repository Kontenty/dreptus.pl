import React, {
  Children,
  useEffect,
  useContext,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { GmapContext } from "context";

interface Props extends google.maps.InfoWindowOptions {
  children: React.ReactNode;
  position?: google.maps.LatLngLiteral | null;
  onClose: () => void;
}

const InfoWindow = ({ position, onClose, children }: Props) => {
  const { map } = useContext(GmapContext);
  const [windowInstance, setWindowInstance] =
    useState<google.maps.InfoWindow | null>(null);
  const [closeclickListener, setCloseClickListener] =
    useState<google.maps.MapsEventListener | null>(null);
  const containerElementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (windowInstance !== null) {
      windowInstance.close();

      if (windowInstance.getPosition()) {
        windowInstance.open(map);
      }
    }
  }, [map, windowInstance]);

  useEffect(() => {
    let infoWindow: google.maps.InfoWindow;
    if (map) {
      containerElementRef.current = document.createElement("div");
      infoWindow = new google.maps.InfoWindow({
        content: containerElementRef.current,
        position,
      });
      // infoWindow.addListener("closeclick", () => onClose());
      setWindowInstance(infoWindow);
    }

    return () => {
      if (closeclickListener) {
        google.maps.event.removeListener(closeclickListener);
      }

      infoWindow.close();
    };
  }, [closeclickListener, map, onClose, position]);

  return containerElementRef.current
    ? createPortal(Children.only(children), containerElementRef.current)
    : null;
};

export default InfoWindow;
