import type { NextPage, GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import DCarousel from "components/carousel/DreptusCarousel";
import Main from "components/layout/MainLayout";
import Hr from "components/hr";
import css from "../styles/Home.module.css";
import anouncment from "public/image/anouncment.png";
import trip from "public/image/trip.png";
import { Post } from "src/types";
import { getTrips } from "lib/db";
import Hero from "components/hero";

export const getStaticProps: GetStaticProps = async () => {
  const trips = await getTrips();
  return {
    props: { trips: trips ? JSON.parse(JSON.stringify(trips)) : [] }, // will be passed to the page component as props
  };
};

interface Props {
  trips: Post[];
}

const Home: NextPage<Props> = ({ trips }) => {
  return (
    <>
      <Hero />
      <Main>
        <section>
          <div className="flex">
            <div className="w-1/3">
              <DCarousel />
            </div>
            <article>
              <h1 className={css.title}>Kim jest Dreptuś?</h1>
              <p className="p-justify">
                Dreptuś to wesoły, przemiły emotikon, który przyszedł na świat w
                niemieckim Freiburgu za sprawą Gerda Altmanna. Od pewnego czasu
                mieszkał sobie na Pixabay&apos;u, natomiast do Polski przybył
                latem 2020 roku na zaproszenie pewnego Dariusza i tak mu się
                tutaj spodobało, że postanowił zostać na dłużej, połączyła ich
                bowiem wspólna pasja do podróżowania.
              </p>
              <p className="p-justify">
                Swoje wyprawy zaczęli od Warszawy, gdzie razem zamieszkali. To
                dynamicznie rozwijające się miasto nad Wisłą od ponad czterech
                wieków będące stolicą Polski, pełne kontrastów, mile ich
                zaskoczyło i wciąż nie przestaje zadziwiać. Nic więc dziwnego,
                że choć odbyli po nim już tyle wycieczek, wciąż nie brakuje
                tutaj miejsc wartych odkrycia i pokazania innym. A potem
                przyszedł czas na dłuższe wyprawy, już poza miasto. Te bliższe,
                do podwarszawskich miejscowości i te dalsze, po Mazowszu, i te
                zupełnie dalekie, po Polsce. Chcecie dołączyć do nich? Jeżeli
                tak, zapraszamy! ps. W trakcie kolejnych wycieczek wyszła na jaw
                jeszcze jedna, oprócz tej do podróżowania, słabość Dreptusia. To
                jego zamiłowanie do różnych nakryć głowy, ale to pewnie już
                zauważyliście 😀.
              </p>
            </article>
          </div>
        </section>
        {/* tTRIP */}
        <Hr length={18} />
        <section>
          <h2 className={css.title}>TRIP</h2>
          <div>
            <aside className="float-right w-1/2">
              <Image src={trip} alt="TRIP" />
            </aside>
            <article>
              <p className="p-justify">
                Trip czyli Turystyczna Rodzinna Impreza Plenerowa to forma gry
                terenowej łączącej poznawanie ciekawych miejsc z dobrą zabawą.
                Polega ona na odszukaniu wskazanych na mapie miejsc zwanych
                punktami kontrolnymi (PK) i potwierdzeniu pobytu na nich poprzez
                udzielenie odpowiedzi na związane z nimi pytanie, dopasowaniu
                zdjęcia lub wykonaniu innego zadania wskazanego przez
                organizatora.
              </p>
              <p className="p-justify">
                Aby wziąć w niej udział nie potrzeba żądnych nadzwyczajnych
                umiejętności czy specjalistycznego sprzętu. Wystarczy jedynie
                wejść na stronę dreptuś.pl, w zakładce „TRASY” wybrać
                interesującą Was trasę, wydrukować ją i w dowolnym, dogodnym dla
                Was czasie, udać się na wycieczkę. Zarówno sposób, jak i czas
                pokonania trasy zależą wyłącznie od Was. Możecie przejść ją
                pieszo, przejechać rowerem, na rolkach, hulajnodze, na lub w
                wózku czy nawet samochodem. Jedyne czego nie wolno, to odbywać
                wycieczek wirtualnych np. sprzed ekranu komputera. Na wycieczkę
                możecie udać się samemu, w gronie rodziny lub w towarzystwie
                znajomych, możecie ją odbyć jednego dnia lub podzielić na etapy.
                A po wszystkim należy jeszcze tylko przesłać do organizatora
                odpowiedzi i cieszyć się ze zdobycia pamiątkowej odznaki.
              </p>
            </article>
          </div>
        </section>
        {/* Ogłoszenia */}
        <Hr length={18} />
        <section>
          <div className="flex gap-6">
            <aside className="w-1/3">
              <Image src={anouncment} alt="Ogłoszenia" />
            </aside>
            <article className="w-2/3">
              <h2 className={css.title}>Ogłoszenia</h2>
              <h3 className="text-xl text-center">
                Dreptuś zaprasza do wspólnego zwiedzania
              </h3>
              <p className="p-justify">
                Za nami rok intensywnej pracy nad Projektem Turystyczno
                Rekreacyjnej Imprezy Plenerowej. Powstała strona internetowa,
                sukcesywnie przybywa tras.{" "}
                <strong>Obecnie jest ich 100 😀</strong>
                , z czego blisko połowa w samej Warszawie. Choć jedna trasa
                pojawiła się już na terenie 8 województw. Większość to trasy
                nowe, nigdy wcześniej nie publikowane. Z kolei trasy starsze
                zostały w większości sprawdzone i uaktualnione.
                <br />
                Mamy 14 zdobywców odznaki “Z Dreptusiem po Polsce”, 4 “Z
                Dreptusiem Traktem Królewskim” i 2 “Z Dreptusiem po Dolinie
                Bugu”. Przy przesyłaniu odpowiedzi prosimy korzystać z
                formularza, odznaki czekają:
              </p>
              <ol>
                <li>1. „Z Dreptusiem po Dolinie Bugu” (dostępna)</li>
                <li>
                  2. „Z Dreptusiem po Polsce” – w stopniu zielonym i żółtym
                  (dostępna)
                </li>
                <li>3. „Z Dreptusiem Traktem Królewskim” (dostępna)</li>
              </ol>
              <p>Do zobaczenia na trasach 😀</p>
            </article>
          </div>
        </section>
        <section>
          <h3 className={css.title}>Ostatnio dodane trasy:</h3>
          <div className="flex flex-col">
            {trips.map((trip) => (
              <div key={trip.ID}>
                <Link href={`/trips/${trip.post_name}`}>
                  <a>
                    {trip.number}. {trip.post_title.replace("<br>", " / ")} (
                    {new Intl.DateTimeFormat("pl-PL", {
                      dateStyle: "short",
                    }).format(new Date(trip.post_date))}
                    )
                  </a>
                </Link>
              </div>
            ))}
          </div>
        </section>
      </Main>
    </>
  );
};

export default Home;
