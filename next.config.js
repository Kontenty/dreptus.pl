/** @type {import('next').NextConfig} */
const { withAxiom } = require("next-axiom");

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
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
  experimental: {
    swcPlugins: [
      [
        "next-superjson-plugin",
        {
          excluded: [],
        },
      ],
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
    ];
  },
};

module.exports = withAxiom(nextConfig);
