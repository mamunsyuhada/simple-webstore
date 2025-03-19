/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['fakestoreapi.com'],
  },
};

export default nextConfig;