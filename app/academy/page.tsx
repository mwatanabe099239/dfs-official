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
const HomeHeroIcon = "/academy/home-hero-icon.png";

export const metadata: Metadata = {
  title: "DFS Academy — DFSChainを学び、Web3の未来を切り拓こう",
  description:
    "初心者から上級者まで、Web3とDFSChainの知識をわかりやすく学べる学習プラットフォーム。",
};

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
  { icon: <Trophy className="w-14 h-14" strokeWidth={1} />, label: "Learn & Earn" },
];

export default async function HomePage() {
  const [faqs, beginnerArticles] = await Promise.all([
    getPublishedFaqs(),
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
                <span className="text-primary">DFSChain</span>を理解し、
                <br />
                AIと共に新しい経済圏へ
              </h1>
              <p className={cn("mt-5", typography.pageLead)}>
                DFSChainとAIの基礎から、アプリ活用まで段階的に学べます。
              </p>
              <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3">
                <a
                  href="#"
                  className="inline-flex items-center justify-center px-6 h-12 rounded-md bg-primary text-primary-foreground text-[15px] font-semibold hover:bg-primary/90"
                >
                  今すぐ学ぶ
                </a>
                <a
                  href="/academy/qa"
                  className="inline-flex items-center justify-center px-6 h-12 rounded-md border-2 border-primary text-primary text-[15px] font-semibold hover:bg-primary-softer"
                >
                  Q&Aを見る
                </a>
              </div>
            </div>
            <aside className="bg-card border border-border rounded-2xl p-5 lg:p-6 relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
              <div className="w-full">
                <Tag>注目のQ&A</Tag>
                <h3 className={cn("mt-3 text-foreground", typography.heroAsideTitle)}>
                  {featuredFaq?.question ?? "DFSChainとは？"}
                </h3>
                <p className={cn("mt-2 text-foreground", typography.bodyLg)}>
                  {featuredTeaser(featuredFaq?.intro || featuredFaq?.answer)}
                </p>
                <a
                  href={featuredFaq ? `/academy/qa/${featuredFaq.id}` : "/academy/qa"}
                  className="mt-8 inline-flex items-center gap-1.5 text-[13px] font-medium text-primary hover:underline"
                >
                  回答を見る <ArrowRight className="w-3.5 h-3.5" />
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
                  {c.label}
                </span>
              </a>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-8 lg:py-10 bg-secondary/40">
        <Container>
          <SectionHeader title="DFSChain Q&A" action={<ViewAll to="/academy/qa" />} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {homeFaqs.map((q) => (
              <QCard key={q.id} title={q.question} tag={q.tag} to={`/academy/qa/${q.id}`} />
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <a
              href="/academy/qa"
              className="inline-flex items-center gap-2 px-6 h-11 rounded-md border border-primary text-primary text-[18px] hover:bg-primary-softer"
            >
              すべてのQ&Aを見る <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </Container>
      </section>

      <section className="pb-10 bg-secondary/40">
        <Container>
          <SectionHeader title="初心者におすすめの記事" action={<ViewAll to="/academy/articles" />} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {beginnerArticles.map((a) => {
              const Icon = articleIcon(a.iconKey);
              return (
                <ArticleCard
                  key={a.id}
                  icon={<Icon className="w-14 h-14" strokeWidth={1.5} />}
                  tag={a.tag}
                  title={a.title}
                  readTime={formatArticleReadTime(a.readTime)}
                  to={`/academy/articles/${a.id}`}
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
