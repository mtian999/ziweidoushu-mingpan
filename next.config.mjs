import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/api/getZWDSImg", // 匹配特定的API路由
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          {
            key: "Access-Control-Allow-Origin",
            value: "https://fate.mastermao.com",
          }, // 或者指定具体的来源，如 'https://example.com'
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS" },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
  experimental: {
    serverComponentsExternalPackages: [
      "puppeteer-core",
      "@sparticuz/chromium-min",
    ],
  },
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
        },
      ],
    });
    return config;
  },
  env: {
    NEXT_BASE_API: process.env.NEXT_BASE_API,
  },
  logging: {
    fetches: {
      fullUrl: process.env.NODE_ENV === "development",
    },
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.artiversehub.ai",
        port: "",
        pathname: "/**",
      },
    ],
  },
  productionBrowserSourceMaps: false,
};

export default withNextIntl(nextConfig);
