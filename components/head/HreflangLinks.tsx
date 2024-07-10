import { BASE_URL } from "@/lib/env";
import { getHreflangLinks } from "@/lib/i18n";

export const HreflangLinks = ({
  langName,
  path = "",
}: {
  langName: string;
  path?: string;
}) => {
  const hreflangLinks = getHreflangLinks(langName);
  return (
    <>
      {/* 动态生成的 <link /> 标签 */}
      {hreflangLinks.map((lang) => (
        <link
          key={lang}
          rel="alternate"
          hrefLang={`${lang}`}
          href={`${BASE_URL}/${lang}${path}`}
        />
      ))}
    </>
  );
};
