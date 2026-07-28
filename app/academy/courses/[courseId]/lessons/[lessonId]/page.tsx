import type { ReactNode } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  GraduationCap,
  BookOpen,
  Clock,
  CheckCircle2,
  ThumbsUp,
  ThumbsDown,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  FileText,
  HelpCircle,
  BookMarked,
} from "lucide-react";
import { PageShell, Container, Breadcrumb } from "@academy/components/site/PageShell";
import { StatsSection } from "@academy/components/site/StatsSection";
import { typography } from "@academy/lib/typography";
import { cn } from "@academy/lib/utils";
import {
  RICH_HTML_CLASS,
  courseIcon,
  formatApproxMinutes,
  getPublishedCourseById,
  getPublishedLesson,
  getPublishedLessonsForCourse,
} from "@academy/lib/academy-courses";

type PageProps = {
  params: Promise<{ courseId: string; lessonId: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { courseId, lessonId } = await params;
  const lesson = await getPublishedLesson(courseId, lessonId);
  if (!lesson) return { title: "レッスン — DFS Academy" };
  return {
    title: `${lesson.title} — レッスン${lesson.id}`,
    description: lesson.description,
  };
}

export default async function LessonPage({ params }: PageProps) {
  const { courseId, lessonId } = await params;
  const [course, lesson, lessons] = await Promise.all([
    getPublishedCourseById(courseId),
    getPublishedLesson(courseId, lessonId),
    getPublishedLessonsForCourse(courseId),
  ]);
  if (!course || !lesson) notFound();

  const index = lessons.findIndex((item) => item.id === lesson.id);
  const prev = index > 0 ? lessons[index - 1] : null;
  const next = index >= 0 && index < lessons.length - 1 ? lessons[index + 1] : null;
  const Icon = courseIcon(lesson.iconKey);

  return (
    <PageShell>
      <section className="py-12">
        <Container>
          <Breadcrumb
            items={[
              { label: "ホーム", to: "/" },
              { label: "コース", to: "/academy/courses" },
              { label: course.title, to: `/academy/courses/${courseId}` },
              { label: `レッスン${lesson.id}` },
            ]}
          />
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">
            <div>
              <h1 className={cn(typography.pageTitle, "text-foreground")}>
                {lesson.title}
              </h1>
              <p className={cn("mt-5", typography.pageLead)}>{lesson.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Pill
                  icon={<GraduationCap className="w-4 h-4" />}
                  label={course.audienceLabel || course.level}
                />
                <Pill
                  icon={<BookOpen className="w-4 h-4" />}
                  label={course.categoryLabel || "基礎"}
                />
                <Pill icon={<Clock className="w-4 h-4" />} label={formatApproxMinutes(lesson.durationMinutes)} />
              </div>

              <div className="border border-primary-soft/50 rounded-xl mt-6">
                <div className="bg-primary-softer/50 border-b border-primary-soft/50 p-5 rounded-t-xl flex items-start gap-4">
                  <Icon className="w-10 h-10 text-primary shrink-0" strokeWidth={1} />
                  <p className="text-[15px] text-foreground/90">{lesson.description}</p>
                </div>
                <div className="p-5 rounded-b-xl">
                  {lesson.content?.trim() ? (
                    <div
                      className={RICH_HTML_CLASS}
                      dangerouslySetInnerHTML={{ __html: lesson.content }}
                    />
                  ) : null}

                  <div className="mt-10 text-center">
                    <p className="text-[15px] mb-3">このレッスンは役に立ちましたか？</p>
                    <div className="inline-flex items-center gap-3">
                      <button className="inline-flex items-center gap-2 px-4 h-9 rounded-md border border-border md:text-[15px] text-[13px] text-primary">
                        <ThumbsUp className="w-4 h-4" /> 役に立った
                      </button>
                      <button className="inline-flex items-center gap-2 px-4 h-9 rounded-md border border-border md:text-[15px] text-[13px] text-muted-foreground">
                        <ThumbsDown className="w-4 h-4" /> 役に立たなかった
                      </button>
                    </div>
                  </div>

                  <div className="mt-8 flex gap-3 items-center justify-between">
                    {prev ? (
                      <a
                        href={`/academy/courses/${courseId}/lessons/${prev.id}`}
                        className="inline-flex items-center gap-2 px-4 h-10 rounded-md border border-border md:text-[15px] text-[13px]"
                      >
                        <ChevronLeft className="w-4 h-4" /> 前のレッスン
                      </a>
                    ) : (
                      <button
                        className="inline-flex items-center gap-2 px-4 h-10 rounded-md border border-border md:text-[15px] text-[13px] text-muted-foreground"
                        disabled
                      >
                        <ChevronLeft className="w-4 h-4" /> 前のレッスン
                      </button>
                    )}
                    <a
                      href={`/academy/courses/${courseId}/lessons/${lesson.id}/study`}
                      className="inline-flex items-center gap-2 px-5 h-10 rounded-md border border-primary md:text-[15px] text-[13px] text-primary font-semibold"
                    >
                      学習を開始 <ChevronRight className="w-4 h-4" />
                    </a>
                    {next ? (
                      <a
                        href={`/academy/courses/${courseId}/lessons/${next.id}`}
                        className="inline-flex items-center gap-2 px-4 h-10 rounded-md border border-border md:text-[15px] text-[13px]"
                      >
                        次のレッスン <ChevronRight className="w-4 h-4" />
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>

            <aside className="space-y-5">
              <div className="bg-card border border-border rounded-2xl p-5">
                <h3 className="text-[15px] font-bold mb-4">コース進捗</h3>
                <div className="flex flex-col items-center">
                  <div
                    className="relative w-32 h-32 rounded-full"
                    style={{
                      background: `conic-gradient(var(--primary) 0 ${(index + 1) * (360 / Math.max(lessons.length, 1))}deg, var(--secondary) ${(index + 1) * (360 / Math.max(lessons.length, 1))}deg 360deg)`,
                    }}
                  >
                    <div className="absolute inset-3 bg-card rounded-full flex flex-col items-center justify-center">
                      <div className="text-[28px] font-bold">
                        {Math.round(((index + 1) / Math.max(lessons.length, 1)) * 100)}
                        <span className="text-[15px]">%</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 text-[13px] text-muted-foreground">
                    {index + 1} / {lessons.length} レッスン
                  </div>
                  <a
                    href={`/academy/courses/${courseId}`}
                    className="mt-3 text-[13px] text-primary inline-flex items-center gap-1"
                  >
                    コース全体を見る →
                  </a>
                </div>
              </div>

              <div className="bg-card border border-border rounded-2xl p-3">
                <h3 className="text-[15px] font-bold mb-3 px-2">レッスン一覧</h3>
                <ul className="space-y-1">
                  {lessons.map((l) => (
                    <li key={l.id}>
                      <a
                        href={`/academy/courses/${courseId}/lessons/${l.id}`}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[15px] ${l.id === lesson.id ? "bg-primary-softer text-primary border border-primary/30" : "hover:bg-secondary"}`}
                      >
                        <span className="w-5 text-center font-semibold">{l.id}</span>
                        <span className="flex-1">{l.title}</span>
                        <span className="text-[12px] text-muted-foreground">
                          {formatApproxMinutes(l.durationMinutes)}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-card border border-border rounded-2xl p-5">
                <h3 className="text-[15px] font-bold mb-4">このレッスンのポイント</h3>
                <ul className="space-y-2.5 text-[15px]">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5" />{" "}
                    {lesson.title}を理解する
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5" />{" "}
                    {lesson.description}
                  </li>
                </ul>
              </div>

              <div className="bg-card border border-border rounded-2xl p-5">
                <h3 className="text-[15px] font-bold mb-4">学習サポート</h3>
                <ul className="space-y-2.5 text-[15px]">
                  <li className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-primary" /> Q&Aで質問できる
                  </li>
                  <li className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-primary" /> 関連記事を確認できる
                  </li>
                  <li className="flex items-center gap-2">
                    <BookMarked className="w-4 h-4 text-primary" /> 公式ドキュメントを確認する
                  </li>
                  <li className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-primary" /> 初心者向けガイドを見る
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
    <span className="inline-flex items-center gap-2 px-3 h-9 rounded-md border border-border bg-card text-[15px]">
      <span className="text-primary">{icon}</span> {label}
    </span>
  );
}
