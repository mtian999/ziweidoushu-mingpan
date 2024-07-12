"use client";

import { Iztrolabe } from "@/components/react-iztro";
import type { IztroInput } from "@/lib/hooks/iztro-hook/index.type";
import { defaultLocale, localesDict } from "@/lib/i18n";
import { setLanguage } from "iztro/lib/i18n";

export function IztroPreview({
  iztroData,
  lang,
}: {
  iztroData: IztroInput;
  lang: string;
}) {
  let langName = lang !== "" ? lang : defaultLocale;
  const iztroLang = localesDict[langName];
  iztroLang && setLanguage(iztroLang);

  return (
    <div
      className="iztrolabe-container"
      style={{
        width: "100%",
        height: "100vh",
        padding: "15px",
        backgroundColor: "#fdfdfd",
        boxShadow: "0 0 25px rgba(0,0,0,0.25)",
        borderRadius: "5px",
        boxSizing: "border-box",
      }}
    >
      {iztroData && (
        <Iztrolabe
          className="h-full"
          birthday={iztroData.birthday}
          birthTime={iztroData.birthTime}
          birthdayType="solar"
          gender={iztroData.gender}
          horoscopeDate={new Date()} // 新增参数，设置运限日期【可选，默认为当前时间】
          horoscopeHour={1} // 新增参数，设置流时时辰的索引【可选，默认会获取 horoscopeDate 时间】
          lang={iztroLang}
        />
      )}
    </div>
  );
}
