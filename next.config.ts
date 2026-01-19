import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Enables static export
  images: {
    unoptimized: true,
  }, // This closing brace was missing
  /* config options here */
};

export default nextConfig;