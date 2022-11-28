import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "../styles/globals.css";
import "../styles/prime-theme.css";
import type { AppProps } from "next/app";
import Layout from "components/layout/FullWidthLayout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />;
    </Layout>
  );
}
