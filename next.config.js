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
      // MetaFace guide moved under Academy
      { source: '/metaface-guide', destination: '/academy/guide/metaface', permanent: true },
      { source: '/metaface-guide/en', destination: '/academy/en/guide/metaface', permanent: true },
      { source: '/metaface-guide/ko', destination: '/academy/ko/guide/metaface', permanent: true },
      { source: '/metaface-guide/:path*', destination: '/academy/guide/metaface', permanent: true },
    ]
  },
}

module.exports = nextConfig

