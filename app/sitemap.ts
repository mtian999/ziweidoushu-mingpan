import { locales } from "@/lib/i18n";
import { type MetadataRoute } from "next";

import { BASE_URL } from "@/lib/env";

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemapRoutes: MetadataRoute.Sitemap = [
    {
      url: "", // home
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "fate",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
  ];

  const sitemapData = sitemapRoutes.flatMap((route) =>
    locales.map((locale) => {
      const lang = locale === "" ? "" : `/${locale}`;
      const routeUrl = route.url === "" ? "" : `/${route.url}`;
      return {
        ...route,
        url: `${BASE_URL}${lang}${routeUrl}`,
      };
    })
  );
  return sitemapData;
}

