/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'strapi.allesimrudel.de',
        port: '3000',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'allesimrudel.de',
        port: '3000',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig