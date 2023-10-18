import { useEffect } from "react";
import { SWRConfig } from "swr";
import AOS from "aos";
import { Nunito, Open_Sans } from "next/font/google";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "../styles/globals.css";
import "../styles/prime-theme.css";
import type { AppProps } from "next/app";
export { reportWebVitals } from "next-axiom";

import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import { addLocale, locale } from "primereact/api";
import Layout from "components/layout/CommonLayout";
import "src/styles/customized-aos.css";

const nunito = Nunito({ subsets: ["latin", "latin-ext"] });
const openSans = Open_Sans({ subsets: ["latin", "latin-ext"] });

addLocale("pl", {
  accept: "Tak",
  reject: "Nie",
  choose: "Wybierz",
  upload: "Wyślij",
  cancel: "Anuluj",
  dayNames: [
    "Niedziela",
    "Poniedziałek",
    "Wtorek",
    "Środa",
    "Czwartek",
    "Piątek",
    "Sobota",
  ],
  dayNamesShort: ["niedz.", "pon.", "wt.", "śr.", "czw.", "pt.", "sob."],
  dayNamesMin: ["niedz.", "pon.", "wt.", "śr.", "czw.", "pt.", "sob."],
  monthNames: [
    "Styczeń",
    "Luty",
    "Marzec",
    "Kwiecień",
    "Maj",
    "Czerwiec",
    "Lipiec",
    "Sierpień",
    "Wrzesień",
    "Październik",
    "Listopad",
    "Grudzień",
  ],
  monthNamesShort: [
    "STY",
    "LUT",
    "MAR",
    "KWI",
    "MAJ",
    "CZE",
    "LIP",
    "SIE",
    "WRZ",
    "PAŹ",
    "LIS",
    "GRU",
  ],
  today: "Dziś",
  clear: "Wyczyść",
  weekHeader: "tydz.",
  firstDayOfWeek: 0,
  dateFormat: "dd/mm/yyyy",
  weak: "Słaby",
  medium: "Umiarkowany",
  strong: "Silny",
  passwordPrompt: "Podaj hasło",
});
locale("pl");

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  useEffect(() => {
    AOS.init({ duration: 1200, easing: "ease-out", once: true });
  }, []);
  return (
    <SessionProvider session={session}>
      <style global jsx>
        {`
          :root {
            --heading-font: ${nunito.style.fontFamily};
            --text-font: ${openSans.style.fontFamily};
          }
        `}
      </style>
      <SWRConfig
        value={{
          fetcher: (resource, init) =>
            fetch(resource, init).then((res) => res.json()),
        }}
      >
        <Layout>
          <Component {...pageProps} />;
        </Layout>
      </SWRConfig>
    </SessionProvider>
  );
}
