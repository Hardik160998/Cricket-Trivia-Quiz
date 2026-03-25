import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/base/:path*',
        destination: `${process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'}/:path*`,
      },
    ]
  },
};

export default nextConfig;
