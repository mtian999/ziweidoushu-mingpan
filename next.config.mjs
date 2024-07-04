/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/en", // 将根URL重定向到 /en
      },
    ];
  },
};

export default nextConfig;
