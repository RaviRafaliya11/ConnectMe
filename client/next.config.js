/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    NEXT_PUBLIC_ZEGO_APP_ID: 440708721,
    NEXT_PUBLIC_ZEGO_SERVER_ID: "9191108497fea7b5121c42e5fd5cac94",
  },
  images: {
    domains: ["localhost"],
  },
};

module.exports = nextConfig;
