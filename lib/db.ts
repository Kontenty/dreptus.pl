import knex from "knex";
import { TripsForMapResponse } from "types";

const db = knex({
  client: "mysql2",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  },
  debug: false,
  pool: { min: 1, max: 5 },
});

export const getTrips = async (limit = 10) => {
  const posts = await db("wp_posts as p")
    .join("wp_postmeta", "wp_postmeta.post_id", "p.ID")
    .select(
      "p.ID",
      "p.post_date",
      "p.post_title",
      "p.post_name",
      "wp_postmeta.meta_value"
    )
    .where({
      post_type: "listing",
      post_status: "publish",
      meta_key: "_cth_cus_field_zxr0feyjz",
    })
    .orderBy("post_date", "desc")
    .limit(limit);
  return posts;
};

export const getTripSlugs = async () => {
  const posts = await db("wp_posts")
    .select("post_name")
    .where({ post_type: "listing", post_status: "publish" });
  return posts;
};

export const getTripBySlug = async (slug: string) => {
  const idData = await db("wp_posts").select("ID").where({ post_name: slug });
  const id = idData[0].ID;
  if (!id) return [];
  const query = `SELECT ID, post_title, post_content,\
    (SELECT meta_value FROM wp_postmeta WHERE post_id=${id} AND meta_key='_cth_images' ) 'images',\
    (SELECT guid FROM wp_posts WHERE ID = (SELECT meta_value FROM wp_postmeta WHERE post_id=${id} AND meta_key='_cth_menu_pdf') ) 'pdf',\
    (SELECT meta_value FROM wp_postmeta WHERE post_id=${id} AND meta_key='_cth_cus_field_zxr0feyjz' ) 'number',\
    (SELECT meta_value FROM wp_postmeta WHERE post_id=${id} AND meta_key='_cth_cus_field_15kr29dj3' ) 'author',\
    (SELECT meta_value FROM wp_postmeta WHERE post_id=${id} AND meta_key='_cth_cus_field_nv0mho3ts' ) 'length',\
    (SELECT meta_value FROM wp_postmeta WHERE post_id=${id} AND meta_key='_cth_cus_field_yjar0aoq6' ) 'pk',\
    (SELECT meta_value FROM wp_postmeta WHERE post_id=${id} AND meta_key='_cth_cus_field_boz3z5wv9' ) 'founding',\
    (SELECT meta_value FROM wp_postmeta WHERE post_id=${id} AND meta_key='_cth_cus_field_0o5uhb4c9' ) 'type',\
    (SELECT meta_value FROM wp_postmeta WHERE post_id=${id} AND meta_key='_cth_latitude' ) 'lat',\
    (SELECT meta_value FROM wp_postmeta WHERE post_id=${id} AND meta_key='_cth_longitude' ) 'lon'\
FROM wp_posts WHERE ID = ${id}`;
  const postData = await db.raw(query);
  const imageString = postData[0][0].images;
  const trip = postData[0][0];
  const images = await db("wp_posts")
    .select("guid as url", "post_title as title")
    .whereIn("ID", imageString.split(","));
  trip.images = images;
  return trip;
};

export const getTripsForMap = async (): Promise<TripsForMapResponse[]> => {
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
        MAX(CASE WHEN pm1.meta_key = '_cth_longitude' then pm1.meta_value ELSE NULL END) as lon,
        MAX(CASE WHEN pm1.meta_key = '_thumbnail_id' then pm1.meta_value ELSE NULL END) as thumb_id,
        MAX(CASE WHEN pm1.meta_key = '_thumbnail_id' then p2.guid ELSE NULL END) as thumb_url
    FROM wp_posts as p 
    LEFT JOIN wp_postmeta as pm1 ON ( pm1.post_id = p.ID)
    LEFT JOIN wp_posts as p2 ON p2.ID = pm1.meta_value
    JOIN wp_term_relationships AS tr ON tr.object_id=p.ID JOIN wp_terms AS t ON t.term_id =tr.term_taxonomy_id
    WHERE p.post_type = 'listing' AND p.post_status = "publish"
    GROUP BY p.ID,p.post_title;
  `;
  const postData = await db.raw(query);
  return postData[0];
};

export const getLocations = async () => {
  const query = `
    SELECT a.name, b.count, a.slug from wp_term_taxonomy b 
    LEFT JOIN wp_terms a ON a.term_id = b.term_id 
    WHERE b.taxonomy like "%listing_location%" ORDER BY b.count DESC;
  `;
  const postData = await db.raw(query);

  return postData?.[0] || [];
};

export const getPostsWithThumb = async (limit = 10) => {
  const posts = await db.raw(
    "SELECT p.ID, p.post_title,p.post_name, p.post_date, pm.meta_value as 'thumb_id', (SELECT p2.guid  FROM wp_posts p2 WHERE p2.ID=pm.meta_value) 'thumb_url' FROM wp_posts p JOIN wp_postmeta pm ON pm.post_id = p.ID WHERE pm.meta_key = ? AND p.post_status = ? ORDER BY p.ID DESC LIMIT ?",
    ["_thumbnail_id", "publish", limit]
  );
  return posts[0];
};

export default db;
