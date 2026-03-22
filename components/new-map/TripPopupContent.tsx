import { EyeIcon, MapPinIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import type { TripFormMap } from "@/types";
import css from "./map.module.css";

export type TripPopupContentProps = {
  trip: TripFormMap | null;
};

export function TripPopupContent({ trip }: TripPopupContentProps) {
  if (!trip) {
    return null;
  }

  return (
    <div className="relative bg-white w-[300px] min-h-[200px]">
      <Link href={trip.slug ? `/trips/${trip.slug}` : "/trips"}>
        <div className="relative h-[200px]">
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
    </div>
  );
}
