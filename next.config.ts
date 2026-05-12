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
  async redirects() {
    return [
      {
        source: "/opportunities",
        destination: "/careers",
        permanent: true,
      },
      {
        source: "/opportunities/:slug*",
        destination: "/careers/:slug*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
