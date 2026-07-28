import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  LayoutGrid,
  GraduationCap,
  Clock,
  ThumbsUp,
  ThumbsDown,
  CalendarDays,
} from "lucide-react";
import { PageShell, Container, Breadcrumb } from "@academy/components/site/PageShell";
import { Tag } from "@academy/components/site/cards";
import { typography } from "@academy/lib/typography";
import { cn } from "@academy/lib/utils";
import {
  articleIcon,
  formatArticleDuration,
  formatArticleReadTime,
  getPublishedArticleById,
  getPublishedArticles,
} from "@academy/lib/academy-articles";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const article = await getPublishedArticleById(id);
  if (!article) return { title: "記事 — DFS Academy" };
  return {
    title: `${article.title} — DFS Academy`,
    description: article.intro,
  };
}

export default async function ArticleDetail({ params }: PageProps) {
  const { id } = await params;
  const article = await getPublishedArticleById(id);
  if (!article) notFound();

  const all = await getPublishedArticles();
  const related = all.filter((item) =>
    article.relatedArticleIds.includes(item.id),
  );
  const relatedFallback =
    related.length > 0
      ? related
      : all.filter((item) => item.id !== article.id).slice(0, 4);

  return (
    <PageShell>
      <section className="py-12">
        <Container>
          <Breadcrumb
            items={[
              { label: "ホーム", to: "/" },
              { label: "記事", to: "/academy/articles" },
              { label: article.tag },
            ]}
          />
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">
            <div>
              <h1 className={cn(typography.pageTitle, "text-foreground")}>
                {article.title}
              </h1>
              <p className={cn("mt-5", typography.pageLead)}>{article.intro}</p>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                {(article.tags.length ? article.tags : [article.tag]).map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
                <span className="inline-flex items-center gap-2 text-[15px] text-muted-foreground">
                  <Clock className="w-4 h-4 text-primary" />{" "}
                  {formatArticleDuration(article.readTime)}
                </span>
                {article.updatedAt ? (
                  <span className="inline-flex items-center gap-2 text-[15px] text-muted-foreground">
                    <CalendarDays className="w-4 h-4 text-primary" /> 最終更新{" "}
                    {article.updatedAt}
                  </span>
                ) : null}
              </div>

              {article.content?.trim() ? (
                <div
                  className="rich-html mt-6 space-y-4 text-foreground"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
              ) : null}

              <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                <span className="text-[15px] text-foreground/80">この記事は役に立ちましたか？</span>
                <button className="inline-flex items-center gap-2 px-4 h-9 rounded-md border border-border text-[15px] text-primary hover:bg-primary-softer">
                  <ThumbsUp className="w-4 h-4" /> 役に立った
                </button>
                <button className="inline-flex items-center gap-2 px-4 h-9 rounded-md border border-border text-[15px] text-muted-foreground hover:bg-secondary">
                  <ThumbsDown className="w-4 h-4" /> 役に立たなかった
                </button>
              </div>
            </div>

            <aside className="bg-card border border-border rounded-2xl p-6 space-y-5 h-fit">
              {[
                {
                  icon: <LayoutGrid className="w-5 h-5" />,
                  t: "カテゴリ",
                  v: article.tag,
                },
                {
                  icon: <GraduationCap className="w-5 h-5" />,
                  t: "レベル",
                  v: article.level,
                },
                {
                  icon: <Clock className="w-5 h-5" />,
                  t: "完了目安",
                  v: `${article.readTime}分`,
                },
              ].map((it, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-md bg-primary-softer text-primary flex items-center justify-center">
                    {it.icon}
                  </div>
                  <div>
                    <div className="text-[13px] text-muted-foreground">{it.t}</div>
                    <div className="text-[15px] font-semibold">{it.v}</div>
                  </div>
                </div>
              ))}
            </aside>
          </div>

          {relatedFallback.length > 0 ? (
            <div className="mt-12">
              <h2 className="text-[26px] sm:text-[28px] lg:text-[30px] font-bold mb-4">
                関連記事
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedFallback.slice(0, 4).map((a) => {
                  const Icon = articleIcon(a.iconKey);
                  return (
                    <a
                      key={a.id}
                      href={`/academy/articles/${a.id}`}
                      className="block bg-card border border-border rounded-xl px-4 pt-3 pb-2 hover:border-primary/40"
                    >
                      <div className="flex items-center gap-2 text-primary mb-2">
                        <Icon className="w-5 h-5" />
                        <span className={cn(typography.cardTitleMd, "text-foreground")}>
                          {a.title}
                        </span>
                      </div>
                      <Tag>{a.tag}</Tag>
                      <div className="mt-3 flex items-center justify-between text-[13px] text-muted-foreground">
                        <span className="inline-flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />{" "}
                          {formatArticleReadTime(a.readTime)}
                        </span>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          ) : null}
        </Container>
      </section>
    </PageShell>
  );
}
