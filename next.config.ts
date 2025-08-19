import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  serverExternalPackages: ["@node-rs/argon"],
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Ignore argon2 in the client bundle
      config.resolve.fallback = {
        ...(config.resolve.fallback || {}),
        "@node-rs/argon2": false,
      };
    }
    return config;
  },
};

export default nextConfig;
