/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dreptuś.pl",
      },
      {
        protocol: "https",
        hostname: "xn--dreptu-8ib.pl",
      },
      {
        protocol: "https",
        hostname: "wp.xn--dreptu-8ib.pl",
      },
      {
        protocol: "http",
        hostname: "dreptus.cal24.pl",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/about",
        destination: "/",
        permanent: true,
      },
      {
        source: "/uczestnicy-tras",
        destination: "/participants",
        permanent: false,
      },
      {
        source: "/lista-tras",
        destination: "/trips",
        permanent: false,
      },
      {
        source: "/karta-startowa",
        destination: "/form",
        permanent: false,
      },
      {
        source: "/aktualnosci",
        destination: "/news",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
