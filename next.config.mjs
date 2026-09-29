/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow external images from postimg
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.postimg.cc",
      },
      {
        protocol: "https",
        hostname: "i0.wp.com",
      },
    ],
    // Disable Next.js image optimization for external URLs (using native <img>)
    unoptimized: true,
  },
  // Compress responses
  compress: true,
  // Allow large video files from public
  experimental: {
    largePageDataBytes: 512 * 1024,
  },
};

export default nextConfig;
