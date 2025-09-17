import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Development
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      // Production - replace with your actual Strapi domain
      {
        protocol: 'https',
        hostname: 'your-strapi-domain.com',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;
