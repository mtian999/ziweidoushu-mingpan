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
    description: "Future Support Features, Under Construction...",
    price: "$998",
    features: ["Destiny Chart Interpretation", "Under Construction..."],
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
    title: "收费",
    href: siteConfig.authors[0].twitter || "#",
    description: "紫微斗数命盘解盘服务",
    price: "定制",
    features: ["解盘服务"],
    buttonText: "开始",
    buttonColor: "primary",
    buttonVariant: "solid",
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
    title: "收費",
    href: siteConfig.authors[0].twitter || "#",
    description: "紫微斗數命盤解盤服務",
    price: "定製",
    features: ["解盤服務"],
    buttonText: "開始",
    buttonColor: "primary",
    buttonVariant: "solid",
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
    title: "料金",
    href: siteConfig.authors[0].twitter || "#",
    description: "紫微斗数命盤解盤サービス",
    price: "カスタム",
    features: ["解盤サービス"],
    buttonText: "開始",
    buttonColor: "primary",
    buttonVariant: "solid",
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
    title: "الرسوم",
    href: siteConfig.authors[0].twitter || "#",
    description: "خدمة تفسير لوحة ال紫薇垣",
    price: "مخصص",
    features: ["خدمة تفسير"],
    buttonText: "البدء",
    buttonColor: "primary",
    buttonVariant: "solid",
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
    title: "Cobros",
    href: siteConfig.authors[0].twitter || "#",
    description: "Servicio de interpretación de la placa de Zi Wei Dou Shu",
    price: "Personalizado",
    features: ["Servicio de interpretación"],
    buttonText: "Comenzar",
    buttonColor: "primary",
    buttonVariant: "solid",
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
    title: "Плата",
    href: siteConfig.authors[0].twitter || "#",
    description: "Услуга чтения Ziji Doushu",
    price: "Пользовательский",
    features: ["Услуга чтения"],
    buttonText: "Начать",
    buttonColor: "primary",
    buttonVariant: "solid",
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
