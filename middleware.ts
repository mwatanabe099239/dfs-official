import { NextResponse, type NextRequest } from "next/server";

import {
  ACADEMY_LOCALE_HEADER,
  DEFAULT_ACADEMY_LOCALE,
  stripLocaleFromPath,
} from "./src/academy/i18n/locales";

/**
 * Academy locale routing.
 *
 * Japanese is the master language and keeps the bare `/academy/...` URLs, so
 * every already-published Japanese URL is untouched. `/academy/en/...` and
 * `/academy/ko/...` are rewritten onto the same routes with the locale passed
 * along in a request header — the browser URL stays prefixed, but there is only
 * ever one copy of each page.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const { locale, path } = stripLocaleFromPath(pathname);

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(ACADEMY_LOCALE_HEADER, locale);

  if (locale === DEFAULT_ACADEMY_LOCALE) {
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  const url = request.nextUrl.clone();
  url.pathname = path;
  return NextResponse.rewrite(url, { request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/academy", "/academy/:path*"],
};
