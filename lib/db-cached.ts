import { unstable_cache } from "next/cache";
import type { TripFormMap, TripListResponse } from "@/types";
import {
  getLocations as _getLocations,
  getTrips as _getTrips,
  getTripsCount as _getTripsCount,
  getTripsForMap as _getTripsForMap,
} from "./db";

export const getCachedTrips = unstable_cache(
  async (limit?: number): Promise<TripListResponse[]> => {
    return _getTrips(limit);
  },
  ["trips"],
  {
    tags: ["trips"],
    revalidate: 86400,
  },
);

export const getCachedTripsForMap = unstable_cache(
  async (location = "all"): Promise<TripFormMap[]> => {
    return _getTripsForMap(location);
  },
  ["trips-for-map"],
  {
    tags: ["trips"],
    revalidate: 86400,
  },
);

export const getCachedLocations = unstable_cache(
  async () => {
    return _getLocations();
  },
  ["locations"],
  {
    tags: ["trips"],
    revalidate: 86400,
  },
);

export const getCachedTripsCount = unstable_cache(
  async () => {
    return _getTripsCount();
  },
  ["trips-count"],
  {
    tags: ["trips"],
    revalidate: 86400,
  },
);
