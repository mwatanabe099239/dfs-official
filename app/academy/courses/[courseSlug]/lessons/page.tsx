import type { ReactNode } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  GraduationCap,
  BookOpen,
  Clock,
  FileText,
  Play,
  CheckCircle2,
  HelpCircle,
  MessageCircle,
  BookOpenCheck,
} from "lucide-react";
import { PageShell, Container, Breadcrumb } from "@academy/components/site/PageShell";
import { RelatedCourses } from "@academy/components/site/RelatedCourses";
import { StatsSection } from "@academy/components/site/StatsSection";
import { typography } from "@academy/lib/typography";
import { cn } from "@academy/lib/utils";
import {
  formatApproxMinutes,
  getPublishedCourseBySlug,
  getPublishedCourses,
  getPublishedLessonsForCourse,
} from "@academy/lib/academy-courses";
import { coursePath, lessonPath } from "@academy/lib/academy-slug";
import { LessonsBrowse } from "@academy/components/site/LessonsBrowse";

type PageProps = {
  params: Promise<{ courseSlug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { courseSlug } = await params;
  const course = await getPublishedCourseBySlug(courseSlug);
  if (!course) return { title: "レッスン一覧 — DFS Academy" };
  return {
    title: `レッスン一覧 — ${course.title}`,
    description: `${course.title}のレッスンを順番に学べます。`,
  };
}

export default async function LessonList({ params }: PageProps) {
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
  const firstLessonId = lessons[0]?.id;

  return (
    <PageShell>
      <section className="py-12">
        <Container>
          <Breadcrumb
            items={[
              { label: "ホーム", to: "/" },
              { label: "コース", to: "/academy/courses" },
              { label: course.title, to: coursePath(course.title, course.id, course.slug) },
              { label: "レッスン一覧" },
            ]}
          />
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">
            <div>
              <h1 className={cn(typography.pageTitle, "text-foreground")}>レッスン一覧</h1>
              <p className={cn("mt-5", typography.pageLead)}>
                {course.title}の全{lessons.length}レッスンを順番に学べます。
              </p>
              <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2 w-full">
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
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                {firstLessonId ? (
                  <a
                    href={lessonPath(course.title, course.id, lessons[0].title, lessons[0].id, course.slug, lessons[0].slug)}
                    className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 h-10 rounded-md bg-primary text-primary-foreground font-semibold text-[15px] w-full"
                  >
                    <Play className="w-4 h-4 fill-current" /> 最初のレッスンを始める
                  </a>
                ) : null}
                <a
                  href={coursePath(course.title, course.id, course.slug)}
                  className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 h-10 rounded-md border-2 border-primary text-primary font-semibold text-[15px] w-full"
                >
                  コーストップに戻る
                </a>
              </div>

              <LessonsBrowse courseSlug={course.slug || courseSlug} lessons={lessons} />

              <RelatedCourses courses={related} />
            </div>

            <aside className="space-y-5">
              <div className="bg-card border border-border rounded-2xl p-5">
                <h3 className="text-[18px] font-bold mb-4">コース進捗</h3>
                <div className="flex flex-col items-center">
                  <div
                    className="relative w-32 h-32 rounded-full"
                    style={{ background: "conic-gradient(var(--secondary) 0 360deg)" }}
                  >
                    <div className="absolute inset-3 bg-card rounded-full flex flex-col items-center justify-center">
                      <div className="text-[28px] font-bold">
                        0<span className="text-[15px]">%</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 text-[15px] text-muted-foreground">未開始</div>
                </div>
              </div>
              <div className="bg-card border border-border rounded-2xl p-5">
                <h3 className="text-[18px] font-bold mb-4">コース情報</h3>
                <ul className="space-y-3 text-[15px]">
                  {[
                    { i: <BookOpen className="w-4 h-4" />, t: "レベル", v: course.level },
                    {
                      i: <Clock className="w-4 h-4" />,
                      t: "学習時間",
                      v: formatApproxMinutes(course.durationMinutes),
                    },
                    {
                      i: <FileText className="w-4 h-4" />,
                      t: "レッスン数",
                      v: String(lessons.length),
                    },
                    {
                      i: <BookOpenCheck className="w-4 h-4" />,
                      t: "受講形式",
                      v: "オンデマンド",
                    },
                  ].map((it, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <span className="text-primary">{it.i}</span>
                      <span className="text-muted-foreground flex-1">{it.t}</span>
                      <span className="font-semibold">{it.v}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-card border border-border rounded-2xl p-5">
                <h3 className="text-[18px] font-bold mb-4">このコースで学べること</h3>
                <ul className="space-y-2.5 text-[15px]">
                  {lessons.slice(0, 4).map((l) => (
                    <li key={l.id} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />{" "}
                      {l.title}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-card border border-border rounded-2xl p-5">
                <h3 className="text-[18px] font-bold mb-4">学習サポート</h3>
                <ul className="space-y-2.5 text-[15px]">
                  <li className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-primary" /> Q&Aで質問できる
                  </li>
                  <li className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-primary" /> 関連記事を確認できる
                  </li>
                  <li className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-primary" /> 初心者向けガイドあり
                  </li>
                </ul>
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
