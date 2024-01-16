/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // remotePatterns: ['oaidalleapiprodscus.blob.core.windows.net'],
    remotePatterns: [
      {
        protocol: 'https',
        // hostname: 'www.thecocktaildb.com',
        port: '',
        pathname: '/images/**',
        hostname: '**', // to access all the images
        pathname: '**',
      },
    ],
  },
};

module.exports = nextConfig;
