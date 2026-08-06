"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { usePathname } from "next/navigation";

import { createTranslator, type Translator } from "./dictionary";
import {
  DEFAULT_ACADEMY_LOCALE,
  localePath,
  stripLocaleFromPath,
  type AcademyLocale,
} from "./locales";

const AcademyLocaleContext = createContext<AcademyLocale>(DEFAULT_ACADEMY_LOCALE);

/**
 * Locale for client chrome.
 *
 * The server layout seeds the initial value from the middleware header. After
 * that, the URL prefix is the source of truth so a language switch (or a
 * shared link to `/academy/en/...`) updates the UI even when a soft navigation
 * reuses a cached server tree.
 */
export function AcademyLocaleProvider({
  locale: serverLocale,
  children,
}: {
  locale: AcademyLocale;
  children: ReactNode;
}) {
  const pathname = usePathname() || "/academy";
  const locale = stripLocaleFromPath(pathname).locale || serverLocale;

  return (
    <AcademyLocaleContext.Provider value={locale}>
      {children}
    </AcademyLocaleContext.Provider>
  );
}

export function useAcademyLocale(): AcademyLocale {
  return useContext(AcademyLocaleContext);
}

export function useAcademyI18n(): {
  locale: AcademyLocale;
  t: Translator;
  path: (path: string) => string;
} {
  const locale = useAcademyLocale();
  return useMemo(
    () => ({
      locale,
      t: createTranslator(locale),
      path: (path: string) => localePath(locale, path),
    }),
    [locale],
  );
}
