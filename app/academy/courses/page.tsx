import type { Metadata } from "next";
import {
  GraduationCap,
  BookOpen,
  TrendingUp,
  Rocket,
  Clock,
  BarChart3,
  ChevronDown,
  BookOpenCheck,
  MonitorPlay,
  HardHat,
  Award,
  Network,
  ArrowRight,
  HelpCircle,
  ChevronRight,
} from "lucide-react";
import { PageShell, Container, Breadcrumb } from "@academy/components/site/PageShell";
import { Tag } from "@academy/components/site/cards";
import { StatsSection } from "@academy/components/site/StatsSection";
import { typography } from "@academy/lib/typography";
import { cn } from "@academy/lib/utils";
import { courseIcon, formatApproxMinutes, getPublishedCourses } from "@academy/lib/academy-courses";
import { coursePath } from "@academy/lib/academy-slug";

const HeroImg = "/academy/course-hero.png";

export const metadata: Metadata = {
  title: "DFSChain コース一覧 — DFS Academy",
  description: "初心者から上級者まで、体系的に学べるコースをご用意しています。",
};

const levels = [
  {
    icon: <GraduationCap className="w-14 h-14" strokeWidth={1} />,
    t: "初心者向け",
    d: "Web3やDFSChainを初めて学ぶ方におすすめ",
  },
  {
    icon: <BookOpen className="w-14 h-14" strokeWidth={1} />,
    t: "基礎知識",
    d: "DFSChainの基礎をしっかり学びたい方向け",
  },
  {
    icon: <TrendingUp className="w-14 h-14" strokeWidth={1} />,
    t: "中級者向け",
    d: "より深い理解と実践を目指す方向け",
  },
  {
    icon: <Rocket className="w-14 h-14" strokeWidth={1} />,
    t: "上級者向け",
    d: "応用・開発・ビジネス活用を学びたい方向け",
  },
];

