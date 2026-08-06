"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";

import { createTranslator, type Translator } from "./dictionary";
import {
  DEFAULT_ACADEMY_LOCALE,
  localePath,
  type AcademyLocale,
} from "./locales";

const AcademyLocaleContext = createContext<AcademyLocale>(DEFAULT_ACADEMY_LOCALE);

/**
 * Client components can't read the locale header, so the server layout resolves
 * it once and hands it down through context.
 */
export function AcademyLocaleProvider({
  locale,
  children,
}: {
  locale: AcademyLocale;
  children: ReactNode;
}) {
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
