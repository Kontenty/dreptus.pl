import { Prisma } from "@prisma/client";
import type {
  ParticipantOnTrip,
  PostResponse,
  TripDetails,
  TripFormMap,
  TripListResponse,
  TripsForMapResponse,
} from "@/types";
import { locationsSet } from "./data";
import { prisma } from "./prisma";

import { sortTrips } from "./utils";

export const getTrips = async (limit?: number) => {
  const limitPart =
    typeof limit === "number" ? Prisma.sql`LIMIT ${limit}` : Prisma.empty;
  const query = Prisma.sql`SELECT p.ID, p.post_title, p.post_name, p.post_date, pm.meta_value AS number FROM wp_posts p
  JOIN wp_postmeta pm ON p.ID = pm.post_id
  WHERE post_type = 'listing' AND post_status = 'publish' AND pm.meta_key = '_cth_cus_field_zxr0feyjz'
  ORDER BY p.post_date DESC
  ${limitPart}`;

  const trips = await prisma.$queryRaw<TripListResponse[]>`${query}`;
  return trips;
};

export const getTripSlugs = () =>
  prisma.wp_posts.findMany({
    select: { post_name: true },
    where: { post_type: "listing", post_status: "publish" },
  });

export const getTripBySlug = async (
  slug: string,
): Promise<TripDetails | null> => {
  try {
    const idData = await prisma.wp_posts.findFirst({
      select: { ID: true },
      where: { post_name: slug },
    });
    const id = idData?.ID;
    if (!id) {
      return null;
    }

    const metaKeys = [
      "_cth_images",
      "_cth_menu_pdf",
      "_cth_cus_field_zxr0feyjz",
      "_cth_cus_field_15kr29dj3",
      "_cth_cus_field_nv0mho3ts",
      "_cth_cus_field_yjar0aoq6",
      "_cth_cus_field_boz3z5wv9",
      "_cth_cus_field_0o5uhb4c9",
      "_cth_latitude",
      "_cth_longitude",
      "_cth_cus_field_i5t95ytae",
    ];

    const query = Prisma.sql`
      SELECT 
        p.ID, 
        p.post_title, 
        p.post_content,
        MAX(CASE WHEN pm.meta_key = '_cth_images' THEN pm.meta_value END) as images_str,
        MAX(CASE WHEN pm.meta_key = '_cth_menu_pdf' THEN (
          SELECT p2.guid FROM wp_posts p2 WHERE p2.ID = pm.meta_value
        ) END) as pdf,
        MAX(CASE WHEN pm.meta_key = '_cth_cus_field_zxr0feyjz' THEN pm.meta_value END) as number,
        MAX(CASE WHEN pm.meta_key = '_cth_cus_field_15kr29dj3' THEN pm.meta_value END) as author,
        MAX(CASE WHEN pm.meta_key = '_cth_cus_field_nv0mho3ts' THEN pm.meta_value END) as length,
        MAX(CASE WHEN pm.meta_key = '_cth_cus_field_yjar0aoq6' THEN pm.meta_value END) as pk,
        MAX(CASE WHEN pm.meta_key = '_cth_cus_field_boz3z5wv9' THEN pm.meta_value END) as founding,
        MAX(CASE WHEN pm.meta_key = '_cth_cus_field_0o5uhb4c9' THEN pm.meta_value END) as type,
        MAX(CASE WHEN pm.meta_key = '_cth_latitude' THEN pm.meta_value END) as lat,
        MAX(CASE WHEN pm.meta_key = '_cth_longitude' THEN pm.meta_value END) as lng,
        MAX(CASE WHEN pm.meta_key = '_cth_cus_field_i5t95ytae' THEN pm.meta_value END) as pdf_images
      FROM wp_posts p
      LEFT JOIN wp_postmeta pm ON pm.post_id = p.ID AND pm.meta_key IN (${Prisma.join(metaKeys)})
      WHERE p.ID = ${id}
      GROUP BY p.ID
    `;
    const [trip] = await prisma.$queryRaw<TripDetails[]>`${query}`;

    if (!trip) {
      return null;
    }

    const images = trip?.images_str
      ? await prisma.wp_posts.findMany({
          select: { ID: true, guid: true, post_title: true },
          where: {
            ID: { in: trip.images_str.split(",").map((n) => Number(n)) },
          },
        })
      : [];

    const pdfImages = trip?.pdf_images
      ? await prisma.wp_posts.findMany({
          select: { ID: true, guid: true, post_title: true },
          where: {
            ID: { in: trip.pdf_images.split(",").map((n) => Number(n)) },
          },
        })
      : [];

    return { ...trip, images, pdfImages };
  } catch (_error) {
    return null;
  }
};

