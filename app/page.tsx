import Image from "next/image";
import { cacheExchange, createClient, fetchExchange } from "@urql/core";
import { registerUrql } from "@urql/next/rsc";
import css from "./style.module.css";
import odznaki from "./odznaki.jpg";
import Link from "next/link";
import { graphql } from "@/types/gql";

const makeClient = () => {
  return createClient({
    url: "http://localhost:3000/api/graphql",
    exchanges: [cacheExchange, fetchExchange],
  });
};

const { getClient } = registerUrql(makeClient);
const query = graphql(`
  query GetTrips($limit: Int) {
    trips(limit: $limit) {
      ID
      post_name
      post_date
      post_title
      wp_postmeta {
        meta_value
      }
    }
    tripsCount
    participantsCount
  }
`);

export default async function Home() {
  const { data } = await getClient().query(query, {});
  const trips = data?.trips;
  return (
    <>
      <section data-aos="fade-up">
        <h2 className={css.title}>
          <span className="text-bg">Dreptuś</span> zaprasza do wspólnego
          zwiedzania
        </h2>
        <div className="md:flex gap-6">
          <aside
            className="hidden md:flex justify-center items-center basis-1/4"
            data-aos="zoom-in-right"
          >
            <Image alt="odznaki dreptuś" src={odznaki} width={200} />
          </aside>
          <article className="basis-3/4 max-w-prose">
            <p className="p-justify ">
              Za nami dwa lata intensywnej pracy nad Projektem Turystyczno
              Rekreacyjnej Imprezy Plenerowej. Powstała strona internetowa,
              sukcesywnie przybywa tras.
              <br />
              <strong>Obecnie jest ich {data?.tripsCount} 😀</strong>, z czego
              jedna trzecia w samej Warszawie. Już tylko na terenie 4 województw
              nie ma jeszcze ani jednej trasy, ale pracujemy nad tym, aby ten
              stan nie potrwał zbyt długo. Większość to trasy nowe, nigdy
              wcześniej nie publikowane. Z kolei trasy starsze zostały w
              większości sprawdzone i uaktualnione.
            </p>
            Mamy&nbsp;50 zdobywców odznaki “Z Dreptusiem po Polsce”, w tym:
            <ul className="list-disc list-inside ml-6">
              <li>2 w stopniu niebieskim (łącznie co najmniej 160 tras),</li>
              <li>7 w stopniu żółtym (łącznie ponad 60 tras),</li>
            </ul>
            18&nbsp;“Z&nbsp;Dreptusiem Traktem Królewskim”&nbsp;i&nbsp;5 “Z
            Dreptusiem po Dolinie Bugu”.
            <br />
            <p>
              <strong>Z&nbsp;tras spłynęło {data?.participantsCount}</strong>{" "}
              zgłoszeń! Przy przesyłaniu odpowiedzi prosimy korzystać z{" "}
              <Link className={css.link} href="/form">
                formularza, odznaki czekają:
              </Link>
            </p>
            <ol className="list-decimal list-inside ml-6">
              <li>
                <Link
                  className={css.link}
                  href="badges/z-dreptusiem-po-dolinie-bugu"
                >
                  „Z Dreptusiem po Dolinie Bugu”
                </Link>
              </li>
              <li>
                <Link className={css.link} href="badges/z-dreptusiem-po-polsce">
                  „Z Dreptusiem po Polsce” – w stopniu zielonym, żółtym i
                  niebieskim
                </Link>
              </li>
              <li>
                <Link
                  className={css.link}
                  href="badges/z-dreptusiem-traktem-krolewskim"
                >
                  „Z Dreptusiem Traktem Królewskim”
                </Link>
              </li>
            </ol>
            <p className="text-right">Do zobaczenia na trasach 😀</p>
          </article>
        </div>
      </section>
      <section data-aos="fade-up">
        <h3 className={css.title}>Ostatnio dodane trasy:</h3>
        <div className="flex flex-col">
          {trips?.map((trip) => (
            <div key={trip.ID}>
              <Link className={css.link} href={`/trips/${trip.post_name}`}>
                {trip?.wp_postmeta[0].meta_value}.{" "}
                {trip?.post_title?.replace("<br>", " / ")} (
                {new Intl.DateTimeFormat("pl-PL", {
                  dateStyle: "short",
                }).format(new Date(trip.post_date))}
                )
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
