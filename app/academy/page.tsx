import type { Metadata } from "next";
import {
  GraduationCap,
  BookOpen,
  MessageCircle,
  Wallet,
  Trophy,
  ArrowRight,
} from "lucide-react";
import { PageShell, Container } from "@academy/components/site/PageShell";
import { QCard, ArticleCard, SectionHeader, ViewAll, Tag } from "@academy/components/site/cards";
import { StatsSection } from "@academy/components/site/StatsSection";
import { getPublishedFaqs } from "@academy/lib/academy-qa";
import {
  articleIcon,
  formatArticleReadTime,
  getBeginnerArticles,
} from "@academy/lib/academy-articles";
import { assetSrc } from "@academy/lib/asset";
import { typography } from "@academy/lib/typography";
import { cn } from "@academy/lib/utils";
import { articlePath, qaPath } from "@academy/lib/academy-slug";
import { getAcademyI18n } from "@academy/i18n/server";
const HomeHeroIcon = "/academy/home-hero-icon.png";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getAcademyI18n();
  return {
    title: t("DFS Academy — DFSChainを学び、Web3の未来を切り拓こう"),
    description: t(
      "初心者から上級者まで、Web3とDFSChainの知識をわかりやすく学べる学習プラットフォーム。",
    ),
  };
}

function featuredTeaser(text?: string, maxLength = 48): string {
  const cleaned = String(text || "")
    .replace(/\s+/g, " ")
    .trim();
  if (!cleaned) return "次世代Web3インフラを徹底解説";

  const sentence = cleaned.split(/[。！？\n]/)[0]?.trim() || cleaned;
  if (sentence.length <= maxLength) {
    return /[。！？]$/.test(sentence) ? sentence : `${sentence}`;
  }
  return `${sentence.slice(0, maxLength).trimEnd()}…`;
}

const categories = [
  { icon: <GraduationCap className="w-14 h-14" strokeWidth={1} />, label: "初心者向け" },
  { icon: <BookOpen className="w-14 h-14" strokeWidth={1} />, label: "基礎知識" },
  { icon: <MessageCircle className="w-14 h-14" strokeWidth={1} />, label: "Q&A" },
  { icon: <Wallet className="w-14 h-14" strokeWidth={1} />, label: "使い方" },
  { icon: <Trophy className="w-14 h-14" strokeWidth={1} />, label: "収入を得る" },
];

export default async function HomePage() {
  const { t, locale, path } = await getAcademyI18n();
  const [faqs, beginnerArticles] = await Promise.all([
    getPublishedFaqs(locale),
    getBeginnerArticles(4),
  ]);
  const featuredFaq = faqs[0];
  const homeFaqs = faqs.slice(0, 12);

  return (
    <PageShell>
      <section className="">
        <Container className="py-8 lg:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 lg:gap-10">
            <div>
              <h1 className={cn(typography.pageTitle, "text-foreground")}>
                <span className="text-primary">DFSChain</span>
                {t("を理解し、")}
                <br />
                {t("AIと共に新しい経済圏へ")}
              </h1>
              <p className={cn("mt-5", typography.pageLead)}>
                {t("DFSChainとAIの基礎から、アプリ活用まで段階的に学べます。")}
              </p>
              <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3">
                <a
                  href="#"
                  className="inline-flex items-center justify-center px-6 h-12 rounded-md bg-primary text-primary-foreground text-[15px] font-semibold hover:bg-primary/90"
                >
                  {t("今すぐ学ぶ")}
                </a>
                <a
                  href={path("/academy/qa")}
                  className="inline-flex items-center justify-center px-6 h-12 rounded-md border-2 border-primary text-primary text-[15px] font-semibold hover:bg-primary-softer"
                >
                  {t("Q&Aを見る")}
                </a>
              </div>
            </div>
            <aside className="bg-card border border-border rounded-2xl p-5 lg:p-6 relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
              <div className="w-full">
                <Tag>{t("注目のQ&A")}</Tag>
                <h3 className={cn("mt-3 text-foreground", typography.heroAsideTitle)}>
                  {featuredFaq?.question ?? "DFSChainとは？"}
                </h3>
                <p className={cn("mt-2 text-foreground", typography.bodyLg)}>
                  {featuredTeaser(featuredFaq?.intro || featuredFaq?.answer)}
                </p>
                <a
                  href={path(
                    featuredFaq
                      ? qaPath(featuredFaq.question, featuredFaq.id, featuredFaq.slug)
                      : "/academy/qa",
                  )}
                  className="mt-8 inline-flex items-center gap-1.5 text-[13px] font-medium text-primary hover:underline"
                >
                  {t("回答を見る")} <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
              <img
                src={assetSrc(HomeHeroIcon)}
                alt="Home Hero"
                className="h-auto w-[70px] ml-10 object-contain hidden sm:block"
              />
            </aside>
          </div>

          <div className="mt-8 lg:mt-10 grid grid-cols-2 md:grid-cols-5 gap-3 lg:gap-6">
            {categories.map((c) => (
              <a
                key={c.label}
                href="#"
                className="flex flex-col items-center justify-center gap-2 lg:gap-3 bg-card border border-border rounded-xl py-5 lg:py-8 hover:border-primary/40 transition-colors"
              >
                <span className="text-primary [&_svg]:w-10 [&_svg]:h-10 lg:[&_svg]:w-14 lg:[&_svg]:h-14">
                  {c.icon}
                </span>
                <span className={cn(typography.categoryLabel, "text-foreground text-center")}>
                  {t(c.label)}
                </span>
              </a>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-8 lg:py-10 bg-secondary/40">
        <Container>
          <SectionHeader
            title="DFSChain Q&A"
            action={<ViewAll to={path("/academy/qa")} label={t("すべて見る")} />}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {homeFaqs.map((q) => (
              <QCard
                key={q.id}
                title={q.question}
                tag={t(q.tag)}
                to={path(qaPath(q.question, q.id, q.slug))}
              />
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <a
              href={path("/academy/qa")}
              className="inline-flex items-center gap-2 px-6 h-11 rounded-md border border-primary text-primary text-[18px] hover:bg-primary-softer"
            >
              {t("すべてのQ&Aを見る")} <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </Container>
      </section>

      <section className="pb-10 bg-secondary/40">
        <Container>
          <SectionHeader
            title={t("初心者におすすめの記事")}
            action={<ViewAll to={path("/academy/articles")} label={t("すべて見る")} />}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {beginnerArticles.map((a) => {
              const Icon = articleIcon(a.iconKey);
              return (
                <ArticleCard
                  key={a.id}
                  icon={<Icon className="w-14 h-14" strokeWidth={1.5} />}
                  tag={t(a.tag)}
                  title={a.title}
                  readTime={formatArticleReadTime(a.readTime)}
                  to={path(articlePath(a.title, a.id, a.slug))}
                  isLanding={true}
                />
              );
            })}
          </div>
        </Container>
      </section>

      <StatsSection />
    </PageShell>
  );
}
