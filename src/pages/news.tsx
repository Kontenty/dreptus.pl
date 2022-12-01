import type { NextPage, InferGetStaticPropsType } from "next";
import Image from "next/image";
import Link from "next/link";
import { getPlaiceholder } from "plaiceholder";
import Main from "components/layout/MainLayout";
import { getPostsWithThumb } from "lib/db";
import css from "styles/News.module.css";
import packImg from "public/image/pakiety-startowe.jpg";

export const getStaticProps = async () => {
  const postsData = await getPostsWithThumb(6);
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
      <section>
        <h2 className="text-4xl mb-6 text-brand-green-dark">Najnowsze trasy</h2>
        <div className={css.newsGrid}>
          {posts.map((p) => (
            <div key={p.ID} className={css.card}>
              <Link href={p?.post_name ? `/trips/${p.post_name}` : "/news"}>
                <div className="overflow-hidden">
                  <div className="hover:scale-105 transition-all duration-500">
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
      </section>
      <section>
        <h2 className="text-4xl mb-6 text-brand-green-dark">
          Pakiety startowe
        </h2>
        <div className="flex flex-wrap-reverse gap-6">
          <article>
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
              wcześniejszym uzgodnieniu z organizatorem. Koszt pakietu to 10 zł,
              najlepiej płatne na konto (mBank 18 1140 2004 0000 3502 8088
              6768), z dopiskiem „pakiet startowy” i podaniem numeru trasy.
              Proponowane trasy znajdziecie poniżej. Oczywiście liczba
              dostępnych w tej formie tras będzie systematycznie rosła. Co o tym
              myślicie? Czekam na Wasze głosy i uwagi.
            </p>
          </article>
          <aside className="lg:w-1/3">
            <Image src={packImg} alt="pakiety startowe" />
          </aside>
        </div>
      </section>
    </Main>
  );
};

export default Home;
