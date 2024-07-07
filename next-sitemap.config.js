/** @type {import('next-sitemap').IConfig} */
const sitemap = require("./app/sitemap").default;

module.exports = {
  siteUrl: process.env.SITE_URL || "https://fate.maomaoyu.com",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  additionalPaths: async () => {
    return sitemap();
  },
};
