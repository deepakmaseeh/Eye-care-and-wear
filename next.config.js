/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com', 'images.unsplash.com'],
  },
  // Next.js 13 should automatically fall back to Babel if SWC fails
}

module.exports = nextConfig
