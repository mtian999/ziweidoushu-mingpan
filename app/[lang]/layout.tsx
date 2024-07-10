import BaiDuAnalytics from "@/app/BaiDuAnalytics";
import GoogleAnalytics from "@/app/GoogleAnalytics";
import { TailwindIndicator } from "@/components/TailwindIndicator";
import { ThemeProvider } from "@/components/ThemeProvider";
import { siteConfig } from "@/config/site";
import { defaultLocale, getDictionary } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import "@/styles/loading.css";
import { Analytics } from "@vercel/analytics/react";
import { Viewport } from "next";

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

export default async function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  let langName = lang !== "" ? lang : defaultLocale;
  const dict = await getDictionary(langName);

  return (
    <html lang={lang || defaultLocale} suppressHydrationWarning>
      <head />
      <body className={cn("min-h-screen bg-background font-sans antialiased")}>
        <ThemeProvider
          attribute="class"
          defaultTheme={siteConfig.nextThemeColor}
          enableSystem
        >
          {children}
          <Analytics />
          <TailwindIndicator />
        </ThemeProvider>
        {process.env.NODE_ENV === "development" ? (
          <></>
        ) : (
          <>
            <GoogleAnalytics />
            <BaiDuAnalytics />
          </>
        )}
      </body>
    </html>
  );
}
