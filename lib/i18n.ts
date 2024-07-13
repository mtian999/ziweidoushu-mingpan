import { match } from "@formatjs/intl-localematcher";
import dayjs from "dayjs";
import Negotiator from "negotiator";

export const locales = [
  "en",
  "zh",
  "tw",
  "ja",
  "ar",
  "es",
  "ru",
  "de",
  "fr",
  "ko",
  "nl",
  "pl",
  "pt",
  "vi",
  "se",
  "ph",
];

export function getHreflangLinks(ignoreLangName: string): string[] {
  const hreflangLinks: string[] = [];
  locales.forEach((lang) => {
    if (lang) {
      if (lang === ignoreLangName) {
        return;
      }
      if (lang === "zh") {
        hreflangLinks.push("zh-Hans");
      } else if (lang === "tw") {
        hreflangLinks.push("zh-Hant");
      } else {
        hreflangLinks.push(lang);
      }
    }
  });
  return hreflangLinks;
}
export const localeNames: any = {
  en: "🇺🇸 English",
  zh: "🇨🇳 简体中文",
  tw: "🇨🇳 繁体中文",
  ja: "🇯🇵 日本語",
  ar: "🇸🇦 العربية",
  es: "🇪🇸 Español",
  ru: "🇷🇺 Русский",
  de: "🇩🇪 Deutsch", //德语
  fr: "🇫🇷 Français", //法语
  ko: "🇰🇵|🇰🇷 한국어", //韩语
  nl: "🇳🇱 Nederlands", //荷兰语
  pl: "🇵🇱 Polski", //波兰语
  pt: "🇵🇹 Português", //葡萄牙语
  vi: "🇻🇳 Tiếng Việt", //越南语
  se: "🇸🇪 Svenska",
  ph: "🇵🇭 Filipino",
};
export type LocalesDict = {
  [key: string]: string; // 使用索引签名来表示键值对
};
// 提供给紫微斗数的国际化配置
export const localesDict: LocalesDict = {
  en: "en-US",
  zh: "zh-CN",
  tw: "zh-TW",
  ja: "ja-JP",
  ar: "en-US",
  es: "en-US",
  ru: "en-US",
  de: "en-US",
  fr: "en-US",
  ko: "ko-KR",
  nl: "en-US",
  pl: "en-US",
  pt: "en-US",
  vi: "vi-VN",
  se: "en-US",
  ph: "en-US",
};
export const defaultLocale = "en";

// If you wish to automatically redirect users to a URL that matches their browser's language setting,
// you can use the `getLocale` to get the browser's language.
export function getLocale(headers: any): string {
  let languages = new Negotiator({ headers }).languages();

  return match(languages, locales, defaultLocale);
}

const dictionaries: any = {
  en: () => import("@/locales/en.json").then((module) => module.default),
  zh: () => import("@/locales/zh.json").then((module) => module.default),
  tw: () => import("@/locales/tw.json").then((module) => module.default),
  ja: () => import("@/locales/ja.json").then((module) => module.default),
  ar: () => import("@/locales/ar.json").then((module) => module.default),
  es: () => import("@/locales/es.json").then((module) => module.default),
  ru: () => import("@/locales/ru.json").then((module) => module.default),
  de: () => import("@/locales/de.json").then((module) => module.default),
  fr: () => import("@/locales/fr.json").then((module) => module.default),
  ko: () => import("@/locales/ko.json").then((module) => module.default),
  nl: () => import("@/locales/nl.json").then((module) => module.default),
  pl: () => import("@/locales/pl.json").then((module) => module.default),
  pt: () => import("@/locales/pt.json").then((module) => module.default),
  vi: () => import("@/locales/vi.json").then((module) => module.default),
  se: () => import("@/locales/se.json").then((module) => module.default),
  ph: () => import("@/locales/ph.json").then((module) => module.default),
};

export const getDictionary = async (locale: string) => {
  if (["zh-CN", "zh-TW", "zh-HK"].includes(locale)) {
    locale = "zh";
  }

  if (!Object.keys(dictionaries).includes(locale)) {
    locale = "en";
  }

  return dictionaries[locale]();
};

const DataPickerLocalesDict = [
  {
    key: "en",
    antd: "en_US",
    dayjs: "en",
  },
  {
    key: "zh",
    antd: "zh_CN",
    dayjs: "zh",
  },
  {
    key: "tw",
    antd: "zh_TW",
    dayjs: "zh-tw",
  },
  {
    key: "ja",
    antd: "ja_JP",
    dayjs: "ja",
  },
  {
    key: "ar",
    antd: "ar_EG",
    dayjs: "ar",
  },
  {
    key: "es",
    antd: "es_ES",
    dayjs: "es",
  },
  {
    key: "ru",
    antd: "ru_RU",
    dayjs: "ru",
  },
  {
    key: "de",
    antd: "de_DE",
    dayjs: "de",
  },
  {
    key: "fr",
    antd: "fr_FR",
    dayjs: "fr",
  },
  {
    key: "ko",
    antd: "ko_KR",
    dayjs: "ko",
  },
  {
    key: "nl",
    antd: "nl_NL",
    dayjs: "nl",
  },
  {
    key: "pl",
    antd: "pl_PL",
    dayjs: "pl",
  },
  {
    key: "pt",
    antd: "pt_PT",
    dayjs: "pt",
  },
  {
    key: "vi",
    antd: "vi_VN",
    dayjs: "vi",
  },
  {
    key: "se",
    antd: "sv_SE",
    dayjs: "se",
  },
  {
    key: "ph",
    antd: "en_US",
    dayjs: "tl-ph",
  },
];
export const getDataPickerLocal = (locale: string) => {
  const targetLocal = DataPickerLocalesDict.find((item) => {
    return item.key === locale;
  }) || {
    key: "en",
    antd: "en_US",
    dayjs: "en",
  };
  return Promise.all([
    import(`antd/locale/${targetLocal.antd}`).then((module) => module.default),
    import(`dayjs/locale/${targetLocal.dayjs}`).then(() => {
      dayjs.locale(targetLocal.dayjs);
    }),
  ]);
};
