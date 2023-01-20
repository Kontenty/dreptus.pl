import { useEffect } from "react";
import AOS from "aos";
import { Nunito } from "@next/font/google";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "../styles/globals.css";
import "../styles/prime-theme.css";
import type { AppProps } from "next/app";
export { reportWebVitals } from "next-axiom";

import Layout from "components/layout/CommonLayout";
import { Analytics } from "@vercel/analytics/react";
import "src/styles/customized-aos.css";

const nunito = Nunito({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    AOS.init({ duration: 1200, easing: "ease-out", once: true });
  }, []);
  return (
    <>
      <style global jsx>
        {`
          :root {
            --nunito-font: ${nunito.style.fontFamily};
          }
        `}
      </style>
      <Layout>
        <Component {...pageProps} />;
      </Layout>
      <Analytics />
    </>
  );
}
