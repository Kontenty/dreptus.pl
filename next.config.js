/** @type {import('next').NextConfig} */
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
        protocol: "http",
        hostname: "dreptus.cal24.pl",
      },
    ],
  },
};

module.exports = nextConfig;
