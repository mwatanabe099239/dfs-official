"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Check, ChevronDown, Globe } from "lucide-react";

import { useAcademyLocale } from "@academy/i18n/AcademyLocaleProvider";
import {
  ACADEMY_LOCALES,
  ACADEMY_LOCALE_LABELS,
  localePath,
  stripLocaleFromPath,
  type AcademyLocale,
} from "@academy/i18n/locales";
import { cn } from "@academy/lib/utils";

/**
 * Switches between the Japanese master site and its translations.
 *
 * The current path is reduced to its canonical Japanese form and then
 * re-prefixed, so switching language keeps you on the same page rather than
 * dumping you back at the Academy home.
 *
 * Locale is carried by a middleware rewrite header. Soft client navigations
 * often reuse the cached Japanese server tree, so language changes use a full
 * navigation to force middleware + Server Components to re-run.
 */
export function LanguageSwitcher({
  className,
  compact = false,
  menuPlacement = "above",
}: {
  className?: string;
  /** Tighter control for the top nav (icon + short label). */
  compact?: boolean;
  /** Footer opens upward; header opens downward. */
  menuPlacement?: "above" | "below";
}) {
  const locale = useAcademyLocale();
  const pathname = usePathname() || "/academy";
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const select = (next: AcademyLocale) => {
    setOpen(false);
    const { path } = stripLocaleFromPath(pathname);
    const href = localePath(next, path);
    if (href === pathname) return;
    window.location.assign(href);
  };

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ACADEMY_LOCALE_LABELS[locale]}
        className={cn(
          "inline-flex items-center justify-center gap-1.5 text-foreground transition-colors",
          compact
            ? "h-9 rounded-md px-2 text-[13px] font-medium text-foreground/80 hover:bg-muted hover:text-foreground sm:gap-2 sm:px-2.5"
            : "h-9 w-full justify-center gap-2 rounded-md border border-border px-3 text-[15px] hover:bg-secondary sm:w-auto sm:justify-start",
        )}
      >
        <Globe className="w-4 h-4" />
        <span className={cn(compact && "hidden sm:inline")}>
          {ACADEMY_LOCALE_LABELS[locale]}
        </span>
        <ChevronDown
          className={cn("w-3.5 h-3.5 transition-transform", open && "rotate-180")}
        />
      </button>

      {open ? (
        <ul
          role="listbox"
          className={cn(
            "absolute z-50 w-44 overflow-hidden rounded-lg border border-border bg-card py-1 shadow-lg",
            menuPlacement === "below"
              ? "left-auto right-0 top-full mt-2"
              : "bottom-full left-0 mb-2",
          )}
        >
          {ACADEMY_LOCALES.map((item) => (
            <li key={item}>
              <button
                type="button"
                role="option"
                aria-selected={item === locale}
                onClick={() => select(item)}
                className={cn(
                  "flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-[14px] transition-colors",
                  item === locale
                    ? "bg-primary-softer text-primary"
                    : "text-foreground hover:bg-muted",
                )}
              >
                {ACADEMY_LOCALE_LABELS[item]}
                {item === locale ? <Check className="w-4 h-4" /> : null}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
