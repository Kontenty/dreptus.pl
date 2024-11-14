import "./globals.css";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Readonly<Props>) {
  return (
    <html lang="pl">
      <head>
        <title>Dreptuś</title>
        <meta
          content="Dreptuś - Turystyczna Rodzinna Impreza Plenerowa"
          name="description"
        />
        <meta content="Konrad Górski" name="author" />
        <link href="https://xn--dereptu-8ib.pl" rel="canonical" />
        <link href="/favicon.ico" rel="icon" />

        <meta content="pl_PL" property="og:locale" />
        <meta content="Dreptuś" property="og:site_name" />
        <meta content="website" property="og:type" />
        <meta
          content="Dreptuś - Turystyczna Rodzinna Impreza Plenerowa"
          property="og:description"
        />
        <meta content="https://xn--dereptu-8ib.pl" property="og:url" />
      </head>
      <body>
        <div
          className="flex flex-col min-h-screen overflow-x-auto pt-[52px] md:pt-[90px]"
          id="root"
        >
          {/* <Header /> */}
          <div className="flex flex-col flex-grow">{children}</div>
          {/* <Footer /> */}
        </div>
      </body>
    </html>
  );
}
