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
