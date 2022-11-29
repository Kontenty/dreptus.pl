import type { NextPage, InferGetStaticPropsType } from "next";
import Image from "next/image";
import Link from "next/link";
import { getPlaiceholder } from "plaiceholder";
import Main from "components/layout/MainLayout";
import { getPostsWithThumb } from "lib/db";
import css from "styles/News.module.css";

export const getStaticProps = async () => {
  const postsData = await getPostsWithThumb(9);
  const posts = await Promise.all(
    postsData.map(async (p) => {
      const {
        base64,
        img: { src, type },
      } = await getPlaiceholder(p?.thumb_url || "");
      return {
        ...p,
        post_date: p.post_date.toString(),
        image: {
          src,
          type,
          title: p.post_name,
          blurDataURL: base64,
        },
      };
    })
  );
  return {
    props: { posts }, // will be passed to the page component as props
  };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Home: NextPage<Props> = ({ posts }) => {
  return (
    <Main>
      <div className={css.newsGrid}>
        {posts.map((p) => (
          <div key={p.ID} className={css.card}>
            <Link href={p?.post_name ? `/trips/${p.post_name}` : "/news"}>
              <div className="overflow-hidden">
                <div className="hover:scale-125 transition-all duration-500">
                  <Image
                    alt={`thumbnail-${p.post_name}`}
                    width={380}
                    height={280}
                    placeholder="blur"
                    {...p.image}
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
            </Link>
          </div>
        ))}
      </div>
    </Main>
  );
};

export default Home;
