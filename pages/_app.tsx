import type { AppProps } from "next/app";
import Layout from "components/layout/FullWidthLayout";
import "../styles/globals.css";
import { LoadScript } from "@react-google-maps/api";
const googleKey = "AIzaSyB1XwgwHr9tgBinodv48WPifH4euSOn9CA";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <LoadScript googleMapsApiKey={googleKey}>
        <Component {...pageProps} />
      </LoadScript>
      ;
    </Layout>
  );
}
