import { IztroPreview } from "@/components/IztroPreview";
import { defaultLocale, localesDict } from "@/lib/i18n";
import type { GenderName } from "iztro/lib/i18n";
import { setLanguage } from "iztro/lib/i18n";
import "./page.css";

export default async function Page({
  searchParams: { birthday, birthTime, gender, lang },
}: {
  searchParams: {
    birthday: string;
    birthTime: string;
    gender: GenderName;
    lang: string;
  };
}) {
  let langName = lang !== "" ? lang : defaultLocale;

  const iztroLang = localesDict[langName];
  iztroLang && setLanguage(iztroLang);
  const birthTimeNum: number = Number(birthTime);

  return (
    <IztroPreview
      className="iztrolabe-page"
      iztroData={{
        birthday,
        birthTime: birthTimeNum,
        gender,
        birthdayType: "solar",
      }}
      lang={lang}
    />
  );
}
