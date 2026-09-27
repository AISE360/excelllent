import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/webp", "image/avif"],
    remotePatterns: [
      { protocol: "https", hostname: "**.supabase.co" },
      { protocol: "https", hostname: "easydrysystems.com" },
    ],
  },
  async redirects() {
    return [];
  },
};

export default nextConfig;
