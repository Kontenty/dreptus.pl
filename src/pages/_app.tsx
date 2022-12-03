import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "../styles/globals.css";
import "../styles/prime-theme.css";
import type { AppProps } from "next/app";
import Layout from "components/layout/CommonLayout";
import { GoogleProvider } from "context";
import { Nunito } from "@next/font/google";
const nunito = Nunito({ subsets: ["latin-ext"], variable: "--font-nunito" });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={nunito.className}>
      <GoogleProvider>
        <Layout>
          <Component {...pageProps} />;
        </Layout>
      </GoogleProvider>
    </div>
  );
}
