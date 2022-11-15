import type { AppProps } from "next/app";
import Layout from "components/layout/FullWidthLayout";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />;
    </Layout>
  );
}
