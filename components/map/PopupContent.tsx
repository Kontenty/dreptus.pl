"use client";

import { EyeIcon, MapPinIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { TripFormMap } from "@/types";
import css from "./map.module.css";

interface PopupContentProps {
  trip: TripFormMap | null;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export function PopupContent({ trip, containerRef }: PopupContentProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!trip || !mounted || !containerRef.current) {
    return null;
  }

  return createPortal(
    <div className="relative bg-white w-[300px] min-h-[200px]">
      <Link href={trip.slug ? `/trips/${trip.slug}` : "/trips"}>
        <div className="relative h-[100px] overflow-hidden">
          <Image
            alt="trip thumb image"
            fill
            sizes="100%"
            src={trip.thumb_url ?? ""}
            style={{ objectFit: "cover" }}
            unoptimized
          />
          <div className={css.imgOverlay}>
            <EyeIcon className={css.imgIcon} />
          </div>
        </div>
      </Link>

      <div className="p-4">
        <p
          className="text-sm leading-tight font-semibold mb-1 text-slate-600"
          dangerouslySetInnerHTML={{ __html: trip.title ?? "" }}
        />

        {trip.lat && trip.lng && (
          <small className="text-slate-600">
            <MapPinIcon className="w-3 h-3 mr-1 inline-block" />
            {Number(trip.lat).toFixed(4)} {Number(trip.lng).toFixed(4)}
          </small>
        )}
      </div>
    </div>,
    containerRef.current,
  );
}
