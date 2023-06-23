/* eslint-disable react/no-string-refs */
import Head from "next/head";
import type { ReactNode } from "react";
import { ScrollTop } from "primereact/scrolltop";
import Header from "components/Header";
import Footer from "components/Footer";

type Props = {
  children: ReactNode;
};

const FullWidthLayout = ({ children }: Props) => {
  const csp = `
    default-src 'self' localhost:* https://wp.xn--dreptu-8ib.pl https://maps.googleapis.com; 
    base-uri 'none';
    connect-src 'self' https://vitals.vercel-insights.com https://maps.googleapis.com;
    font-src 'self' https://fonts.gstatic.com;
    img-src * data: w3.org/svg/2000;
    object-src 'none';
    script-src 'self' 'unsafe-eval' 'unsafe-inline' localhost:* https://*.vercel-insights.com https://maps.googleapis.com;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com`;

  return (
    <>
      <Head>
        <title>Dreptuś</title>
        <meta content={csp} httpEquiv="Content-Security-Policy" />
        <meta
          content="Dreptuś - Turystyczna Rodzinna Impreza Plenerowa"
          name="description"
        />
        <meta content="Konrad Górski" name="author" />
        <link ref="https://xn--dereptu-8ib.pl" rel="canonical" />
        <link href="/favicon.ico" rel="icon" />

        <meta content="pl_PL" property="og:locale" />
        <meta content="Dreptuś" property="og:site_name" />
        <meta content="website" property="og:type" />
        <meta
          content="Dreptuś - Turystyczna Rodzinna Impreza Plenerowa"
          property="og:description"
        />
        <meta content="https://xn--dereptu-8ib.pl" property="og:url" />
      </Head>
      <div
        className="flex flex-col min-h-screen overflow-x-auto pt-[76px] md:pt-[90px]"
        id="root"
      >
        <Header />
        <div className="flex flex-col flex-grow">{children}</div>
        <Footer />
      </div>
      <ScrollTop />
    </>
  );
};

export default FullWidthLayout;
