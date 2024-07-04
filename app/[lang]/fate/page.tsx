import { Iztrolabe } from "@/components/react-iztro";
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

  return (
    <>
      <div
        className="App"
        style={{
          width: 1024,
          margin: "50px auto",
          padding: "15px",
          backgroundColor: "#fdfdfd",
          boxShadow: "0 0 25px rgba(0,0,0,0.25)",
          borderRadius: "5px",
        }}
      >
        <Iztrolabe
          birthday="2003-10-12"
          birthTime={1}
          birthdayType="solar"
          gender="male"
          horoscopeDate={new Date()} // 新增参数，设置运限日期【可选，默认为当前时间】
          horoscopeHour={1} // 新增参数，设置流时时辰的索引【可选，默认会获取 horoscopeDate 时间】
          lang="zh-TW"
        />
      </div>
    </>
  );
}
