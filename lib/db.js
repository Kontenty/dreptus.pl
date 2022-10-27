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

export const getPosts = async () => {
  const posts = await db("wp_posts as p")
    .join("wp_postmeta", "wp_postmeta.post_id", "p.ID")
    .select("p.ID", "p.post_date", "p.post_title", "wp_postmeta.meta_value")
    .where({ post_type: "listing", meta_key: "_cth_cus_field_zxr0feyjz" })
    .orderBy("post_date", "desc")
    .limit(10);
  return posts;
};

export default db;
