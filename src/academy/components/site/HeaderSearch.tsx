"use client";

import { useEffect, useRef, useState } from "react";
import { BookOpen, GraduationCap, MessageCircle, Search, X } from "lucide-react";

import { useAcademyI18n } from "@academy/i18n/AcademyLocaleProvider";
import type { AcademySearchHit } from "@academy/lib/academy-search";
import { cn } from "@academy/lib/utils";

const TYPE_META: Record<
  AcademySearchHit["type"],
  { label: string; icon: typeof Search }
> = {
  qa: { label: "Q&A", icon: MessageCircle },
  article: { label: "記事", icon: BookOpen },
  course: { label: "コース", icon: GraduationCap },
};

export function HeaderSearch() {
  const { t, path, locale } = useAcademyI18n();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<AcademySearchHit[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(() => inputRef.current?.focus(), 50);
    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onPointerDown = (event: MouseEvent) => {
      if (!panelRef.current?.contains(event.target as Node)) setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, [open]);

  useEffect(() => {
    const q = query.trim();
    if (!open || q.length < 1) {
      setResults([]);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    const timer = window.setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/academy/search?q=${encodeURIComponent(q)}&locale=${locale}`,
        );
        if (!res.ok) throw new Error("search failed");
        const data = (await res.json()) as { results?: AcademySearchHit[] };
        if (!cancelled) setResults(Array.isArray(data.results) ? data.results : []);
      } catch {
        if (!cancelled) setResults([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }, 250);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [query, locale, open]);

  const close = () => {
    setOpen(false);
    setQuery("");
    setResults([]);
  };

  return (
    <>
      <button
        type="button"
        aria-label={t("検索")}
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="p-2 text-foreground/80 hover:text-foreground"
      >
        <Search className="w-5 h-5" />
      </button>

      {open ? (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" aria-hidden />
          <div
            ref={panelRef}
            className="relative mx-auto mt-3 w-[min(100%-1.5rem,640px)] overflow-hidden rounded-xl border border-border bg-background shadow-xl sm:mt-6"
            role="dialog"
            aria-modal="true"
            aria-label={t("検索")}
          >
            <div className="flex items-center gap-2 border-b border-border px-3">
              <Search className="w-4 h-4 shrink-0 text-muted-foreground" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("記事、コース、Q&Aを検索")}
                autoComplete="off"
                className="h-12 w-full bg-transparent text-[15px] outline-none placeholder:text-muted-foreground"
              />
              <button
                type="button"
                onClick={close}
                aria-label={t("閉じる")}
                className="p-2 text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="max-h-[min(70vh,480px)] overflow-y-auto p-2">
              {query.trim().length < 1 ? (
                <p className="px-3 py-6 text-center text-[14px] text-muted-foreground">
                  {t("キーワードを入力して検索してください")}
                </p>
              ) : loading ? (
                <p className="px-3 py-6 text-center text-[14px] text-muted-foreground">
                  {t("検索中…")}
                </p>
              ) : results.length === 0 ? (
                <p className="px-3 py-6 text-center text-[14px] text-muted-foreground">
                  {t("条件に一致する結果が見つかりませんでした。")}
                </p>
              ) : (
                <ul className="space-y-1">
                  {results.map((hit) => {
                    const meta = TYPE_META[hit.type];
                    const Icon = meta.icon;
                    return (
                      <li key={`${hit.type}-${hit.id}`}>
                        <a
                          href={path(hit.href)}
                          onClick={close}
                          className={cn(
                            "flex gap-3 rounded-lg px-3 py-3 transition-colors",
                            "hover:bg-muted",
                          )}
                        >
                          <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary-softer text-primary">
                            <Icon className="w-4 h-4" />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="flex flex-wrap items-center gap-2">
                              <span className="text-[11px] font-medium uppercase tracking-wide text-primary">
                                {t(meta.label)}
                              </span>
                              {hit.tag ? (
                                <span className="text-[11px] text-muted-foreground">
                                  {t(hit.tag)}
                                </span>
                              ) : null}
                            </span>
                            <span className="mt-0.5 block text-[15px] font-medium text-foreground">
                              {hit.title}
                            </span>
                            {hit.snippet ? (
                              <span className="mt-1 block text-[13px] leading-snug text-muted-foreground line-clamp-2">
                                {hit.snippet}
                              </span>
                            ) : null}
                          </span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
