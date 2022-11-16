import "../styles/prime-theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "components/layout/FullWidthLayout";
import { useJsApiLoader } from "@react-google-maps/api";

export default function App({ Component, pageProps }: AppProps) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || "",
  });
  return (
    <Layout>
      <Component {...pageProps} />;
    </Layout>
  );
}
