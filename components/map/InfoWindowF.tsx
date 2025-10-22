/* global google */
/** biome-ignore-all lint/correctness/useExhaustiveDependencies: <loop> */
import {
  Children,
  memo,
  type ReactNode,
  type ReactPortal,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

import { GoogleMapContext } from "@/lib/context";

export interface InfoWindowProps {
  children?: ReactNode | undefined;
  /** Can be any MVCObject that exposes a LatLng position property and optionally a Point anchorPoint property for calculating the pixelOffset. The anchorPoint is the offset from the anchor's position to the tip of the InfoWindow. */
  anchor?: google.maps.MVCObject | undefined;
  options?: google.maps.InfoWindowOptions | undefined;
  /** The LatLng at which to display this InfoWindow. If the InfoWindow is opened with an anchor, the anchor's position will be used instead. */
  position?: google.maps.LatLng | google.maps.LatLngLiteral | undefined;
  /** All InfoWindows are displayed on the map in order of their zIndex, with higher values displaying in front of InfoWindows with lower values. By default, InfoWindows are displayed according to their latitude, with InfoWindows of lower latitudes appearing in front of InfoWindows at higher latitudes. InfoWindows are always displayed in front of markers. */
  zIndex?: number | undefined;
  /** This event is fired when the close button was clicked. */
  onCloseClick?: (() => void) | undefined;
  /** This event is fired when the <div> containing the InfoWindow's content is attached to the DOM. You may wish to monitor this event if you are building out your info window content dynamically. */
  onDomReady?: (() => void) | undefined;
  /** This event is fired when the content property changes. */
  onContentChanged?: (() => void) | undefined;
  /** This event is fired when the position property changes. */
  onPositionChanged?: (() => void) | undefined;
  /** This event is fired when the InfoWindow's zIndex changes. */
  onZIndexChanged?: (() => void) | undefined;
  /** This callback is called when the infoWindow instance has loaded. It is called with the infoWindow instance. */
  onLoad?: ((infoWindow: google.maps.InfoWindow) => void) | undefined;
  /** This callback is called when the component unmounts. It is called with the infoWindow instance. */
  onUnmount?: ((infoWindow: google.maps.InfoWindow) => void) | undefined;
}

function InfoWindowFunctional({
  children,
  anchor,
  options,
  position,
  zIndex,
  onCloseClick,
  onDomReady,
  onContentChanged,
  onPositionChanged,
  onZIndexChanged,
  onLoad,
  onUnmount,
}: InfoWindowProps): ReactPortal | null {
  const map = useContext(GoogleMapContext);

  const [instance, setInstance] = useState<google.maps.InfoWindow | null>(null);

  const [closeClickListener, setCloseClickListener] =
    useState<google.maps.MapsEventListener | null>(null);
  const [domReadyClickListener, setDomReadyClickListener] =
    useState<google.maps.MapsEventListener | null>(null);
  const [contentChangedClickListener, setContentChangedClickListener] =
    useState<google.maps.MapsEventListener | null>(null);
  const [positionChangedClickListener, setPositionChangedClickListener] =
    useState<google.maps.MapsEventListener | null>(null);
  const [zIndexChangedClickListener, setZIndexChangedClickListener] =
    useState<google.maps.MapsEventListener | null>(null);

  const containerElementRef = useRef<HTMLDivElement | null>(null);

  // Order does matter
  useEffect(() => {
    if (instance !== null) {
      instance.close();

      if (anchor) {
        instance.open(map, anchor);
      } else if (instance.getPosition()) {
        instance.open(map);
      }
    }
  }, [map, instance, anchor]);

  useEffect(() => {
    if (options && instance !== null) {
      instance.setOptions(options);
    }
  }, [instance, options]);

  useEffect(() => {
    if (position && instance !== null) {
      instance.setPosition(position);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [position]);

  useEffect(() => {
    if (typeof zIndex === "number" && instance !== null) {
      instance.setZIndex(zIndex);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zIndex]);

  useEffect(() => {
    if (instance && onCloseClick) {
      if (closeClickListener !== null) {
        google.maps.event.removeListener(closeClickListener);
      }

      setCloseClickListener(
        google.maps.event.addListener(instance, "closeClick", onCloseClick),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onCloseClick]);

  useEffect(() => {
    if (instance && onDomReady) {
      if (domReadyClickListener !== null) {
        google.maps.event.removeListener(domReadyClickListener);
      }

      setDomReadyClickListener(
        google.maps.event.addListener(instance, "domReady", onDomReady),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onDomReady]);

  useEffect(() => {
    if (instance && onContentChanged) {
      if (contentChangedClickListener !== null) {
        google.maps.event.removeListener(contentChangedClickListener);
      }

      setContentChangedClickListener(
        google.maps.event.addListener(
          instance,
          "content_changed",
          onContentChanged,
        ),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onContentChanged]);

  useEffect(() => {
    if (instance && onPositionChanged) {
      if (positionChangedClickListener !== null) {
        google.maps.event.removeListener(positionChangedClickListener);
      }

      setPositionChangedClickListener(
        google.maps.event.addListener(
          instance,
          "position_changed",
          onPositionChanged,
        ),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onPositionChanged]);

  useEffect(() => {
    if (instance && onZIndexChanged) {
      if (zIndexChangedClickListener !== null) {
        google.maps.event.removeListener(zIndexChangedClickListener);
      }

      setZIndexChangedClickListener(
        google.maps.event.addListener(
          instance,
          "zindex_changed",
          onZIndexChanged,
        ),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onZIndexChanged]);

  useEffect(() => {
    const infoWindow = new google.maps.InfoWindow({
      ...(options || {}),
    });

    setInstance(infoWindow);

    containerElementRef.current = document.createElement("div");

    if (onCloseClick) {
      setCloseClickListener(
        google.maps.event.addListener(infoWindow, "closeClick", onCloseClick),
      );
    }

    if (onDomReady) {
      setDomReadyClickListener(
        google.maps.event.addListener(infoWindow, "domReady", onDomReady),
      );
    }

    if (onContentChanged) {
      setContentChangedClickListener(
        google.maps.event.addListener(
          infoWindow,
          "content_changed",
          onContentChanged,
        ),
      );
    }

    if (onPositionChanged) {
      setPositionChangedClickListener(
        google.maps.event.addListener(
          infoWindow,
          "position_changed",
          onPositionChanged,
        ),
      );
    }

    if (onZIndexChanged) {
      setZIndexChangedClickListener(
        google.maps.event.addListener(
          infoWindow,
          "zindex_changed",
          onZIndexChanged,
        ),
      );
    }

    infoWindow.setContent(containerElementRef.current);

    if (position) {
      infoWindow.setPosition(position);
    }

    if (zIndex) {
      infoWindow.setZIndex(zIndex);
    }

    if (anchor) {
      infoWindow.open(map, anchor);
    } else if (infoWindow.getPosition()) {
      infoWindow.open(map);
    } else {
      console.log(
        "❌ You must provide either an anchor (typically render it inside a <Marker>) or a position props for <InfoWindow>.",
      );
    }

    if (onLoad) {
      onLoad(infoWindow);
    }

    return () => {
      if (closeClickListener) {
        google.maps.event.removeListener(closeClickListener);
      }

      if (contentChangedClickListener) {
        google.maps.event.removeListener(contentChangedClickListener);
      }

      if (domReadyClickListener) {
        google.maps.event.removeListener(domReadyClickListener);
      }

      if (positionChangedClickListener) {
        google.maps.event.removeListener(positionChangedClickListener);
      }

      if (zIndexChangedClickListener) {
        google.maps.event.removeListener(zIndexChangedClickListener);
      }

      if (onUnmount) {
        onUnmount(infoWindow);
      }

      infoWindow.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return containerElementRef.current
    ? createPortal(Children.only(children), containerElementRef.current)
    : null;
}

export const InfoWindowF = memo(InfoWindowFunctional);
