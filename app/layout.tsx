import "./global.css";
import "./prime-theme.css";
import { PrimeReactProvider } from "primereact/api";
import Header from "@/components/Header";
import { Nunito, Open_Sans } from "next/font/google";
import Footer from "@/components/Footer";
import AosProvider from "@/components/aos/AosProvider";

const nunito = Nunito({
  subsets: ["latin", "latin-ext"],
  variable: "--heading-font",
  display: "swap",
});
const openSans = Open_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--text-font",
  display: "swap",
});

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Readonly<Props>) {
  return (
    <html lang="pl" className={`${nunito.variable} ${openSans.variable}`}>
      <head>
        <title>Dreptuś</title>
        <meta
          content="Dreptuś - Turystyczna Rodzinna Impreza Plenerowa"
          name="description"
        />
        <meta content="Konrad Górski" name="author" />
        <link href="https://xn--dereptu-8ib.pl" rel="canonical" />
        <link href="/favicon.ico" rel="icon" />

        <meta content="pl_PL" property="og:locale" />
        <meta content="Dreptuś" property="og:site_name" />
        <meta content="website" property="og:type" />
        <meta
          content="Dreptuś - Turystyczna Rodzinna Impreza Plenerowa"
          property="og:description"
        />
        <meta content="https://xn--dereptu-8ib.pl" property="og:url" />
      </head>
      <body>
        <AosProvider />
        <PrimeReactProvider>
          <div
            className="flex flex-col min-h-screen overflow-x-auto pt-[52px] md:pt-[90px]"
            id="root"
          >
            <Header />
            <div className="flex flex-col flex-grow">{children}</div>
            <Footer />
          </div>
        </PrimeReactProvider>
      </body>
    </html>
  );
}
