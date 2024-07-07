import { SiteConfig } from "@/types/siteConfig";

const OPEN_SOURCE_URL = "https://github.com/weijunext/landing-page-boilerplate";

const baseSiteConfig = {
  name: "紫微斗数 | 免费生成命盘",
  description:
    "The hottest divination methods of 2024: Chinese Astrology 2024, Destiny Studies 2024, Tarot 2024, Palmistry 2024. Here is Chinese Astrology 2024, free to generate a life chart, build a complex destiny chart system to reveal one's personality, destiny, and future trends.",
  url: "https://fate.maomaoyu.coffee",
  ogImage: "https://landingpage.weijunext.com/og.png",
  metadataBase: "/",
  keywords: [
    "different methods of divination",
    "Zi Wei Dou Shu",
    "Zi Wei Dou Shu 2024",
    "Zi Wei Dou Shu Free 2024",
  ],
  authors: [
    {
      name: "maomaoyu",
      url: "",
      twitter: "",
    },
  ],
  creator: "maomaoyu",
  openSourceURL: "",
  themeColors: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  nextThemeColor: "dark", // next-theme option: system | dark | light
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/logo.png",
  },
  headerLinks: [
    // { name: "repo", href: OPEN_SOURCE_URL, icon: BsGithub },
    // {
    //   name: "twitter",
    //   href: "https://twitter.com/weijunext",
    //   icon: BsTwitterX,
    // },
    // {
    //   name: "buyMeCoffee",
    //   href: "https://www.buymeacoffee.com/weijunext",
    //   icon: SiBuymeacoffee,
    // },
  ],
  footerLinks: [
    // { name: "email", href: "mailto:weijunext@gmail.com", icon: MdEmail },
    // {
    //   name: "twitter",
    //   href: "https://twitter.com/weijunext",
    //   icon: BsTwitterX,
    // },
    // { name: "github", href: "https://github.com/weijunext/", icon: BsGithub },
    // {
    //   name: "buyMeCoffee",
    //   href: "https://www.buymeacoffee.com/weijunext",
    //   icon: SiBuymeacoffee,
    // },
    // {
    //   name: "juejin",
    //   href: "https://juejin.cn/user/26044008768029",
    //   icon: SiJuejin,
    // },
    // {
    //   name: "weChat",
    //   href: "https://weijunext.com/make-a-friend",
    //   icon: BsWechat,
    // },
  ],
  footerProducts: [
    // { url: "https://weijunext.com/", name: "J实验室" },
    // { url: "https://smartexcel.cc/", name: "Smart Excel" },
    // {
    //   url: "https://landingpage.weijunext.com/",
    //   name: "Landing Page Boilerplate",
    // },
    // { url: "https://nextjs.weijunext.com/", name: "Next.js Practice" },
    // { url: "https://starter.weijunext.com/", name: "Next.js Starter" },
    // { url: "https://githubbio.com", name: "Github Bio Generator" },
    // {
    //   url: "https://github.com/weijunext/indie-hacker-tools",
    //   name: "Indie Hacker Tools",
    // },
  ],
};

export const siteConfig: SiteConfig = {
  ...baseSiteConfig,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseSiteConfig.url,
    title: baseSiteConfig.name,
    description: baseSiteConfig.description,
    siteName: baseSiteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: baseSiteConfig.name,
    description: baseSiteConfig.description,
    images: [`${baseSiteConfig.url}/og.png`],
    creator: baseSiteConfig.creator,
  },
};
