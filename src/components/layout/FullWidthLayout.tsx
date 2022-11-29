import Head from "next/head";
import type { ReactNode } from "react";
import { ScrollTop } from "primereact/scrolltop";
import Header from "components/Header";
import Footer from "components/Footer";

type Props = {
  children: ReactNode;
};

const FullWidthLayout = ({ children }: Props) => {
  return (
    <>
      <Head>
        <title>Dreptuś</title>
        <meta
          name="description"
          content="Dreptuś - turystyczna rodzinna impreza plenerowa"
        />
        <meta
          name="keywords"
          content="trino, impreza na orientację, turystyka"
        />
        <meta
          name="og:title"
          property="og:title"
          content="Dreptuś - turystyczna rodzinna impreza plenerowa"
        ></meta>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest"></link>
      </Head>
      <div id="root" className="flex flex-col min-h-screen">
        <Header />
        <div className="flex flex-col flex-grow">{children}</div>
        <Footer />
      </div>
      <ScrollTop />
    </>
  );
};

export default FullWidthLayout;
