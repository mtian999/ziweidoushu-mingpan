import { siteConfig } from "@/config/site";
import { Tier, TiersEnum } from "@/types/pricing";

export const TIERS_EN: Array<Tier> = [
  {
    key: TiersEnum.Free,
    title: "Free",
    price: "Free",
    href: siteConfig.openSourceURL || "#",
    description:
      "We offer a completely free Zi Wei Dou Shu Bazi destiny chart generation service.",
    features: ["Free", "Generate Bazi Chart"],
    buttonText: "Get Started",
    buttonColor: "primary",
    buttonVariant: "solid",
  },
  {
    key: TiersEnum.Customize,
    title: "Customize",
    href: siteConfig.authors[0].twitter || "#",
    description: "Under Construction...",
    price: "$998",
    features: ["Under Construction..."],
    buttonText: "Stay Tuned",
    buttonColor: "default",
    buttonVariant: "flat",
  },
];

export const TIERS_ZH: Array<Tier> = [
  {
    key: TiersEnum.Free,
    title: "免费",
    price: "免费",
    href: siteConfig.openSourceURL || "#",
    description: "我们提供完全免费的紫微斗数命盘生成服务。",
    features: ["免费", "生成命盘"],
    buttonText: "开始",
    buttonColor: "primary",
    buttonVariant: "solid",
  },
  {
    key: TiersEnum.Customize,
    title: "定制",
    href: siteConfig.authors[0].twitter || "#",
    description: "施工中...",
    price: "$998",
    features: ["施工中..."],
    buttonText: "敬请期待",
    buttonColor: "default",
    buttonVariant: "flat",
  },
];

export const TIERS_TW: Array<Tier> = [
  {
    key: TiersEnum.Free,
    title: "免費",
    price: "免費",
    href: siteConfig.openSourceURL || "#",
    description: "我們提供完全免費的紫微斗數命盤生成服務。",
    features: ["免費", "生成命盤"],
    buttonText: "開始",
    buttonColor: "primary",
    buttonVariant: "solid",
  },
  {
    key: TiersEnum.Customize,
    title: "定制",
    href: siteConfig.authors[0].twitter || "#",
    description: "施工中...",
    price: "$998",
    features: ["施工中..."],
    buttonText: "敬請期待",
    buttonColor: "default",
    buttonVariant: "flat",
  },
];

export const TIERS_JA: Array<Tier> = [
  {
    key: TiersEnum.Free,
    title: "無料",
    price: "無料",
    href: siteConfig.openSourceURL || "#",
    description:
      "私たちは完全無料で紫微斗数の命盤生成サービスを提供しています。",
    features: ["無料", "命盤生成"],
    buttonText: "開始",
    buttonColor: "primary",
    buttonVariant: "solid",
  },
  {
    key: TiersEnum.Customize,
    title: "カスタム",
    href: siteConfig.authors[0].twitter || "#",
    description: "工事中...",
    price: "$998",
    features: ["工事中..."],
    buttonText: "お楽しみに",
    buttonColor: "default",
    buttonVariant: "flat",
  },
];

export const TIERS_AR: Array<Tier> = [
  {
    key: TiersEnum.Free,
    title: "مجاني",
    price: "مجاني",
    href: siteConfig.openSourceURL || "#",
    description:
      "نحن نقدم خدمة توليد الرسم البياني لـ Zi Wei Dou Shu Bazi مجانًا بالكامل.",
    features: ["مجاني", "توليد الرسم البياني لـ Bazi"],
    buttonText: "البدء",
    buttonColor: "primary",
    buttonVariant: "solid",
  },
  {
    key: TiersEnum.Customize,
    title: "تخصيص",
    href: siteConfig.authors[0].twitter || "#",
    description: "تحت الإنشاء...",
    price: "$998",
    features: ["تحت الإنشاء..."],
    buttonText: "ابق على تواصل",
    buttonColor: "default",
    buttonVariant: "flat",
  },
];

export const TIERS_ES: Array<Tier> = [
  {
    key: TiersEnum.Free,
    title: "Gratuito",
    price: "Gratuito",
    href: siteConfig.openSourceURL || "#",
    description:
      "Ofrecemos un servicio de generación de gráficos de Zi Wei Dou Shu Bazi completamente gratuito.",
    features: ["Gratuito", "Generar Gráfico Bazi"],
    buttonText: "Comenzar",
    buttonColor: "primary",
    buttonVariant: "solid",
  },
  {
    key: TiersEnum.Customize,
    title: "Personalizado",
    href: siteConfig.authors[0].twitter || "#",
    description: "En Construcción...",
    price: "$998",
    features: ["En Construcción..."],
    buttonText: "Mantente al Tanto",
    buttonColor: "default",
    buttonVariant: "flat",
  },
];

export const TIERS_RU: Array<Tier> = [
  {
    key: TiersEnum.Free,
    title: "Бесплатно",
    price: "Бесплатно",
    href: siteConfig.openSourceURL || "#",
    description:
      "Мы предлагаем полностью бесплатный сервис генерации диаграммы судьбы Zi Wei Dou Shu Bazi.",
    features: ["Бесплатно", "Создание диаграммы Bazi"],
    buttonText: "Начать",
    buttonColor: "primary",
    buttonVariant: "solid",
  },
  {
    key: TiersEnum.Customize,
    title: "Персонализировано",
    href: siteConfig.authors[0].twitter || "#",
    description: "В процессе строительства...",
    price: "$998",
    features: ["В процессе строительства..."],
    buttonText: "Подписаться на новости",
    buttonColor: "default",
    buttonVariant: "flat",
  },
];

interface TiersCollection {
  [key: `TIERS_${string}`]: Array<Tier>;
}

export const ALL_TIERS: TiersCollection = {
  TIERS_EN,
  TIERS_ZH,
  TIERS_TW,
  TIERS_JA,
  TIERS_AR,
  TIERS_ES,
  TIERS_RU,
};
