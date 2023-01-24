import { Prisma } from "@prisma/client";
import { log } from "next-axiom";
import { PostResponse, TripDetails, TripsForMapResponse } from "src/types";
import prisma from "./prisma";

export const getTrips = async (limit = 10) =>
  prisma.wp_posts.findMany({
    where: { post_type: "listing", post_status: "publish" },
    select: {
      ID: true,
      post_date: true,
      post_title: true,
      post_name: true,
      wp_postmeta: {
        where: { meta_key: "_cth_cus_field_zxr0feyjz" },
        select: { meta_value: true },
      },
    },
    orderBy: { post_date: "desc" },
    take: limit,
  });

export const getTripSlugs = () =>
  prisma.wp_posts.findMany({
    select: { post_name: true },
    where: { post_type: "listing", post_status: "publish" },
  });

export const getTripBySlug = async (
  slug: string
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
    const query = Prisma.sql`SELECT ID, post_title, post_content,
      (SELECT meta_value FROM wp_postmeta WHERE post_id=${id} AND meta_key='_cth_images' ) as images_str,
      (SELECT guid FROM wp_posts WHERE ID = (SELECT meta_value FROM wp_postmeta WHERE post_id=${id} AND meta_key='_cth_menu_pdf') ) as pdf_images,
      (SELECT meta_value FROM wp_postmeta WHERE post_id=${id} AND meta_key='_cth_cus_field_zxr0feyjz' ) as number,
      (SELECT meta_value FROM wp_postmeta WHERE post_id=${id} AND meta_key='_cth_cus_field_15kr29dj3' ) as author,
      (SELECT meta_value FROM wp_postmeta WHERE post_id=${id} AND meta_key='_cth_cus_field_nv0mho3ts' ) as length,
      (SELECT meta_value FROM wp_postmeta WHERE post_id=${id} AND meta_key='_cth_cus_field_yjar0aoq6' ) as pk,
      (SELECT meta_value FROM wp_postmeta WHERE post_id=${id} AND meta_key='_cth_cus_field_boz3z5wv9' ) as founding,
      (SELECT meta_value FROM wp_postmeta WHERE post_id=${id} AND meta_key='_cth_cus_field_0o5uhb4c9' ) as type,
      (SELECT meta_value FROM wp_postmeta WHERE post_id=${id} AND meta_key='_cth_latitude' ) 'lat',
      (SELECT meta_value FROM wp_postmeta WHERE post_id=${id} AND meta_key='_cth_longitude' ) 'lng',
      (SELECT meta_value FROM wp_postmeta WHERE post_id=${id} AND meta_key='_cth_cus_field_i5t95ytae' ) 'pdf_images'
  FROM wp_posts WHERE ID = ${id}`;
    const [trip] = await prisma.$queryRaw<TripDetails[]>`${query}`;

    const images = await prisma.wp_posts.findMany({
      select: { ID: true, guid: true, post_title: true },
      where: {
        ID: { in: trip?.images_str.split(",").map((n) => Number(n)) },
      },
    });

    const pdfImages = await prisma.wp_posts.findMany({
      select: { ID: true, guid: true, post_title: true },
      where: {
        ID: { in: trip?.pdf_images.split(",").map((n) => Number(n)) },
      },
    });

    return { ...trip, images, pdfImages };
  } catch (error) {
    log.error("Get trip by slug error", { msg: error });
    return null;
  }
};

export const getTripsForMap = async (
  location = "all"
): Promise<TripsForMapResponse[]> => {
  const locationQuery = location === "all" ? "" : `AND t.slug = ${location}`;

  const query = `
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
    LEFT JOIN wp_postmeta as pm1 ON ( pm1.post_id = p.ID)
    LEFT JOIN wp_posts as p2 ON p2.ID = pm1.meta_value
    JOIN wp_term_relationships AS tr ON tr.object_id=p.ID JOIN wp_terms AS t ON t.term_id =tr.term_taxonomy_id
    WHERE p.post_type = 'listing' AND p.post_status = 'publish' ${locationQuery}
    GROUP BY p.ID,p.post_title;
  `;
  const postData = await prisma.$queryRawUnsafe<TripsForMapResponse[]>(query);
  return postData;
};

export const getLocations = async () => {
  const postData = await prisma.$queryRaw<
    { name: string; count: number; slug: string }[]
  >`SELECT a.name, b.count, a.slug from wp_term_taxonomy b 
    LEFT JOIN wp_terms a ON a.term_id = b.term_id 
    WHERE b.taxonomy like "%listing_location%" ORDER BY b.count DESC;`;

  return postData?.map((l) => ({ ...l, count: Number(l.count) })) || [];
};

export const getPostsWithThumb = async (limit = 10): Promise<PostResponse[]> =>
  prisma.$queryRaw<
    PostResponse[]
  >`SELECT p.ID, p.post_title,p.post_name, p.post_date, pm.meta_value as 'thumb_id', (SELECT p2.guid  FROM wp_posts p2 WHERE p2.ID=pm.meta_value) 'thumb_url' FROM wp_posts p JOIN wp_postmeta pm ON pm.post_id = p.ID WHERE pm.meta_key = '_thumbnail_id' AND p.post_status = 'publish' ORDER BY p.ID DESC LIMIT ${limit}`;

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
  >`SELECT p.ID, p.post_name, p.post_title, p.post_modified, m.meta_value as participants FROM wp_posts p JOIN wp_postmeta m ON m.post_id = p.ID WHERE p.post_type = "post" AND p.post_status = "publish" AND m.meta_key = "liczba_uczestnikow" ORDER BY p.post_title;`;

export const getParticipantSlugs = () =>
  prisma.wp_posts.findMany({
    select: { post_name: true },
    where: { post_type: "post", post_status: "publish" },
  });

export const getParticipantBySlug = (name: string) =>
  prisma.wp_posts.findFirst({
    where: { post_type: "post", post_status: "publish", post_name: name },
  });
