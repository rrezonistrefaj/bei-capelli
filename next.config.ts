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
      // Strapi Cloud API domain
      {
        protocol: 'https',
        hostname: '**.strapiapp.com',
        pathname: '/uploads/**',
      },
      // Strapi Cloud Media CDN (where images are actually served)
      {
        protocol: 'https',
        hostname: '**.media.strapiapp.com',
        pathname: '/**',
      },
      // Specific Strapi Cloud domains (fallback)
      {
        protocol: 'https',
        hostname: 'supreme-purpose-e6d53c9a20.strapiapp.com',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'supreme-purpose-e6d53c9a20.media.strapiapp.com',
        pathname: '/**',
      },
    ],
  },
  // Optimize bundle size
  experimental: {
    optimizePackageImports: ['motion', 'lucide-react', '@radix-ui/react-slot', 'class-variance-authority'],
  },
  // Production optimizations
  compress: true,
  poweredByHeader: false,
  // Security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
