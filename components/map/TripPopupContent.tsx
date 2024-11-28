import { EyeIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import css from "./Map.module.css";
import { TripListItem } from "@/types/gql/graphql";

interface PopupProps {
  trip: TripListItem | null;
}
export function PopupContent({ trip }: PopupProps) {
  return trip ? (
    <div className="relative bg-white w-[300px] min-h-[200px]">
      <Link href={trip.slug ? `/trips/${trip.slug}` : "/trips"}>
        <div className="relative h-[200px]">
          <Image
            alt="trip thumb image"
            fill
            sizes="100%"
            src={trip?.thumb_url ?? ""}
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
          dangerouslySetInnerHTML={{ __html: trip?.title ?? "" }}
        ></p>
      </div>
    </div>
  ) : null;
}
