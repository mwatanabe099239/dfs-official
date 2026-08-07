import { NextResponse } from "next/server";

import { getPublishedArticles } from "@academy/lib/academy-articles";
import { getPublishedCourses } from "@academy/lib/academy-courses";
import { getPublishedFaqs } from "@academy/lib/academy-qa";
import {
  articlePath,
  coursePath,
  qaPath,
} from "@academy/lib/academy-slug";
import { asAcademyLocale } from "@academy/i18n/locales";
import type { AcademySearchHit } from "@academy/lib/academy-search";

export const dynamic = "force-dynamic";

export type { AcademySearchHit };

function stripHtml(value: string): string {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function snippetFrom(text: string, query: string, max = 120): string {
  const plain = stripHtml(text);
  if (!plain) return "";
  const lower = plain.toLowerCase();
  const idx = lower.indexOf(query);
  if (idx < 0) {
    return plain.length > max ? `${plain.slice(0, max).trimEnd()}…` : plain;
  }
  const start = Math.max(0, idx - 24);
  const chunk = plain.slice(start, start + max);
  const prefix = start > 0 ? "…" : "";
  const suffix = start + max < plain.length ? "…" : "";
  return `${prefix}${chunk.trim()}${suffix}`;
}

function matches(haystack: string, query: string): boolean {
  return haystack.toLowerCase().includes(query);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = String(searchParams.get("q") || "").trim();
  const locale = asAcademyLocale(searchParams.get("locale"));

  if (q.length < 1) {
    return NextResponse.json({ results: [] as AcademySearchHit[] });
  }

  const query = q.toLowerCase();
  const [faqs, articles, courses] = await Promise.all([
    getPublishedFaqs(locale),
    getPublishedArticles(),
    getPublishedCourses(),
  ]);

  const results: AcademySearchHit[] = [];

  for (const faq of faqs) {
    const haystack = [faq.question, faq.intro, faq.answer, faq.tag, ...faq.tags]
      .filter(Boolean)
      .join(" ");
    if (!matches(haystack, query)) continue;
    results.push({
      type: "qa",
      id: faq.id,
      title: faq.question,
      snippet: snippetFrom(faq.intro || faq.answer, query),
      href: qaPath(faq.question, faq.id, faq.slug),
      tag: faq.tag,
    });
    if (results.filter((r) => r.type === "qa").length >= 8) break;
  }

  for (const article of articles) {
    const haystack = [
      article.title,
      article.intro,
      article.tag,
      ...article.tags,
      stripHtml(article.content),
    ]
      .filter(Boolean)
      .join(" ");
    if (!matches(haystack, query)) continue;
    results.push({
      type: "article",
      id: article.id,
      title: article.title,
      snippet: snippetFrom(article.intro || article.content, query),
      href: articlePath(article.title, article.id, article.slug),
      tag: article.tag,
    });
    if (results.filter((r) => r.type === "article").length >= 8) break;
  }

  for (const course of courses) {
    const haystack = [
      course.title,
      course.description,
      course.level,
      course.categoryLabel,
      ...course.tags,
      stripHtml(course.content),
    ]
      .filter(Boolean)
      .join(" ");
    if (!matches(haystack, query)) continue;
    results.push({
      type: "course",
      id: course.id,
      title: course.title,
      snippet: snippetFrom(course.description || course.content, query),
      href: coursePath(course.title, course.id, course.slug),
      tag: course.categoryLabel || course.tags[0],
    });
    if (results.filter((r) => r.type === "course").length >= 8) break;
  }

  return NextResponse.json({ results });
}
