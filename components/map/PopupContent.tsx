"use client";

import { EyeIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { XCircleIcon } from "@heroicons/react/24/solid";
import DOMPurify from "isomorphic-dompurify";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";
import type { TripFormMap } from "@/types";
import css from "./map.module.css";

interface PopupContentProps {
  trip: TripFormMap;
  onClose?: () => void;
}

export const PopupContent = memo(function PopupContent({
  trip,
  onClose,
}: Readonly<PopupContentProps>) {
  return (
    <div className="relative bg-white w-75 min-h-50" data-aos="fade">
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onClose?.();
        }}
        className={css.closeButton}
        aria-label="Close"
      >
        <XCircleIcon className="w-7 h-7" />
      </button>
      <Link href={trip.slug ? `/trips/${trip.slug}` : "/trips"}>
        <div className="relative h-50 overflow-hidden">
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
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(trip.title ?? ""),
          }}
        />

        {trip.lat && trip.lng && (
          <small className="text-slate-600">
            <MapPinIcon className="w-3 h-3 mr-1 inline-block" />
            {Number(trip.lat).toFixed(4)} {Number(trip.lng).toFixed(4)}
          </small>
        )}
      </div>
    </div>
  );
});
