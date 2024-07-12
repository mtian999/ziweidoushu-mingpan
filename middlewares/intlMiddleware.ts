import createMiddleware from "next-intl/middleware";

import { localePrefix } from "@/app/navigation";

import { defaultLocale, locales } from "@/lib/i18n";

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix,
});

export default intlMiddleware;
