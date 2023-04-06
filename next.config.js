/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'strapi.allesimrudel.de',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'allesimrudel.de',
        port: '3000',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost:1337',
        pathname: '/uploads/**',
      },
    ],
  },
}

module.exports = nextConfig