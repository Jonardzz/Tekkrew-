/** @type {import('next').NextConfig} */
const nextConfig = {
  // React Bits' Grainient destroys its WebGL context on unmount; React Strict Mode's
  // dev-only double mount would then leave it frozen on a dead context.
  reactStrictMode: false,
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;