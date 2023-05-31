/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["imagedelivery.net", "www.gravatar.com", "www.google.com"],
  },
};

module.exports = nextConfig;
