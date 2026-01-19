import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Enables static export
  images: {
    unoptimized: true,
  }, 
  basePath: '', 
  assetPrefix: '',
};

export default nextConfig;