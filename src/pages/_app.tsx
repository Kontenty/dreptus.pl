import { useEffect } from "react";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "../styles/globals.css";
import "../styles/prime-theme.css";
import type { AppProps } from "next/app";
import AOS from "aos";
export { reportWebVitals } from "next-axiom";

import Layout from "components/layout/CommonLayout";
import { Analytics } from "@vercel/analytics/react";
import "src/styles/customized-aos.css";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    AOS.init({ duration: 1200, easing: "ease-out", once: true });
  }, []);
  return (
    <>
      <Layout>
        <Component {...pageProps} />;
      </Layout>
      <Analytics />
    </>
  );
}
