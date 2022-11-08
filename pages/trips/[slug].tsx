import type { NextPage, GetStaticProps } from "next";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import { useEffect } from "react";
import Head from "next/head";
import { getTripSlugs, getTripBySlug } from "lib/db";

import { Post, Trip } from "types";
interface Props {
  post: Post;
}
const Icon = {
  "10898": "foot",
  "10899": "bike",
};
const Post: NextPage<Props> = (props) => {
  const router = useRouter();
  return (
    <div>
      {router.isFallback ? (
        <h1>Loading…</h1>
      ) : (
        <>
          <article>
            <h1>example trip content</h1>
            <pre>{JSON.stringify(props, null, 2)}</pre>
          </article>
        </>
      )}
    </div>
  );
};
export default Post;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const trip: Trip[] = await getTripBySlug(
    "kampinoski-park-narodowykampinoskie-historie"
  );
  return {
    props: {
      params,
      trip,
    },
  };
};

export async function getStaticPaths() {
  const allTrips = await getTripSlugs();
  return {
    paths:
      allTrips?.map((trip) => ({
        params: {
          slug: `${trip?.post_name}`,
          id: trip?.ID,
        },
      })) || [],
    /* paths: [
      { params: { slug: "palac-w-wilanowiew-magicznym-ogrodzie" } },
      {
        params: {
          slug: "http://localhost:3000/trips/kampinoski-park-narodowykampinoskie-historie",
        },
      },
    ], */
    fallback: false,
  };
}
