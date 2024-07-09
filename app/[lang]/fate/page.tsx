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

  return dict.Metadata?.fate || {};
}

export default async function Page({
  params: { lang },
}: {
  params: { lang: string };
}) {
  // const langName = (lang && lang[0]) || defaultLocale;
  let langName = lang !== "index" ? lang : defaultLocale;
  const dict = await getDictionary(langName);

  return (
    <>
      <h1 className="tracking-tight text-slate-700 dark:text-slate-400">
        {dict.Fate.h1}
      </h1>
      <IztroForm locale={dict.Fate} lang={lang} />
    </>
  );
}
