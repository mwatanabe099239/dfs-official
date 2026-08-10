"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  AlignLeft,
  Search,
  BookOpen,
  Monitor,
  Wallet,
  Fuel,
  Gift,
  ArrowLeftRight,
  Globe,
  Check,
  ChevronDown,
  Type,
  type LucideIcon,
} from "lucide-react";
import { QCard } from "@academy/components/site/cards";
import type { FaqEntry } from "@academy/data/qa-faqs";
import { cn } from "@academy/lib/utils";
import { qaPath } from "@academy/lib/academy-slug";
import { useAcademyI18n } from "@academy/i18n/AcademyLocaleProvider";

/**
 * `label` doubles as the canonical filter key. Tags are stored in Japanese on
 * every document regardless of the reader's language, so matching stays on
 * these keys and only the rendered text is translated.
 */
type FilterDef = {
  label: string;
  icon: LucideIcon | null;
};

const FILTERS: FilterDef[] = [
  { icon: null, label: "すべて" },
  { icon: BookOpen, label: "基礎知識" },
  { icon: Monitor, label: "使い方" },
  { icon: Wallet, label: "ウォレット" },
  { icon: Fuel, label: "アプリケーション" },
  { icon: Gift, label: "収入を得る" },
  { icon: ArrowLeftRight, label: "導入する" },
  { icon: Globe, label: "Web3" },
];

const PAGE_SIZE = 9;

type SearchField = "title" | "text";

const SEARCH_FIELD_OPTIONS: {
  value: SearchField;
  labelKey: string;
  hintKey: string;
  icon: LucideIcon;
}[] = [
  {
    value: "title",
    labelKey: "タイトル",
    hintKey: "質問タイトルで探す",
    icon: Type,
  },
  {
    value: "text",
    labelKey: "本文",
    hintKey: "回答の本文で探す",
    icon: AlignLeft,
  },
];

function matchesTag(faq: FaqEntry, tag: string): boolean {
  if (tag === "すべて") return true;
  if (faq.tag === tag) return true;
  return faq.tags.some((item) => item === tag);
}

