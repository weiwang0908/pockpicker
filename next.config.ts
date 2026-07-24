import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1", "*.agent-sandbox-bj-d2-gw.traecontent.cn"],
  async redirects() {
    return [
      {
        source: "/pokemon-starter-picker",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
