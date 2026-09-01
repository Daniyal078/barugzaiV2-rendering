import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      }
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      {
        source: '/car-details/146',
        destination: '/cars-for-sale?manufacturer_ids=8&model_ids=40',
        permanent: true,
      },
      {
        source: '/car-details/145',
        destination: '/cars-for-sale?manufacturer_ids=7&model_ids=11',
        permanent: true,
      },
      {
        source: '/car-details/144',
        destination: '/cars-for-sale?manufacturer_ids=11&model_ids=46',
        permanent: true,
      },
      {
        source: '/car-details/64',
        destination: '/cars-for-sale?manufacturer_ids=7&model_ids=8',
        permanent: true,
      },
      {
        source: '/blog/',
        destination: '/blogs/',
        permanent: true,
      },
      {
        source: '/toyota-land-cruiser-interior-customization-dubai/',
        destination: '/custom-luxury-suv-dubai/',
        permanent: true,
      },
      {
        source: "/sell-your-car",
        destination: "/",
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
