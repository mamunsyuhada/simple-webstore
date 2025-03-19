/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['fakestoreapi.com'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;