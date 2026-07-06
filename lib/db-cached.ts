import { unstable_cache } from "next/cache";
import type {
  BadgeScorerWithDetails,
  TripFormMap,
  TripListResponse,
} from "@/types";
import {
  getLocations as _getLocations,
  getTrips as _getTrips,
  getTripsCount as _getTripsCount,
  getTripsForMap as _getTripsForMap,
} from "./db";
import { prisma } from "./prisma";

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

export const getCachedBadgeScorers = unstable_cache(
  async (badgeSlug: string): Promise<BadgeScorerWithDetails[]> => {
    return prisma.badgeScorer.findMany({
      where: { badge: { slug: badgeSlug } },
      include: {
        participant: { select: { id: true, name: true, origin: true } },
        degree: { select: { id: true, name: true } },
      },
      orderBy: [
        { degree: { sort_order: "asc" } },
        { participant: { name: "asc" } },
      ],
    });
  },
  ["badge-scorers"],
  {
    tags: ["badges"],
    revalidate: 86400,
  },
);

export const getCachedBadgeScorerCounts = unstable_cache(
  async () => {
    const badges = await prisma.badge.findMany({
      include: {
        degrees: {
          include: {
            _count: { select: { scorers: true } },
          },
          orderBy: { sort_order: "asc" },
        },
        _count: { select: { scorers: true } },
      },
      orderBy: { name: "asc" },
    });
    return badges;
  },
  ["badge-scorer-counts"],
  {
    tags: ["badges"],
    revalidate: 86400,
  },
);
