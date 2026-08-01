import type { ReactNode } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  GraduationCap,
  BookOpen,
  Clock,
  FileText,
  Play,
  ChevronRight,
  ArrowRight,
  HelpCircle,
  Users,
  BarChart3,
  ListChecks,
} from "lucide-react";
import { PageShell, Container, Breadcrumb } from "@academy/components/site/PageShell";
import { StatsSection } from "@academy/components/site/StatsSection";
import { RelatedCourses } from "@academy/components/site/RelatedCourses";
import { typography } from "@academy/lib/typography";
import { cn } from "@academy/lib/utils";
import {
  RICH_HTML_CLASS,
  courseIcon,
  formatApproxMinutes,
  getPublishedCourseBySlug,
  getPublishedCourses,
  getPublishedLessonsForCourse,
} from "@academy/lib/academy-courses";
import { courseLessonsPath, lessonPath } from "@academy/lib/academy-slug";

const CuurseDetailHeroImg = "/academy/courses-detail-hero.png";

type PageProps = {
  params: Promise<{ courseSlug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { courseSlug } = await params;
  const course = await getPublishedCourseBySlug(courseSlug);
  if (!course) {
    return { title: "コース — DFS Academy" };
  }
  return {
    title: `${course.title} — DFS Academy`,
    description: course.description,
  };
}

export default async function CourseDetail({ params }: PageProps) {
  const { courseSlug } = await params;
  const course = await getPublishedCourseBySlug(courseSlug);
  if (!course) notFound();

  const [lessons, allCourses] = await Promise.all([
    getPublishedLessonsForCourse(course.id),
    getPublishedCourses(),
  ]);
  const related = allCourses.filter((item) =>
    course.relatedCourseIds.includes(item.id),
  );

  return (
    <PageShell>
      <section className="py-12">
        <Container>
          <Breadcrumb
            items={[
              { label: "ホーム", to: "/" },
              { label: "コース", to: "/academy/courses" },
              { label: course.title },
            ]}
          />
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_440px] gap-16 lg:items-stretch mb-10">
            <div className="min-w-0">
              <h1 className={cn(typography.pageTitle, "text-foreground")}>
                {course.title}
              </h1>
              <p className={cn("mt-5", typography.pageLead, "w-full lg:w-4/5")}>
                {course.description}
              </p>
              <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
                <Pill
                  icon={<GraduationCap className="w-4 h-4" />}
                  label={course.audienceLabel || course.level}
                />
                <Pill
                  icon={<BookOpen className="w-4 h-4" />}
                  label={course.categoryLabel || "基礎"}
                />
                <Pill icon={<Clock className="w-4 h-4" />} label={formatApproxMinutes(course.durationMinutes)} />
                <Pill
                  icon={<FileText className="w-4 h-4" />}
                  label={`${lessons.length}レッスン`}
                />
              </div>
              <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                <a
                  href={courseLessonsPath(course.title, course.id, course.slug)}
                  className="inline-flex items-center justify-center gap-2 px-6 h-10 rounded-md bg-primary text-primary-foreground font-semibold text-[15px] w-full"
                >
                  <Play className="w-4 h-4 fill-current" /> 学習を始める
                </a>
                <a
                  href="/academy/courses"
                  className="inline-flex items-center justify-center gap-2 px-6 h-10 rounded-md border-2 border-primary text-primary font-semibold text-[15px] w-full"
                >
                  コース一覧に戻る
                </a>
              </div>
            </div>
            <div className="border border-border rounded-2xl p-6 flex items-center justify-center bg-primary-softer/40 min-h-[220px] lg:min-h-0">
              <img
                src={CuurseDetailHeroImg}
                alt={`${course.title} ヒーローイメージ`}
                className="max-h-full w-full object-contain"
              />
            </div>
          </div>

          <h2 className="text-[26px] sm:text-[28px] lg:text-[30px] font-bold mb-5">
            このコースで学べること
          </h2>
          {course.content?.trim() ? (
            <div
              className={cn(RICH_HTML_CLASS, "mb-12")}
              dangerouslySetInnerHTML={{ __html: course.content }}
            />
          ) : null}

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
            <div>
              <h2 className="text-[26px] sm:text-[28px] lg:text-[30px] font-bold mb-5">
                レッスン一覧
              </h2>
              <ul className="space-y-1">
                {lessons.map((l) => {
                  const Icon = courseIcon(l.iconKey);
                  return (
                    <li key={l.id}>
                      <a
                        href={lessonPath(course.title, course.id, l.title, l.id, course.slug, l.slug)}
                        className="flex flex-col gap-3 p-4 sm:grid sm:grid-cols-[auto_auto_1fr] sm:items-center lg:grid-cols-[48px_56px_1fr_80px_24px] lg:gap-4 bg-card border border-border rounded-xl hover:border-primary/40"
                      >
                        <div className="flex items-center gap-3 sm:contents">
                          <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[18px] font-bold shrink-0">
                            {l.id}
                          </span>
                          <span className="rounded-lg text-primary flex items-center justify-center shrink-0">
                            <Icon className="w-10 h-10" strokeWidth={1.5} />
                          </span>
                          <div className="flex-1 min-w-0 sm:col-span-1 lg:col-auto">
                            <div className="text-[18px]">{l.title}</div>
                            <p className="text-[13px] text-muted-foreground">
                              {l.description}
                            </p>
                            <span className="mt-1 inline-flex items-center gap-1.5 text-[13px] text-muted-foreground lg:hidden">
                              <Clock className="w-3.5 h-3.5" />{" "}
                              {formatApproxMinutes(l.durationMinutes)}
                            </span>
                          </div>
                        </div>
                        <span className="hidden lg:inline-flex items-center gap-1.5 text-[13px] text-muted-foreground">
                          <Clock className="w-3.5 h-3.5" />{" "}
                          {formatApproxMinutes(l.durationMinutes)}
                        </span>
                        <ChevronRight className="hidden lg:block w-5 h-5 text-primary justify-self-end" />
                      </a>
                    </li>
                  );
                })}
              </ul>

              <RelatedCourses courses={related} />
            </div>

            <aside className="space-y-5">
              <div className="bg-card border border-border rounded-2xl p-5">
                <h3 className="text-[18px] font-bold mb-4 text-primary">コース情報</h3>
                <ul className="space-y-3 text-[15px]">
                  {[
                    { i: <BookOpen className="w-4 h-4" />, t: "レベル", v: course.level },
                    {
                      i: <Clock className="w-4 h-4" />,
                      t: "学習時間",
                      v: formatApproxMinutes(course.durationMinutes),
                    },
                    {
                      i: <ListChecks className="w-4 h-4" />,
                      t: "レッスン数",
                      v: `${lessons.length}レッスン`,
                    },
                    {
                      i: <BarChart3 className="w-4 h-4" />,
                      t: "受講形式",
                      v: "オンデマンド",
                    },
                  ].map((it, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <span className="text-primary">{it.i}</span>
                      <span className="text-muted-foreground flex-1">{it.t}</span>
                      <span className="">{it.v}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-card border border-border rounded-2xl p-5">
                <h3 className="text-[18px] font-bold mb-4 text-primary">受講前の準備</h3>
                <ul className="space-y-2.5 text-[15px]">
                  <li className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full border border-primary mt-0.5" />{" "}
                    インターネットに接続できる環境
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full border border-primary mt-0.5" />{" "}
                    <div className="">
                      <span>DFSChain対応ウォレット</span>
                      <br />
                      <span className="text-[11px] text-muted-foreground">
                        （推奨：DFSWallet）
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full border border-primary mt-0.5" />{" "}
                    少額のDFS（ガス代として使用）
                  </li>
                </ul>
                <a
                  href="/academy/qa"
                  className="mt-3 inline-flex items-center gap-1.5 text-[13px] text-primary"
                >
                  詳細を見る <ArrowRight className="w-3 h-3" />
                </a>
              </div>
              <div className="bg-card border border-border rounded-2xl p-5">
                <h3 className="text-[18px] font-bold mb-4 text-primary">学習サポート</h3>
                <ul className="space-y-2.5 text-[15px]">
                  <li className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-primary" /> 不明点はQ&Aで質問できます
                  </li>
                  <li className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-primary" /> 公式ドキュメントを確認できます
                  </li>
                  <li className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary" /> サポートチームがサポートします
                  </li>
                </ul>
                <a
                  href="/academy/contact"
                  className="mt-3 inline-flex items-center gap-1.5 text-[13px] text-primary"
                >
                  サポートを見る <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <StatsSection />
    </PageShell>
  );
}

function Pill({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <span className="flex w-full items-center justify-center gap-2 px-3 h-9 rounded-md border border-border bg-card text-[15px] text-foreground">
      <span className="text-primary shrink-0">{icon}</span>
      <span className="truncate">{label}</span>
    </span>
  );
}
