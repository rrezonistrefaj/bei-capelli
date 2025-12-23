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
    ],
  },
  // Optimize bundle size
  experimental: {
    optimizePackageImports: ['motion', 'lucide-react', '@radix-ui/react-slot', 'class-variance-authority'],
  },
};

export default nextConfig;
