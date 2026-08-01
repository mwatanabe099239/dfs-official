"use client";

import { useMemo, useState } from "react";
import { Clock, Play, Search, ChevronDown } from "lucide-react";
import { courseIcon, formatApproxMinutes, type AcademyLesson } from "@academy/lib/academy-courses";
import { contentSlug } from "@academy/lib/academy-slug";

type LessonsBrowseProps = {
  courseSlug: string;
  lessons: AcademyLesson[];
};

export function LessonsBrowse({ courseSlug, lessons }: LessonsBrowseProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return lessons;
    return lessons.filter((lesson) => {
      const haystack = [lesson.title, lesson.description, String(lesson.id)]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [lessons, searchTerm]);

  return (
    <>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          className="inline-flex items-center gap-2 text-[15px] text-foreground"
        >
          並び順：標準 <ChevronDown className="w-4 h-4" />
        </button>
        <div className="relative w-full sm:flex-1 sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="レッスンを検索"
            className="w-full h-10 pl-9 pr-3 rounded-lg border border-border bg-card text-[15px] focus:outline-none focus:border-primary"
          />
        </div>
      </div>

      <ul className="mt-5 space-y-3">
        {filtered.map((l) => {
          const Icon = courseIcon(l.iconKey);
          const lessonSlug = l.slug || contentSlug(l.title, l.id);
          return (
            <li key={l.id}>
              <a
                href={`/academy/courses/${courseSlug}/lessons/${lessonSlug}`}
                className={`relative flex flex-col gap-3 p-4 sm:grid sm:grid-cols-[50px_70px_1fr_auto] sm:items-center lg:gap-4 bg-card border rounded-xl hover:border-primary/40 ${l.featured ? "border-primary bg-primary-softer/40" : "border-border"}`}
              >
                {l.featured && (
                  <span className="absolute top-0 right-0 px-2 py-0.5 rounded-tr-md bg-primary text-primary-foreground text-[12px] font-bold">
                    おすすめ
                  </span>
                )}
                <div className="flex items-start gap-3 sm:contents">
                  <span className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[15px] font-bold shrink-0">
                    {l.id}
                  </span>
                  <span className="rounded-lg text-primary flex items-center justify-center shrink-0 [&_svg]:w-10 [&_svg]:h-10 sm:[&_svg]:w-14 sm:[&_svg]:h-14">
                    <Icon strokeWidth={1} />
                  </span>
                  <div className="flex-1 min-w-0 md:ml-5">
                    <div className="text-[15px] font-bold">{l.title}</div>
                    <p className="text-[15px] my-1 text-muted-foreground">
                      {l.description}
                    </p>
                    <div className="text-[15px] text-muted-foreground inline-flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-primary" />{" "}
                      {formatApproxMinutes(l.durationMinutes)}
                    </div>
                  </div>
                </div>
                <div className="sm:h-full sm:flex sm:items-end w-full sm:w-auto">
                  <span className="inline-flex items-center justify-center gap-1.5 px-3 h-9 rounded-md border border-primary text-primary text-[15px] font-semibold w-full sm:w-auto">
                    <Play className="w-3.5 h-3.5 fill-current" /> 学習開始
                  </span>
                </div>
              </a>
            </li>
          );
        })}
      </ul>
    </>
  );
}