export default async function CoursesPage() {
  const courses = await getPublishedCourses();

  return (
    <PageShell>
      <section className="py-12">
        <Container>
          <Breadcrumb items={[{ label: "ホーム", to: "/" }, { label: "コース" }]} />
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 items-center mb-12">
            <div>
              <h1 className={cn(typography.pageTitle, "text-foreground")}>
                <span className="text-primary">DFSChain</span> のコース一覧
              </h1>
              <p className={cn("mt-5", typography.pageLead)}>
                初心者から上級者まで、体系的に学べるコースをご用意しています。
                <br />
                あなたのレベルや目的に合わせて、最適なコースを見つけましょう。
              </p>
            </div>
            <div className="flex justify-end text-primary">
              <img
                src={HeroImg}
                alt="DFSChain"
                className="md:w-full md:h-full w-3/4 h-auto object-contain mx-auto"
              />
            </div>
          </div>

          <h2 className="text-[26px] sm:text-[28px] lg:text-[30px] font-bold mb-5">
            学習レベルから選ぶ
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {levels.map((l) => (
              <div
                key={l.t}
                className="bg-card border border-border rounded-2xl p-4 sm:p-6 text-center hover:border-primary/40 transition-colors"
              >
                <div className="text-primary flex justify-center mb-2">{l.icon}</div>
                <h3 className="text-[18px] font-bold text-primary">{l.t}</h3>
                <p className="mt-2 text-[13px] text-muted-foreground leading-relaxed mx-auto w-full lg:w-2/3">
                  {l.d}
                </p>
                <a
                  href="#all-courses"
                  className="mt-3 inline-flex items-center gap-1.5 text-[15px] font-medium text-primary hover:underline"
                >
                  コースを見る <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
            <div id="all-courses">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between mb-5">
                <h2 className="text-[26px] sm:text-[28px] lg:text-[30px] font-bold">
                  すべてのコース
                </h2>
                <button className="inline-flex items-center gap-2 px-4 h-10 rounded-md border border-border text-[15px] bg-card">
                  おすすめ順 <ChevronDown className="w-4 h-4" />
                </button>
              </div>
              <ul className="space-y-1">
                {courses.map((c) => {
                  const Icon = courseIcon(c.iconKey);
                  return (
                    <li key={c.id}>
                      <a
                        href={coursePath(c.title, c.id, c.slug)}
                        className="flex flex-col gap-4 lg:grid lg:grid-cols-[120px_1fr_160px] lg:items-center bg-card border border-border rounded-xl p-4 hover:border-primary/40"
                      >
                        <div className="w-full lg:w-[120px] h-[100px] lg:h-full rounded-lg bg-primary-softer text-primary flex items-center justify-center shrink-0">
                          <Icon className="w-14 h-14" strokeWidth={1} />
                        </div>
                        <div className="flex items-start gap-2 lg:border-r lg:border-border lg:pr-4 min-w-0">
                          <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[12px] font-bold shrink-0">
                            {c.id}
                          </span>
                          <div>
                            <h3 className="text-[18px] mb-3">{c.title}</h3>
                            <div className="flex items-center gap-2 mb-2 flex-wrap">
                              {c.tags.map((tg) => (
                                <Tag key={tg}>{tg}</Tag>
                              ))}
                            </div>
                            <p className="text-[15px]">{c.description}</p>
                          </div>
                        </div>
                        <div className="text-left lg:text-right flex items-center justify-between w-full gap-4">
                          <div className="flex sm:flex-col flex-row items-start gap-4">
                            <div className="inline-flex items-center gap-2 text-[15px] text-muted-foreground">
                              <Clock className="w-4 h-4 shrink-0" />{" "}
                              {formatApproxMinutes(c.durationMinutes)}
                            </div>
                            <div className="inline-flex items-center gap-2 text-[15px] text-muted-foreground">
                              <BarChart3 className="w-4 h-4 text-primary shrink-0" />{" "}
                              {c.level}
                            </div>
                          </div>
                          <ChevronRight className="w-5 h-5" />
                        </div>
                      </a>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-6">
                <a
                  href="/academy/courses"
                  className="block text-center py-3 rounded-lg border-2 border-primary text-primary font-semibold text-[15px] hover:bg-primary-softer"
                >
                  すべてのコースを見る →
                </a>
              </div>
            </div>

            <aside className="space-y-6">
              <div className="bg-card border border-border rounded-2xl p-4">
                <h3 className="text-[18px] font-bold mb-4">コースの特徴</h3>
                <ul className="space-y-3 text-[15px]">
                  {(
                    [
                      { icon: BookOpenCheck, text: "体系的に学べるカリキュラム" },
                      { icon: MonitorPlay, text: "動画と図解でわかりやすい解説" },
                      { icon: HardHat, text: "実践で身につくハンズオン形式" },
                      { icon: Award, text: "修了証（NFT）を獲得できる" },
                    ] as const
                  ).map(({ icon: Icon, text }) => (
                    <li key={text} className="flex items-center gap-2.5">
                      <span className="w-7 h-7 rounded-md bg-primary-softer text-primary flex items-center justify-center">
                        <Icon className="w-4 h-4" />
                      </span>
                      <span>{text}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-card border border-border rounded-2xl p-4">
                <h3 className="text-[18px] font-bold mb-4">あなたの学習状況</h3>
                <div className="flex items-center gap-4">
                  <div
                    className="relative w-20 h-20 rounded-full"
                    style={{
                      background:
                        "conic-gradient(var(--primary) 0 126deg, var(--secondary) 126deg 360deg)",
                    }}
                  >
                    <div className="absolute inset-2 bg-card rounded-full flex items-center justify-center text-[15px] font-bold">
                      35%
                    </div>
                  </div>
                  <div>
                    <div className="text-[13px] text-muted-foreground">完了コース</div>
                    <div className="text-[24px] leading-tight font-bold text-primary">
                      7 <span className="text-muted-foreground text-[15px]">/ 20</span>
                    </div>
                  </div>
                </div>
                <a
                  href="#"
                  className="mt-4 inline-flex items-center gap-2 px-4 h-9 rounded-md border border-primary text-primary text-[13px] font-semibold w-full justify-center"
                >
                  学習を続ける <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
              <div className="bg-card border border-border rounded-2xl p-4 space-y-4">
                <h3 className="text-[18px] text-primary font-bold">おすすめの学習パス</h3>
                {[
                  {
                    i: <Network className="w-7 h-7" />,
                    t: "DFSChainマスターへの道",
                    d: "初心者から上級者まで、順を追って学べるおすすめの学習パスです。",
                  },
                  {
                    i: <Rocket className="w-7 h-7" />,
                    t: "デベロッパーへの道",
                    d: "開発を始めたい方におすすめの学習パスです。",
                  },
                ].map((p, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 border-b border-border pb-4 last:pb-0 last:border-b-0"
                  >
                    <span className="mt-3 rounded-md text-primary flex items-center justify-center shrink-0">
                      {p.i}
                    </span>
                    <div>
                      <div className="text-[15px]">{p.t}</div>
                      <p className="text-[12px] text-muted-foreground">{p.d}</p>
                      <a
                        href="#"
                        className="mt-2 inline-flex items-center gap-1.5 text-[15px] text-primary"
                      >
                        学習パスを見る <ArrowRight className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-card border border-border rounded-2xl p-4 space-y-4">
                <div className="flex items-start gap-4">
                  <span className="rounded-md text-primary flex items-center justify-center shrink-0">
                    <HelpCircle className="w-7 h-7" />
                  </span>
                  <div>
                    <div className="text-[15px] font-bold text-primary">ヘルプ＆サポート</div>
                    <p className="text-[12px] text-muted-foreground">
                      コースに関するご質問やサポートはこちらからご確認ください。
                    </p>
                    <a
                      href="#"
                      className="mt-2 inline-flex items-center gap-1.5 text-[15px] text-primary"
                    >
                      サポートを見る <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <StatsSection />
    </PageShell>
  );
}