function stripHtml(value: string): string {
  return value
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function matchesSearch(
  faq: FaqEntry,
  query: string,
  field: SearchField,
): boolean {
  if (!query) return true;
  if (field === "title") {
    return faq.question.toLowerCase().includes(query);
  }
  const haystack = [faq.intro, faq.answer, stripHtml(faq.content || "")]
    .join(" ")
    .toLowerCase();
  return haystack.includes(query);
}

export function QaBrowse({ faqs }: { faqs: FaqEntry[] }) {
  const { t, path } = useAcademyI18n();
  const [activeTag, setActiveTag] = useState("すべて");
  const [searchField, setSearchField] = useState<SearchField>("title");
  const [searchFieldOpen, setSearchFieldOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const searchFieldMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!searchFieldOpen) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!searchFieldMenuRef.current?.contains(event.target as Node)) {
        setSearchFieldOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSearchFieldOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [searchFieldOpen]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return faqs.filter(
      (faq) => matchesTag(faq, activeTag) && matchesSearch(faq, q, searchField),
    );
  }, [faqs, activeTag, search, searchField]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const activeSearchOption =
    SEARCH_FIELD_OPTIONS.find((option) => option.value === searchField) ??
    SEARCH_FIELD_OPTIONS[0];
  const ActiveSearchIcon = activeSearchOption.icon;

  const searchPlaceholder =
    searchField === "title"
      ? t("タイトルでQ&Aを検索（例：ウォレット、アプリケーション）")
      : t("本文でQ&Aを検索（例：ガス代、送金、ブリッジ）");

  return (
    <>
      <div className="mt-10 flex h-12 w-full items-stretch rounded-lg border border-border bg-card shadow-sm focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15 lg:w-2/3">
        <div ref={searchFieldMenuRef} className="relative shrink-0">
          <button
            type="button"
            onClick={() => setSearchFieldOpen((open) => !open)}
            aria-haspopup="listbox"
            aria-expanded={searchFieldOpen}
            aria-label={t("検索対象")}
            className={cn(
              "flex h-full items-center gap-2 rounded-l-[7px] border-r border-border px-3 text-[13px] font-medium transition-colors",
              searchFieldOpen
                ? "bg-primary-softer text-primary"
                : "bg-muted/50 text-foreground hover:bg-muted",
            )}
          >
            <ActiveSearchIcon className="h-4 w-4 shrink-0 opacity-80" />
            <span className="whitespace-nowrap">{t(activeSearchOption.labelKey)}</span>
            <ChevronDown
              className={cn(
                "h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform duration-200",
                searchFieldOpen && "rotate-180 text-primary",
              )}
            />
          </button>

          {searchFieldOpen ? (
            <ul
              role="listbox"
              className="absolute left-0 top-[calc(100%+6px)] z-50 w-[220px] overflow-hidden rounded-xl border border-border bg-card py-1.5 shadow-lg"
            >
              {SEARCH_FIELD_OPTIONS.map((option) => {
                const Icon = option.icon;
                const selected = option.value === searchField;
                return (
                  <li key={option.value}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={selected}
                      onClick={() => {
                        setSearchField(option.value);
                        setSearchFieldOpen(false);
                        setVisibleCount(PAGE_SIZE);
                      }}
                      className={cn(
                        "flex w-full items-start gap-3 px-3 py-2.5 text-left transition-colors",
                        selected
                          ? "bg-primary-softer text-primary"
                          : "text-foreground hover:bg-muted",
                      )}
                    >
                      <span
                        className={cn(
                          "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md",
                          selected
                            ? "bg-card text-primary shadow-sm"
                            : "bg-muted text-muted-foreground",
                        )}
                      >
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[14px] font-medium leading-tight">
                          {t(option.labelKey)}
                        </span>
                        <span
                          className={cn(
                            "mt-0.5 block text-[12px] leading-snug",
                            selected ? "text-primary/80" : "text-muted-foreground",
                          )}
                        >
                          {t(option.hintKey)}
                        </span>
                      </span>
                      {selected ? (
                        <Check className="mt-1 h-4 w-4 shrink-0" />
                      ) : (
                        <span className="mt-1 h-4 w-4 shrink-0" />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : null}
        </div>

        <div className="relative min-w-0 flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setVisibleCount(PAGE_SIZE);
            }}
            placeholder={searchPlaceholder}
            className="h-full w-full rounded-r-[7px] border-0 bg-transparent py-0 pl-10 pr-4 text-[15px] focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 mb-8 mt-8">
        {FILTERS.map((f) => {
          const Icon = f.icon;
          const isActive = activeTag === f.label;
          return (
            <button
              key={f.label}
              type="button"
              onClick={() => {
                setActiveTag(f.label);
                setVisibleCount(PAGE_SIZE);
              }}
              className={cn(
                "flex w-full flex-col items-center justify-center gap-2 px-2 h-[68px] rounded-lg border text-[13px] font-medium transition-colors",
                isActive
                  ? "border-primary bg-primary-softer text-primary"
                  : "border-border bg-card text-foreground hover:border-primary/40",
              )}
            >
              {Icon ? (
                <span className="text-primary">
                  <Icon className="w-5 h-5" />
                </span>
              ) : null}
              <span>{t(f.label)}</span>
            </button>
          );
        })}
      </div>

      {visible.length === 0 ? (
        <p className="py-12 text-center text-[15px] text-muted-foreground">
          {t("条件に一致するQ&Aが見つかりませんでした。")}
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {visible.map((q) => (
            <QCard
              key={q.id}
              title={q.question}
              tag={t(q.tag)}
              to={path(qaPath(q.question, q.id, q.slug))}
            />
          ))}
        </div>
      )}

      {hasMore ? (
        <div className="flex justify-center mt-8">
          <button
            type="button"
            onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
            className="inline-flex items-center gap-2 px-6 h-11 rounded-md text-primary border border-primary text-[18px] font-medium hover:bg-secondary"
          >
            {t("さらに表示する")} <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      ) : null}
    </>
  );
}