export const getTripsForMap = async (
  location = "all",
): Promise<TripFormMap[]> => {
  const locationQuery =
    location && location !== "all"
      ? Prisma.sql`AND t.slug = ${location}`
      : Prisma.empty;

  const query = Prisma.sql`
      SELECT  p.ID, 
        p.post_title as title, 
        p.post_name as slug, 
        GROUP_CONCAT(DISTINCT t.name) as category_names,
        GROUP_CONCAT(DISTINCT t.slug) as category_slugs,
        MAX(CASE WHEN pm1.meta_key = '_cth_cus_field_yjar0aoq6' then pm1.meta_value ELSE NULL END) as pk,
        MAX(CASE WHEN pm1.meta_key = '_cth_cus_field_zxr0feyjz' then pm1.meta_value ELSE NULL END) as number,
        MAX(CASE WHEN pm1.meta_key = '_cth_cus_field_nv0mho3ts' then pm1.meta_value ELSE NULL END) as length,
        MAX(CASE WHEN pm1.meta_key = '_cth_cus_field_0o5uhb4c9' then pm1.meta_value ELSE NULL END) as type,
        MAX(CASE WHEN pm1.meta_key = '_cth_latitude' then pm1.meta_value ELSE NULL END) as lat,
        MAX(CASE WHEN pm1.meta_key = '_cth_longitude' then pm1.meta_value ELSE NULL END) as lng,
        MAX(CASE WHEN pm1.meta_key = '_thumbnail_id' then pm1.meta_value ELSE NULL END) as thumb_id,
        MAX(CASE WHEN pm1.meta_key = '_thumbnail_id' then p2.guid ELSE NULL END) as thumb_url
    FROM wp_posts as p 
    LEFT JOIN wp_postmeta as pm1 ON pm1.post_id = p.ID AND pm1.meta_key IN ('_cth_cus_field_yjar0aoq6', '_cth_cus_field_zxr0feyjz', '_cth_cus_field_nv0mho3ts', '_cth_cus_field_0o5uhb4c9', '_cth_latitude', '_cth_longitude', '_thumbnail_id')
    LEFT JOIN wp_posts as p2 ON p2.ID = pm1.meta_value
    JOIN wp_term_relationships AS tr ON tr.object_id=p.ID 
    JOIN wp_terms AS t ON t.term_id = tr.term_taxonomy_id
    WHERE p.post_type = 'listing' AND p.post_status = 'publish' ${locationQuery}
    GROUP BY p.ID, p.post_title;
  `;
  const postData = await prisma.$queryRaw<TripsForMapResponse[]>(query);

  return (
    postData
      ?.map((trip) => ({
        ...trip,
        id: trip.ID,
        ID: Number(trip.ID),
        lat: trip.lat.toString(),
        lng: trip.lng.toString(),
        position: { lat: Number(trip.lat), lng: Number(trip.lng) },
        locations: trip.category_names
          ?.split(",")
          .filter((name: string) => locationsSet.has(name.toLowerCase()))
          .toString(),
        dolinaBugu: !!trip.category_slugs?.includes("dolina-bugu"),
      }))
      .sort(sortTrips) ?? []
  );
};

export const getLocations = async () => {
  const postData = await prisma.$queryRaw<
    { name: string; count: number; slug: string }[]
  >`SELECT a.name, b.count, a.slug from wp_term_taxonomy b 
    LEFT JOIN wp_terms a ON a.term_id = b.term_id 
    WHERE b.taxonomy = 'listing_location' ORDER BY b.count DESC;`;

  return postData?.map((l) => ({ ...l, count: Number(l.count) })) || [];
};

export const getPostsWithThumb = async (limit = 10): Promise<PostResponse[]> =>
  prisma.$queryRaw<PostResponse[]>(Prisma.sql`
  SELECT p.ID, p.post_title,p.post_name, p.post_date, pm.meta_value as 'thumb_id', 
    (SELECT p2.guid  FROM wp_posts p2 WHERE p2.ID=pm.meta_value) 'thumb_url' FROM wp_posts p 
    JOIN wp_postmeta pm ON pm.post_id = p.ID 
  WHERE pm.meta_key = '_thumbnail_id' AND p.post_status = 'publish' ORDER BY p.ID DESC LIMIT ${limit}`);

export const getPage = (id: number) =>
  prisma.wp_posts.findUnique({ where: { ID: id } });

export const getElementorPage = async (id: number) => {
  const data = await prisma.wp_postmeta.findFirst({
    select: { meta_value: true },
    where: { post_id: id, meta_key: "_elementor_data" },
  });
  return data ? data?.meta_value : null;
};
export const getTripsCount = () =>
  prisma.wp_posts.count({
    where: { post_type: "listing", post_status: "publish" },
  });

export const getParticipantsPostsList = () =>
  prisma.$queryRaw<
    PostResponse[]
  >`SELECT p.ID, p.post_name, p.post_title, p.post_modified, m.meta_value as participants FROM wp_posts p 
    JOIN wp_postmeta m ON m.post_id = p.ID 
    WHERE p.post_type = "post" AND p.post_status = "publish" AND m.meta_key = "liczba_uczestnikow" ORDER BY p.post_title;`;

export const getTripsParticipants = () =>
  prisma.$queryRaw<
    ParticipantOnTrip[]
  >(Prisma.sql`SELECT tp.id,  tp.trip_id, m.meta_value AS number, p.post_title, MAX(tp.report_date) AS report_date, COUNT(tp.trip_id) AS pptCount 
    FROM TripParticipant tp
      JOIN wp_posts p ON p.ID = tp.trip_id
      JOIN wp_postmeta m ON m.post_id = p.ID WHERE m.meta_key = '_cth_cus_field_zxr0feyjz'
    GROUP  BY tp.trip_id ORDER BY p.post_title;`);

export const getParticipantSlugs = () =>
  prisma.tripParticipant.groupBy({
    by: ["trip_id"],
  });

export const getParticipantById = (id: number) =>
  prisma.tripParticipant.findMany({
    where: {
      trip_id: id,
    },
    include: {
      participant: true,
      trip: {
        select: {
          post_title: true,
        },
      },
    },
  });

export const getAdmins = () =>
  prisma.$queryRaw<
    { user_email: string }[]
  >`SELECT user_email FROM wp_users u JOIN wp_usermeta m ON m.user_id = u.ID 
      WHERE m.meta_key = "wp_user_level" AND m.meta_value  > 6;`;
