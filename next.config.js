const { host, port } = require("envalid");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
        port: "",
        pathname: "/photos/**",
      },
      {
        protocol: "https",
        hostname: "media.rawg.io",
        pathname: "/media/games/**",
        port: "",
      },
      {
        protocol: "https",
        hostname: "media.rawg.io",
        pathname: "/media/screenshots/**",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
// "https://media.rawg.io/media/games/20a/20aa03a10cda45239fe22d035c0ebe64.jpg"
