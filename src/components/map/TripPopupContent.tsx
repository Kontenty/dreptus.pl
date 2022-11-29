import { EyeIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { TripFormMap } from "src/types";
import css from "./Map.module.css";

interface PopupProps {
  trip: TripFormMap | null;
}
export function PopupContent({ trip }: PopupProps) {
  return trip ? (
    <div className="relative bg-white w-[300px] min-h-[200px]">
      <Link href={trip.slug ? `/trips/${trip.slug}` : "/trips"}>
        <div className="relative h-[200px]">
          <Image
            src={trip.thumb_url}
            fill
            sizes="100%"
            style={{ objectFit: "cover" }}
            alt="trip thumb image"
          />
          <div className={css.imgOverlay}>
            <EyeIcon className={css.imgIcon} />
          </div>
        </div>
      </Link>
      <div className="p-4">
        <p
          className="text-sm leading-tight font-semibold mb-1 text-slate-600"
          dangerouslySetInnerHTML={{ __html: trip.title }}
        ></p>
      </div>
    </div>
  ) : null;
}
