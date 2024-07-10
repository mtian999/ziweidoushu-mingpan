import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import { defaultLocale, getDictionary } from "@/lib/i18n";
import "@/styles/globals.css";
import "@/styles/loading.css";

// export const fontSans = FontSans({
//   subsets: ["latin"],
//   variable: "--font-sans",
// });

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
      <Header locale={dict.Header} langName={langName} />
      <main className="flex flex-col items-center py-6">{children}</main>
      <Footer />
    </>
  );
}
