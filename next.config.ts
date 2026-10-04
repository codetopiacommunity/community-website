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
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
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
      // Contributing guides renumbered from 01 (October 2026). Old links
      // live on in Discord messages, bookmarks and the bot.
      ...[
        ["06-ways-to-contribute", "01-ways-to-contribute"],
        ["04-make-your-first-contribution", "02-help-out"],
        ["05-your-first-fix", "03-your-first-pull-request"],
      ].map(([from, to]) => ({
        source: `/howtos/Contributing/${from}`,
        destination: `/howtos/Contributing/${to}`,
        permanent: true,
      })),
      {
        source: "/howtos/Contributing-and-Volunteering/:slug*",
        destination: "/howtos/Contributing/01-ways-to-contribute",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
