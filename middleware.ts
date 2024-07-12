import { type NextRequest } from "next/server";

import intlMiddleware from "./middlewares/intlMiddleware";

// 不需要intlMiddleware管理国际化的页面请求
const ignorePath = ["/zwds-preview"];

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (ignorePath.includes(pathname)) return;

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
