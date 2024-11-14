import type { InferGetStaticPropsType, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { getPlaiceholder } from "plaiceholder";
import { Accordion, AccordionTab } from "primereact/accordion";

import Main from "@/components/layout/MainLayout";
import { getPage, getPostsWithThumb } from "@/lib/db";
import css from "styles/News.module.css";
import packImg from "@/public/image/pakiety-startowe2.jpg";

export const getStaticProps = async () => {
  const postsData = await getPostsWithThumb(6);
  if (!postsData) {
    return {
      props: { posts: [] },
      revalidate: 60 * 60 * 12,
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
  const packets = await getPage(20167);
  return {
    props: { posts: posts || [], packets, revalidate: 60 * 60 * 12 },
  };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const NewsPage: NextPage<Props> = ({ posts, packets }) => {
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
              width={400}
            />
            <p className="text-justify max-w-2xl">
              Idąc za namową dobrej znajomej business woman (dla wtajemniczonych
              E.T.) oraz chcąc poprawić frekwencję na trasach postanowiłem
              ułatwić Wam zadanie i nie tylko publikować trasy w formie plików
              do samodzielnego wydrukowania, ale i przygotować gotowe pakiety
              startowe – takie pay &amp; go. W skład każdego pakietu wchodzą:
              dwie kolorowe, zalaminowane mapy, dwie unikalne dla danej trasy
              naklejki, karta startowa oraz przyrząd do pisania – „dreptusiowy”
              długopis lub coś na słodko (wg życzenia uczestnika). Pakiety można
              zamawiać pisząc na adres trip.poczta(małpka)onet.pl, a odbierać
              np. podczas kolejnych TRIP z Dreptusiem lub osobiście, po
              wcześniejszym uzgodnieniu z organizatorem. Koszt pakietu to 12 zł,
              najlepiej płatne na konto (mBank 18 1140 2004 0000 3502 8088
              6768), z dopiskiem „pakiet startowy” i podaniem numeru trasy.
              Proponowane trasy znajdziecie poniżej. Oczywiście liczba
              dostępnych w tej formie tras będzie systematycznie rosła. Co o tym
              myślicie? Czekam na Wasze głosy i uwagi.
            </p>
          </article>
        </div>
      </section>
      <div className="card clear-both">
        <Accordion>
          <AccordionTab header="Pakiety">
            {packets && (
              <div
                className="format-table"
                dangerouslySetInnerHTML={{
                  __html: packets.post_content,
                }}
              />
            )}
          </AccordionTab>
        </Accordion>
      </div>
    </Main>
  );
};

export default NewsPage;
