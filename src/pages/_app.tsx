import { useEffect } from "react";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "../styles/globals.css";
import "../styles/prime-theme.css";
import type { AppProps } from "next/app";
import Layout from "components/layout/CommonLayout";
import { GoogleProvider } from "context";
import { Analytics } from "@vercel/analytics/react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    AOS.init({ duration: 1200, easing: "ease-out-back", once: true });
  }, []);
  return (
    <>
      <GoogleProvider>
        <Layout>
          <Component {...pageProps} />;
        </Layout>
      </GoogleProvider>
      <Analytics />
    </>
  );
}
