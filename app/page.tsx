export const revalidate = 86400; // 24 hours

import Image from "next/image";
import Link from "next/link";
import DreptusCarousel from "@/components/carousel/DreptusCarousel";
import Hero from "@/components/hero";
import Hr from "@/components/hr";
import Main from "@/components/ui/Main";
import { getTrips, getTripsCount } from "@/lib/db";
import { prisma } from "@/lib/prisma";
import odznaki from "@/public/image/odznaki.jpg";
import trip from "@/public/image/trip.jpg";
import css from "./style.module.css";

const getData = async () => {
  const trips = await getTrips(10);
  const tripsCount = (await getTripsCount()) || 180;
  const participantsCount = (await prisma.tripParticipant.count()) || 2000;
  return {
    trips,
    tripsCount,
    participantsCount,
  };
};

export default async function Home() {
  const data = await getData();
  const trips = data?.trips;
  return (
    <>
      <Hero />
      <Main>
        <section data-aos="fade-up">
          <div className={css.aboutSection}>
            <div>
              <DreptusCarousel width={280} />
            </div>
            <article>
              <h1 className={css.title} data-aos="slide-up">
                Kim jest <span className="text-bg">Dreptuś?</span>
              </h1>
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
        <section data-aos="fade-up">
          <h2 className={css.title}>TRIP</h2>
          <div>
            <aside
              className="float-right w-2/5 p-2 pl-4"
              data-aos="zoom-in-left"
            >
              <Image alt="TRIP" src={trip} />
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
        <section data-aos="fade-up">
          <h2 className={css.title}>
            <span className="text-bg">Dreptuś</span> zaprasza do wspólnego
            zwiedzania
          </h2>
          <aside data-aos="zoom-in-right">
            <Image alt="odznaki dreptuś" height={250} src={odznaki} />
          </aside>
          <article className="max-w-3xl">
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
            Mamy&nbsp;70 zdobywców odznaki “Z Dreptusiem po Polsce”, w tym:
            <ul className="list-disc list-inside ml-6">
              <li>3 w stopniu niebieskim (łącznie co najmniej 160 tras),</li>
              <li>19 w stopniu żółtym (łącznie ponad 60 tras),</li>
            </ul>
            21&nbsp;“Z&nbsp;Dreptusiem Traktem Królewskim”&nbsp;i&nbsp;10 “Z
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
        </section>
        <section data-aos="fade-up">
          <h3 className={css.title}>Ostatnio dodane trasy:</h3>
          <div className="flex flex-col">
            {trips?.map((trip) => (
              <div key={trip.ID}>
                <Link className={css.link} href={`/trips/${trip.post_name}`}>
                  {trip?.number}. {trip?.post_title?.replace("<br>", " / ")} (
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
}
