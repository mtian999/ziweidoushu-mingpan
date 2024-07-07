import { defaultLocale, locales } from "./lib/i18n";

import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isExit = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (isExit) return;

  request.nextUrl.pathname = `/${defaultLocale}/${request.nextUrl.pathname}`;
  return Response.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
