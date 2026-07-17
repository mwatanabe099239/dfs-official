/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  async redirects() {
    return [
      // Legacy /difinesai/* routes moved to /ai/*
      { source: '/difinesai', destination: '/ai', permanent: true },
      { source: '/difinesai/:path*', destination: '/ai/:path*', permanent: true },
    ]
  },
}

module.exports = nextConfig

