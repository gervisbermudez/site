import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    // trailingSlash 308s /_next/image → /_next/image/, which drops the optimizer query.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source:
          "/blog/2024/05/07/lightweight-and-powerful-codeigniter-the-php-framework/",
        destination:
          "/blog/2024/08/07/lightweight-and-powerful-codeigniter-the-php-framework/",
        permanent: true,
      },
      {
        source:
          "/blog/:category/2024/05/07/lightweight-and-powerful-codeigniter-the-php-framework/",
        destination:
          "/blog/2024/08/07/lightweight-and-powerful-codeigniter-the-php-framework/",
        permanent: true,
      },
      {
        source: "/blog/page1/",
        destination: "/blog/",
        permanent: true,
      },
      {
        source: "/blog/page/1/",
        destination: "/blog/",
        permanent: true,
      },
      {
        source: "/blog/page:num(\\d+)/",
        destination: "/blog/page/:num/",
        permanent: true,
      },
      {
        source:
          "/blog/:category/:year(\\d{4})/:month(\\d{2})/:day(\\d{2})/:slug/",
        destination: "/blog/:year/:month/:day/:slug/",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/public/:path*",
        destination: "/:path*",
      },
    ];
  },
};

export default nextConfig;
