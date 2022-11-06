import knex from "knex";

const db = knex({
  client: "mysql2",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  },
  debug: true,
  pool: { min: 1, max: 5 },
});

export const getPosts = async (limit = 10) => {
  const posts = await db("wp_posts as p")
    .join("wp_postmeta", "wp_postmeta.post_id", "p.ID")
    .select("p.ID", "p.post_date", "p.post_title", "wp_postmeta.meta_value")
    .where({ post_type: "listing", meta_key: "_cth_cus_field_zxr0feyjz" })
    .orderBy("post_date", "desc")
    .limit(limit);
  return posts;
};

export const getPostsWithThumb = async (limit = 10) => {
  const posts = await db.raw(
    "SELECT p.ID, p.post_title, p.post_date, pm.meta_value as 'thumb_id', (SELECT p2.guid  FROM wp_posts p2 WHERE p2.ID=pm.meta_value) 'thumb_url' FROM wp_posts p JOIN wp_postmeta pm ON pm.post_id = p.ID WHERE pm.meta_key = ? AND p.post_status = ? ORDER BY p.ID DESC LIMIT ?",
    ["_thumbnail_id", "publish", limit]
  );
  return posts[0];
};

export default db;
