import './src/lib/env/env.mjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com'
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com'
      },
      {
        protocol: 'https',
        hostname: 'static.remove.bg'
      },
      {
        protocol: 'https',
        hostname: '2.img-dpreview.com'
      },
      {
        protocol: 'https',
        hostname: 't4.ftcdn.net'
      }
    ]
  }
};

export default nextConfig;
