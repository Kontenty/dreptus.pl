import type { NextPage, GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import DCarousel from "components/carousel/DreptusCarousel";
import Main from "components/layout/MainLayout";
import Hr from "components/hr";
import css from "../styles/Home.module.css";
// import anouncment from "public/image/anouncment.png";
import trip from "public/image/trip.png";
import { Post } from "src/types";
import { getTrips, getTripsCount } from "lib/db";
import Hero from "components/hero";
import { SpeakerWaveIcon } from "@heroicons/react/24/outline";

export const getStaticProps: GetStaticProps = async () => {
  const trips = await getTrips();
  const tripsCount = await getTripsCount();
  return {
    props: {
      trips: trips ? JSON.parse(JSON.stringify(trips)) : [],
      tripsCount,
    }, // will be passed to the page component as props
  };
};

interface Props {
  trips: Post[];
  tripsCount: number;
}

const Home: NextPage<Props> = ({ trips, tripsCount }) => {
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
            <aside className="w-1/4 center-hv">
              {/* <Image src={anouncment} alt="Ogłoszenia" /> */}
              <div className="center-hv w-24 h-24 rounded-full bg-brand-primary/70">
                <SpeakerWaveIcon className="w-16 h-16 text-white" />
              </div>
            </aside>
            <article className="w-2/3 max-w-prose">
              <h2 className={css.title}>Ogłoszenia</h2>
              <h3 className="text-xl text-center">
                Dreptuś zaprasza do wspólnego zwiedzania
              </h3>
              <p className="p-justify ">
                Za nami dwa lata intensywnej pracy nad Projektem Turystyczno
                Rekreacyjnej Imprezy Plenerowej. Powstała strona internetowa,
                sukcesywnie przybywa tras.
                <br />
                <strong>Obecnie jest ich {tripsCount} 😀</strong>
                , z czego jedna trzecia w samej Warszawie. Już tylko na terenie
                5 województw nie ma jeszcze ani jednej trasy, ale pracujemy nad
                tym, aby ten stan nie potrwał zbyt długo. Większość to trasy
                nowe, nigdy wcześniej nie publikowane. Z kolei trasy starsze
                zostały w większości sprawdzone i uaktualnione.
                <br />
                <p className="pb-2">
                  Mamy 25 zdobywców odznaki “Z Dreptusiem po Polsce”, w tym 3 w
                  stopniu żółtym (50 tras), 15 “Z Dreptusiem Traktem
                  Królewskim” i 2 “Z Dreptusiem po Dolinie Bugu”. Z tras
                  spłynęło ponad 1000 zgłoszeń! Przy przesyłaniu odpowiedzi
                  prosimy korzystać z formularza, odznaki czekają:
                </p>
              </p>
              <ol>
                <li>1. „Z Dreptusiem po Dolinie Bugu” (dostępna)</li>
                <li>
                  2. „Z Dreptusiem po Polsce” – w stopniu zielonym i żółtym
                  (dostępna)
                </li>
                <li>3. „Z Dreptusiem Traktem Królewskim” (dostępna)</li>
              </ol>
              <p className="text-right">Do zobaczenia na trasach 😀</p>
            </article>
          </div>
        </section>
        <section>
          <h3 className={css.title}>Ostatnio dodane trasy:</h3>
          <div className="flex flex-col">
            {trips.map((trip) => (
              <div key={trip.ID}>
                <Link href={`/trips/${trip.post_name}`}>
                  {trip.number}. {trip.post_title.replace("<br>", " / ")} (
                  {new Intl.DateTimeFormat("pl-PL", {
                    dateStyle: "short",
                  }).format(new Date(trip.post_date))}
                  )
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
