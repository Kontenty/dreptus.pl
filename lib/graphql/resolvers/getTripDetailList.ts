import { TripsForMapResponse } from "@/types";
import { GraphQLContext } from "../context";

export const getTripDetailList = (
  _parent: unknown,
  { location = "all" },
  { prisma }: GraphQLContext
) => {
  if (!location || location === "all") {
    return prisma.$queryRaw<TripsForMapResponse[]>`
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
    WHERE p.post_type = 'listing' AND p.post_status = 'publish'
    GROUP BY p.ID, p.post_title;
  `;
  }

  return prisma.$queryRaw<TripsForMapResponse[]>`
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
    WHERE p.post_type = 'listing' AND p.post_status = 'publish' AND t.slug = ${location}
    GROUP BY p.ID, p.post_title;
  `;
};
