import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import { siteConfig } from "@/config/site";
import { defaultLocale, getDictionary } from "@/lib/i18n";
import "@/styles/globals.css";
import "@/styles/loading.css";
import { Viewport } from "next";

const links = [
  {
    label: "Features",
    href: "#Features",
  },
  {
    label: "Pricing",
    href: "#Pricing",
  },
  // {
  //   label: "Wall of Love",
  //   href: "#WallOfLove",
  // },
  {
    label: "FAQ",
    href: "#FAQ",
  },
];

// export const fontSans = FontSans({
//   subsets: ["latin"],
//   variable: "--font-sans",
// });

export const metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: siteConfig.authors,
  creator: siteConfig.creator,
  icons: siteConfig.icons,
  metadataBase: siteConfig.metadataBase,
  openGraph: siteConfig.openGraph,
  twitter: siteConfig.twitter,
};
export const viewport: Viewport = {
  themeColor: siteConfig.themeColors,
};

export default async function Layout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  let langName = lang !== "" ? lang : defaultLocale;
  const dict = await getDictionary(langName);

  return (
    <>
      <Header locale={dict.Header} links={links} langName={langName} />
      <main className="flex flex-col items-center py-6">{children}</main>
      <Footer />
    </>
  );
}
