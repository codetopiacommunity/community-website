import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.hashnode.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "hashnode.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
