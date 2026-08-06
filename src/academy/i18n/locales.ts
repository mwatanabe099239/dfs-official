/**
 * Academy locales.
 *
 * Japanese is the master language and keeps the bare `/academy/...` URLs it has
 * always had — translations live under a prefix. That keeps every published
 * Japanese URL byte-identical, which the Q&A pipeline depends on.
 */

/** Set by middleware when it rewrites a prefixed URL onto the canonical route. */
export const ACADEMY_LOCALE_HEADER = "x-academy-locale";

export const ACADEMY_LOCALES = ["ja", "en", "ko"] as const;

export type AcademyLocale = (typeof ACADEMY_LOCALES)[number];

export const DEFAULT_ACADEMY_LOCALE: AcademyLocale = "ja";

/** Locales that carry a URL prefix (everything except the default). */
export const PREFIXED_ACADEMY_LOCALES = ACADEMY_LOCALES.filter(
  (locale) => locale !== DEFAULT_ACADEMY_LOCALE,
);

export const ACADEMY_LOCALE_LABELS: Record<AcademyLocale, string> = {
  ja: "日本語",
  en: "English",
  ko: "한국어",
};

export const ACADEMY_HTML_LANG: Record<AcademyLocale, string> = {
  ja: "ja-JP",
  en: "en-US",
  ko: "ko-KR",
};

export function isAcademyLocale(value: unknown): value is AcademyLocale {
  return (
    typeof value === "string" &&
    (ACADEMY_LOCALES as readonly string[]).includes(value)
  );
}

export function asAcademyLocale(value: unknown): AcademyLocale {
  return isAcademyLocale(value) ? value : DEFAULT_ACADEMY_LOCALE;
}

/**
 * Prefix an in-app Academy path with the active locale.
 * `ja` returns the path unchanged so master URLs never move.
 */
export function localePath(locale: AcademyLocale, path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (locale === DEFAULT_ACADEMY_LOCALE) return normalized;
  if (!normalized.startsWith("/academy")) return normalized;

  const rest = normalized.slice("/academy".length);
  return `/academy/${locale}${rest}`;
}

/** Strip a locale prefix back to its canonical Japanese path. */
export function stripLocaleFromPath(path: string): {
  locale: AcademyLocale;
  path: string;
} {
  for (const locale of PREFIXED_ACADEMY_LOCALES) {
    const prefix = `/academy/${locale}`;
    if (path === prefix) return { locale, path: "/academy" };
    if (path.startsWith(`${prefix}/`)) {
      return { locale, path: `/academy${path.slice(prefix.length)}` };
    }
  }
  return { locale: DEFAULT_ACADEMY_LOCALE, path };
}
