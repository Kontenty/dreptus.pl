import type { NextPage, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { Post } from "../types";
import { getPostsWithThumb } from "lib/db";
import Link from "next/link";

export const getStaticProps: GetStaticProps = async (context) => {
  const posts = await getPostsWithThumb(9);
  return {
    props: { posts: posts ? JSON.parse(JSON.stringify(posts)) : [] }, // will be passed to the page component as props
  };
};

interface Props {
  posts: Post[];
}

const Home: NextPage<Props> = ({ posts }) => {
  return (
    <div className="grid grid-cols:1 lg:grid-cols-3 gap-6 ld:gap-10">
      {posts.map((p) => (
        <div
          key={p.ID}
          className="border border-slate-200 rounded cursor-pointer overflow-hidden"
        >
          <Link href={p?.post_name ? `/trips/${p.post_name}` : "/news"}>
            <a>
              <div className="overflow-hidden">
                <div className="hover:scale-125 transition-all duration-500">
                  <Image
                    src={p?.thumb_url || ""}
                    alt="thumbnail"
                    width={380}
                    height={280}
                  />
                </div>
              </div>
              <div className="px-5 py-4">
                <p className="text-xs text-slate-500 mb-2">
                  {new Intl.DateTimeFormat("pl-PL", {
                    dateStyle: "short",
                  }).format(new Date(p.post_date))}
                </p>
                <h2 dangerouslySetInnerHTML={{ __html: p.post_title }}></h2>
              </div>
            </a>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Home;
