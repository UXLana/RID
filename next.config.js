const path = require('path');

const dsRoot = path.resolve(__dirname, 'node_modules/mtr-design-system');

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['mtr-design-system'],
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@/styles': path.resolve(dsRoot, 'styles'),
      '@/components': path.resolve(dsRoot, 'components'),
    };
    return config;
  },
};

module.exports = nextConfig;
