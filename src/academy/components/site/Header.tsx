"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, Search } from "lucide-react";
import { Logo } from "./Logo";
import { Sheet, SheetContent, SheetTitle } from "../ui/sheet";
import { useAcademyI18n } from "@academy/i18n/AcademyLocaleProvider";
import { stripLocaleFromPath } from "@academy/i18n/locales";

type NavItem = { label: string; to: string; hasMenu?: boolean };
const navItems: NavItem[] = [
  { label: "記事", to: "/academy/articles", hasMenu: true },
  { label: "コース", to: "/academy/courses" },
  { label: "Q&A", to: "/academy/qa" },
  { label: "パートナーシップ", to: "/academy/partnership", hasMenu: true },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const { t, path: localized } = useAcademyI18n();
  const rawPath = usePathname();
  // Compare against the canonical Japanese path so the active state survives
  // the `/academy/en` and `/academy/ko` prefixes.
  const path = stripLocaleFromPath(rawPath || "/").path;
  const isActive = (to: string) => (to === "/" ? path === "/" : path.startsWith(to));

  return (
    <header className="sticky top-0 z-40 bg-background border-b border-border/60 lg:border-b-0">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-6 h-14 lg:h-[72px] flex items-center justify-between gap-4 lg:gap-8">
        <Logo />
        <nav className="hidden lg:flex items-center gap-8 flex-1 justify-center">
          {navItems.map((it) => (
            <a
              key={it.to}
              href={localized(it.to)}
              className={`relative text-[15px] font-medium flex items-center gap-1 py-2 transition-colors ${
                isActive(it.to) ? "text-foreground" : "text-foreground/80 hover:text-foreground"
              }`}
            >
              {t(it.label)}
              {it.hasMenu && <ChevronDown className="w-4 h-4" />}
              {isActive(it.to) && (
                <span className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-primary rounded-full" />
              )}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            aria-label={t("検索")}
            className="p-2 text-foreground/80 hover:text-foreground"
          >
            <Search className="w-5 h-5" />
          </button>
          <button
            type="button"
            className="lg:hidden p-2 text-foreground/80 hover:text-foreground"
            aria-label={t("メニューを開く")}
            onClick={() => setOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="w-[min(100vw-2rem,320px)]">
          <SheetTitle className="text-left text-[18px] font-bold">{t("メニュー")}</SheetTitle>
          <nav className="mt-8 flex flex-col gap-1">
            {navItems.map((it) => (
              <a
                key={it.to}
                href={localized(it.to)}
                onClick={() => setOpen(false)}
                className={`flex items-center justify-between rounded-lg px-3 py-3 text-[15px] font-medium transition-colors ${
                  isActive(it.to)
                    ? "bg-primary-softer text-primary"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                {t(it.label)}
                {it.hasMenu && <ChevronDown className="w-4 h-4 opacity-60" />}
              </a>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
}
