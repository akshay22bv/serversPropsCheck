/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // loader: "imgix",
    // path: "/", // Set path to root directory
    domains: ["cdn.sanity.io"], // Add Sanity CDN domain
  },
};

export default nextConfig;
