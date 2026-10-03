import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true, // Disable Vercel image optimization to avoid costs
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'maps.googleapis.com',
        pathname: '/maps/api/staticmap/**',
      },
      {
        protocol: 'https',
        hostname: '0gmf7mtzbsc8xrur.public.blob.vercel-storage.com',
        pathname: '/gallery/**',
      },
    ],
  },
};

export default nextConfig;
