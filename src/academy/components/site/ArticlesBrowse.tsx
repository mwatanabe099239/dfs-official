"use client";

import { useMemo, useState } from "react";
import { Search, Clock, ArrowRight, BookOpen } from "lucide-react";
import { ArticleCard, Tag, ViewAll } from "@academy/components/site/cards";
import { typography } from "@academy/lib/typography";
import { cn } from "@academy/lib/utils";
import {
  ARTICLE_FILTER_TABS,
  articleIcon,
  formatArticleReadTime,
  type AcademyArticle,
} from "@academy/lib/academy-articles";

type ArticlesBrowseProps = {
  articles: AcademyArticle[];
};

export function ArticlesBrowse({ articles }: ArticlesBrowseProps) {
  const [activeTab, setActiveTab] = useState<string>(ARTICLE_FILTER_TABS[0]);
  const [searchTerm, setSearchTerm] = useState("");

  const featured =
    articles.find((item) => item.featured) ?? articles[0] ?? null;

  const filtered = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return articles.filter((item) => {
      if (activeTab !== "すべて") {
        if (item.tag !== activeTab && !item.tags.includes(activeTab)) {
          return false;
        }
      }
      if (!q) return true;
      const haystack = [item.title, item.intro, item.tag, ...item.tags]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [articles, activeTab, searchTerm]);

  const beginner = useMemo(() => {
    const picks = articles.filter((item) => item.beginnerRecommended);
    return (picks.length ? picks : articles).slice(0, 4);
  }, [articles]);

  return (
    <>
      <div className="mt-6 relative w-full lg:w-2/3">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="記事を検索する（例：ウォレット、ガス代、セキュリティ）"
          className="w-full h-12 pl-11 pr-4 rounded-lg border border-border bg-card text-[15px] focus:outline-none focus:border-primary"
        />
      </div>

      <div className="mt-6 flex flex-wrap gap-2 w-full max-w-full">
        {ARTICLE_FILTER_TABS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setActiveTab(t)}
            className={cn(
              "grow h-10 rounded-lg border px-5 text-[13px] font-medium",
              activeTab === t
                ? "border-primary bg-primary-softer text-primary"
                : "border-border bg-card text-foreground hover:border-primary/40",
            )}
            style={{ minWidth: "120px" }}
          >
            {t}
          </button>
        ))}
      </div>

      {featured ? (
        <a
          href={`/academy/articles/${featured.id}`}
          className="mt-8 block bg-card border border-border rounded-2xl p-6 hover:border-primary/40 relative"
        >
          <div className="grid grid-cols-1 md:grid-cols-[180px_1fr_auto] gap-6 items-center">
            <div className="w-full h-[140px] bg-primary-softer rounded-xl flex items-center justify-center text-primary">
              <BookOpen className="w-20 h-20" strokeWidth={1.4} />
            </div>
            <div className="flex flex-col h-full justify-between">
              <div>
                <Tag>おすすめ記事</Tag>
              </div>
              <h3 className={cn("mt-3", typography.featuredTitle)}>{featured.title}</h3>
              <div className="mt-4 flex items-center gap-4">
                <Tag>{featured.tag}</Tag>
                <span className="inline-flex items-center gap-1.5 text-[13px] text-muted-foreground">
                  <Clock className="w-4 h-4" /> {formatArticleReadTime(featured.readTime)}
                </span>
              </div>
            </div>
            <ArrowRight className="w-6 h-6 text-primary absolute right-6 bottom-6" />
          </div>
        </a>
      ) : null}

      <div className="mt-10">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between mb-5">
          <h2 className="text-[26px] sm:text-[28px] lg:text-[30px] font-bold">すべての記事</h2>
          <span className="text-[13px] text-muted-foreground">全{filtered.length}件</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filtered.map((a) => {
            const Icon = articleIcon(a.iconKey);
            return (
              <ArticleCard
                key={a.id}
                icon={
                  <span className="inline-flex items-center justify-center">
                    <Icon className="w-12 h-12" strokeWidth={1} />
                  </span>
                }
                tag={a.tag}
                title={a.title}
                readTime={formatArticleReadTime(a.readTime)}
                to={`/academy/articles/${a.id}`}
              />
            );
          })}
        </div>
      </div>

      <div className="mt-14">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between mb-5">
          <h2 className="text-[26px] sm:text-[28px] lg:text-[30px] font-bold flex items-center gap-2">
            <span className="text-primary">★</span> 初心者におすすめ
          </h2>
          <ViewAll to="/academy/articles" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {beginner.map((a) => {
            const Icon = articleIcon(a.iconKey);
            return (
              <a
                key={a.id}
                href={`/academy/articles/${a.id}`}
                className="block bg-card border border-border rounded-xl p-5 hover:border-primary/40 relative"
              >
                <div className="flex items-center gap-4 sm:gap-5 w-full">
                  <span className="text-primary">
                    <Icon className="w-12 h-12" strokeWidth={1} />
                  </span>
                  <div>
                    <Tag>{a.tag}</Tag>
                    <h3 className={cn("mt-3", typography.cardTitleMd)}>{a.title}</h3>
                  </div>
                </div>
                <div className="mt-5 flex items-center justify-between text-[13px] text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" /> {formatArticleReadTime(a.readTime)}
                  </span>
                  <ArrowRight className="w-4 h-4 text-primary" />
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </>
  );
}
