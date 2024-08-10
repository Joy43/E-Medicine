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
            hostname: "images.unsplash.com",
          },
          {
            protocol: "https",
            hostname: "images.clerk.dev",
          },
          {
            protocol: "https",
            hostname: "i.postimg.cc",
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
