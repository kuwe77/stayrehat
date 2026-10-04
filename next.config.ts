import type { NextConfig } from "next";
const config: NextConfig = {
  poweredByHeader: false,
  devIndicators: false,
  trailingSlash: true,
  async redirects() {
    return [
      {
        source: "/gallery",
        destination: "/facilities/#gallery",
        permanent: false,
      },
    ];
  },
};
export default config;
