import { headers } from "next/headers";

import { createTranslator, type Translator } from "./dictionary";
import {
  ACADEMY_LOCALE_HEADER,
  asAcademyLocale,
  DEFAULT_ACADEMY_LOCALE,
  localePath,
  type AcademyLocale,
} from "./locales";

/**
 * Active locale for a server-rendered Academy page.
 *
 * Middleware rewrites `/academy/en/...` onto `/academy/...` and stashes the
 * locale in a request header, so pages keep their existing file paths and only
 * read the locale. Academy routes are already `force-dynamic`, so the extra
 * `headers()` call costs nothing in render strategy.
 */
export async function getAcademyLocale(): Promise<AcademyLocale> {
  try {
    const headerList = await headers();
    return asAcademyLocale(headerList.get(ACADEMY_LOCALE_HEADER));
  } catch {
    return DEFAULT_ACADEMY_LOCALE;
  }
}

export type AcademyI18n = {
  locale: AcademyLocale;
  t: Translator;
  /** Locale-aware in-app link builder. */
  path: (path: string) => string;
};

export async function getAcademyI18n(): Promise<AcademyI18n> {
  const locale = await getAcademyLocale();
  return {
    locale,
    t: createTranslator(locale),
    path: (path: string) => localePath(locale, path),
  };
}
