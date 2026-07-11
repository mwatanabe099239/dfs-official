"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { Globe2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { cn } from "../lib/utils";
import { isLocale, LOCALES, translations, type Locale } from "./translations";

type Ctx = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string) => string;
};

const I18nCtx = createContext<Ctx | null>(null);
const STORAGE_KEY = "difines.locale";

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Locale | null;
      if (saved && isLocale(saved)) setLocaleState(saved);
    } catch {}
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {}
  }, []);

  const t = useCallback((key: string) => translations[locale][key] ?? key, [locale]);

  const value = useMemo(() => ({ locale, setLocale, t }), [locale, setLocale, t]);
  return <I18nCtx.Provider value={value}>{children}</I18nCtx.Provider>;
}

export function useT() {
  const ctx = useContext(I18nCtx);
  if (!ctx) throw new Error("useT must be used within I18nProvider");
  return ctx;
}

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { locale, setLocale, t } = useT();

  return (
    <Select value={locale} onValueChange={(value) => setLocale(value as Locale)}>
      <SelectTrigger
        aria-label={t("Language")}
        className={cn(
          "h-9 w-[120px] gap-2 rounded-lg border-gradient bg-card px-2.5 text-[12px] font-semibold text-foreground shadow-none",
          "focus:ring-1 focus:ring-primary/30 focus:ring-offset-0",
          className,
        )}
      >
        <Globe2 className="h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-hidden />
        <SelectValue placeholder={t("Language")} />
      </SelectTrigger>
      <SelectContent align="end" className="min-w-[120px]">
        {LOCALES.map((l) => (
          <SelectItem key={l.code} value={l.code} className="text-[13px]">
            {l.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
