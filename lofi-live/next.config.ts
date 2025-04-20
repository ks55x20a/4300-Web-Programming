import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["seatgeekimages.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**"
      }
    ]
  },
};

export default nextConfig;
