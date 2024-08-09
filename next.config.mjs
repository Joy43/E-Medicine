/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "i.ibb.co",
          },
          {
            protocol: "https",
            hostname: "ap-southeast-2.graphassets.com",
          },
          {
            protocol: "https",
            hostname: "images.clerk.dev",
          },
        ],
      },
    typescript: {
        ignoreBuildErrors: true,
      },
      eslint: {
        ignoreDuringBuilds: true,
      },
};

export default nextConfig;
