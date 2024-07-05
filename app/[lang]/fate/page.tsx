import { IztroForm } from "@/components/IztroForm";
import { defaultLocale, getDictionary } from "@/lib/i18n";
import { Metadata } from "next";

export async function generateMetadata({
  params: { lang },
}: {
  params: { lang: string };
}): Promise<Metadata> {
  let langName = lang !== "index" ? lang : defaultLocale;

  const dict = await getDictionary(langName);

  return dict.Metadata?.home || {};
}

export default async function Page({
  params: { lang },
}: {
  params: { lang: string };
}) {
  // const langName = (lang && lang[0]) || defaultLocale;
  let langName = lang !== "index" ? lang : defaultLocale;
  const dict = await getDictionary(langName);

  return <IztroForm lang={lang} />;
}
