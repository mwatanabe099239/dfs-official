import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChevronLeft, ChevronRight, ThumbsUp, ThumbsDown, Circle } from "lucide-react";
import { PageShell, Container, Breadcrumb } from "@academy/components/site/PageShell";
import { Tag } from "@academy/components/site/cards";
import { typography } from "@academy/lib/typography";
import { cn } from "@academy/lib/utils";
import {
  RICH_HTML_CLASS,
  getPublishedCourseBySlug,
  getPublishedLesson,
  getPublishedLessonsForCourse,
} from "@academy/lib/academy-courses";
import { coursePath, courseLessonsPath, lessonPath, studyPath } from "@academy/lib/academy-slug";

const StudyVideoImg = "/academy/study-video.png";

type PageProps = {
  params: Promise<{ courseSlug: string; lessonSlug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { courseSlug, lessonSlug } = await params;
  const lesson = await getPublishedLesson(courseSlug, lessonSlug);
  if (!lesson) return { title: "学習を開始 — DFS Academy" };
  return {
    title: `${lesson.studyTitle || lesson.title} — 学習を開始`,
    description: lesson.studyDescription || lesson.description,
  };
}

export default async function StudyPage({ params }: PageProps) {
  const { courseSlug, lessonSlug } = await params;
  const [course, lesson, lessons] = await Promise.all([
    getPublishedCourseBySlug(courseSlug),
    getPublishedLesson(courseSlug, lessonSlug),
    getPublishedLessonsForCourse(courseSlug),
  ]);
  if (!course || !lesson) notFound();

  const index = lessons.findIndex((item) => item.id === lesson.id);
  const prev = index > 0 ? lessons[index - 1] : null;
  const next = index >= 0 && index < lessons.length - 1 ? lessons[index + 1] : null;

  return (
    <PageShell>
      <section className="py-10">
        <Container>
          <Breadcrumb
            items={[
              { label: "ホーム", to: "/" },
              { label: "コース", to: "/academy/courses" },
              { label: course.title, to: coursePath(course.title, course.id, course.slug) },
              {
                label: `レッスン${lesson.id}`,
                to: lessonPath(course.title, course.id, lesson.title, lesson.id, course.slug, lesson.slug),
              },
              { label: "学習を開始" },
            ]}
          />
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-5">
            <div>
              <Tag>
                {course.id}-{lesson.id} はじめに
              </Tag>
            </div>
            <div className="grid grid-cols-2 gap-2 w-full sm:flex sm:w-auto sm:items-center">
              {prev ? (
                <a
                  href={studyPath(course.title, course.id, prev.title, prev.id, course.slug, prev.slug)}
                  className="inline-flex items-center justify-center gap-1.5 px-4 h-10 rounded-md border border-border text-[15px] w-full sm:w-auto"
                >
                  <ChevronLeft className="w-4 h-4" /> 前のレッスン
                </a>
              ) : (
                <button className="inline-flex items-center justify-center gap-1.5 px-4 h-10 rounded-md border border-border text-[15px] w-full sm:w-auto text-muted-foreground" disabled>
                  <ChevronLeft className="w-4 h-4" /> 前のレッスン
                </button>
              )}
              {next ? (
                <a
                  href={studyPath(course.title, course.id, next.title, next.id, course.slug, next.slug)}
                  className="inline-flex items-center justify-center gap-1.5 px-4 h-10 rounded-md border border-primary text-primary text-[15px] font-semibold w-full sm:w-auto"
                >
                  次のレッスン <ChevronRight className="w-4 h-4" />
                </a>
              ) : (
                <a
                  href={courseLessonsPath(course.title, course.id, course.slug)}
                  className="inline-flex items-center justify-center gap-1.5 px-4 h-10 rounded-md border border-primary text-primary text-[15px] font-semibold w-full sm:w-auto"
                >
                  レッスン一覧 <ChevronRight className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          <h1 className={cn(typography.pageTitle, "text-foreground")}>
            {lesson.studyTitle || lesson.title}
          </h1>
          <p className={cn("mt-5", typography.pageLead)}>
            {lesson.studyDescription || lesson.description}
          </p>

          <div className="border border-primary-soft/50 rounded-xl p-4 sm:p-6 mt-6">
            <div className="rounded-2xl overflow-hidden mx-auto w-full lg:w-[90%]">
              <img
                src={StudyVideoImg}
                alt="Study Video"
                className="w-full h-full object-contain"
              />
            </div>

            <h2 className="mt-10 text-[26px] sm:text-[28px] lg:text-[30px] font-bold text-primary">
              動画のテキスト
            </h2>
            {lesson.studyContent?.trim() ? (
              <div
                className={cn("mt-3", RICH_HTML_CLASS)}
                dangerouslySetInnerHTML={{ __html: lesson.studyContent }}
              />
            ) : lesson.content?.trim() ? (
              <div
                className={cn("mt-3", RICH_HTML_CLASS)}
                dangerouslySetInnerHTML={{ __html: lesson.content }}
              />
            ) : null}

            <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="bg-card border border-border rounded-2xl p-5">
                <p className="text-[15px] font-semibold mb-3">
                  このレッスンは役に立ちましたか？
                </p>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <button className="inline-flex items-center justify-center gap-2 px-4 h-10 rounded-md bg-primary text-primary-foreground text-[15px] font-semibold">
                    <ThumbsUp className="w-4 h-4" /> 役に立った
                  </button>
                  <button className="inline-flex items-center justify-center gap-2 px-4 h-10 rounded-md border border-border text-[15px]">
                    <ThumbsDown className="w-4 h-4" /> 役に立たなかった
                  </button>
                </div>
              </div>
              <div className="bg-card border border-border rounded-2xl p-5">
                <p className="text-[15px] font-semibold mb-3">レッスンの完了状況</p>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:justify-between">
                  <div className="inline-flex items-center gap-2 text-[15px] text-muted-foreground">
                    <Circle className="w-4 h-4" /> 未完了
                  </div>
                  <button className="inline-flex items-center justify-center gap-2 px-4 h-10 rounded-md border border-primary text-primary text-[15px] font-semibold">
                    完了にする
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              {prev ? (
                <a
                  href={studyPath(course.title, course.id, prev.title, prev.id, course.slug, prev.slug)}
                  className="inline-flex items-center justify-center gap-2 px-4 h-10 rounded-md border border-border text-[15px]"
                >
                  <ChevronLeft className="w-4 h-4" /> 前のレッスン
                </a>
              ) : (
                <button className="inline-flex items-center justify-center gap-2 px-4 h-10 rounded-md border border-border text-[15px] text-muted-foreground" disabled>
                  <ChevronLeft className="w-4 h-4" /> 前のレッスン
                </button>
              )}
              {next ? (
                <a
                  href={studyPath(course.title, course.id, next.title, next.id, course.slug, next.slug)}
                  className="inline-flex items-center justify-center gap-2 px-5 h-10 rounded-md bg-primary text-primary-foreground text-[15px] font-semibold"
                >
                  次のレッスン <ChevronRight className="w-4 h-4" />
                </a>
              ) : (
                <a
                  href={coursePath(course.title, course.id, course.slug)}
                  className="inline-flex items-center justify-center gap-2 px-5 h-10 rounded-md bg-primary text-primary-foreground text-[15px] font-semibold"
                >
                  コースに戻る <ChevronRight className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
