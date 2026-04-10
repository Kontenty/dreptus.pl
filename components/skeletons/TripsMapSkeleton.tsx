import { MapIcon } from "@heroicons/react/24/outline";

export function TripsMapSkeleton() {
  return (
    <div className="h-135 bg-olive-200 rounded-md animate-pulse flex items-center justify-center">
      <MapIcon className="w-16 h-16 text-olive-700" />
    </div>
  );
}
