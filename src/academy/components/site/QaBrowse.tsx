"use client";

import { useMemo, useState } from "react";
import {
  Search,
  BookOpen,
  Monitor,
  Wallet,
  Fuel,
  Shield,
  ArrowLeftRight,
  Gift,
  ChevronDown,
  type LucideIcon,
} from "lucide-react";
import { QCard } from "@academy/components/site/cards";
import type { FaqEntry } from "@academy/data/qa-faqs";
import { cn } from "@academy/lib/utils";
import { qaPath } from "@academy/lib/academy-slug";

type FilterDef = {
  label: string;
  icon: LucideIcon | null;
};

const FILTERS: FilterDef[] = [
  { icon: null, label: "すべて" },
  { icon: BookOpen, label: "基礎知識" },
  { icon: Monitor, label: "使い方" },
  { icon: Wallet, label: "ウォレット" },
  { icon: Fuel, label: "ガス代" },
  { icon: Shield, label: "セキュリティ" },
  { icon: ArrowLeftRight, label: "ブリッジ" },
  { icon: Gift, label: "Learn & Earn" },
];

const PAGE_SIZE = 9;

function matchesTag(faq: FaqEntry, tag: string): boolean {
  if (tag === "すべて") return true;
  if (faq.tag === tag) return true;
  return faq.tags.some((item) => item === tag);
}

function matchesSearch(faq: FaqEntry, query: string): boolean {
  if (!query) return true;
  const haystack = [
    faq.question,
    faq.tag,
    ...faq.tags,
    faq.intro,
    faq.answer,
  ]
    .join(" ")
    .toLowerCase();
  return haystack.includes(query);
}

export function QaBrowse({ faqs }: { faqs: FaqEntry[] }) {
  const [activeTag, setActiveTag] = useState("すべて");
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return faqs.filter(
      (faq) => matchesTag(faq, activeTag) && matchesSearch(faq, q),
    );
  }, [faqs, activeTag, search]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <>
      <div className="mt-10 relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setVisibleCount(PAGE_SIZE);
          }}
          placeholder="Q&Aを検索する（例：ウォレット、送金、ガス代）"
          className="w-full lg:w-2/3 h-12 pl-11 pr-4 rounded-lg border border-border bg-card text-[15px] focus:outline-none focus:border-primary"
        />
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
              <span>{f.label}</span>
            </button>
          );
        })}
      </div>

      {visible.length === 0 ? (
        <p className="py-12 text-center text-[15px] text-muted-foreground">
          条件に一致するQ&Aが見つかりませんでした。
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {visible.map((q) => (
            <QCard key={q.id} title={q.question} tag={q.tag} to={qaPath(q.question, q.id, q.slug)} />
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
            さらに表示する <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      ) : null}
    </>
  );
}
