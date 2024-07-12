import { defaultLocale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export default async function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return (
    <html
      style={{ margin: 0, padding: 0 }}
      lang={lang || defaultLocale}
      suppressHydrationWarning
    >
      <head />
      <body
        style={{ margin: 0, padding: 0 }}
        className={cn("min-h-screen bg-background font-sans antialiased")}
      >
        {children}
      </body>
    </html>
  );
}

