import type { InferGetStaticPropsType, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { getPlaiceholder } from "plaiceholder";

import Main from "components/layout/MainLayout";
import { getPostsWithThumb } from "lib/db";
import css from "styles/News.module.css";
import packImg from "public/image/pakiety-startowe2.jpg";

export const getStaticProps = async () => {
  const postsData = await getPostsWithThumb(6);
  if (!postsData) {
    return {
      props: { posts: [] },
    };
  }
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
    props: { posts: posts || [], revalidate: 60 * 60 * 12 },
  };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Home: NextPage<Props> = ({ posts }) => {
  return (
    <Main>
      <section>
        <h2 className="text-4xl mb-6 text-brand-green-dark">Najnowsze trasy</h2>
        <div className={css.newsGrid}>
          {posts.map((p, i) => (
            <div data-aos="fade-up" data-aos-delay={i * 200} key={p.ID}>
              <div className={css.card} key={p.ID}>
                <Link href={p?.post_name ? `/trips/${p.post_name}` : "/news"}>
                  <div className="overflow-hidden">
                    <div className="hover:scale-105 transition-all duration-500">
                      <Image
                        alt={`thumbnail-${p.post_name}`}
                        height={280}
                        placeholder="blur"
                        unoptimized
                        width={380}
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
            </div>
          ))}
        </div>
      </section>
      <section>
        <h2 className="text-4xl mb-6 text-brand-green-dark">
          Pakiety startowe
        </h2>
        <div className="">
          <article className="">
            <Image
              alt="pakiety startowe"
              className="float-right sm:pl-4 pb-4"
              src={packImg}
              unoptimized
              width={400}
            />
            <p className="text-justify max-w-2xl">
              Id??c za namow?? dobrej znajomej business woman (dla wtajemniczonych
              E.T.) oraz chc??c poprawi?? frekwencj?? na trasach postanowi??em
              u??atwi?? Wam zadanie i nie tylko publikowa?? trasy w formie plik??w
              do samodzielnego wydrukowania, ale i przygotowa?? gotowe pakiety
              startowe ??? takie pay &amp; go. W sk??ad ka??dego pakietu wchodz??:
              dwie kolorowe, zalaminowane mapy, dwie unikalne dla danej trasy
              naklejki, karta startowa oraz przyrz??d do pisania ??? ???dreptusiowy???
              d??ugopis lub co?? na s??odko (wg ??yczenia uczestnika). Pakiety mo??na
              zamawia?? pisz??c na adres trip.poczta(ma??pka)onet.pl, a odbiera??
              np. podczas kolejnych TRIP z Dreptusiem lub osobi??cie, po
              wcze??niejszym uzgodnieniu z organizatorem. Koszt pakietu to 10 z??,
              najlepiej p??atne na konto (mBank 18 1140 2004 0000 3502 8088
              6768), z dopiskiem ???pakiet startowy??? i podaniem numeru trasy.
              Proponowane trasy znajdziecie poni??ej. Oczywi??cie liczba
              dost??pnych w tej formie tras b??dzie systematycznie ros??a. Co o tym
              my??licie? Czekam na Wasze g??osy i uwagi.
            </p>
          </article>
          <aside className="max-w-"></aside>
        </div>
      </section>
    </Main>
  );
};

export default Home;
