import { unstable_noStore as noStore } from "next/cache";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import type { FaqEntry, FaqListItem, FaqSection } from "@academy/data/qa-faqs";
import { FAQ_ENTRIES } from "@academy/data/qa-faqs";
import { getDb } from "@academy/lib/firebase";

export const ACADEMY_QA_COLLECTION = "academy_qa_questions";

/** Parse minutes from a number or legacy labels like `約3分`. */
export function parseMinutesValue(value: unknown, fallback = 3): number {
  if (typeof value === "number" && Number.isFinite(value) && value > 0) {
    return Math.round(value);
  }
  const match = String(value ?? "").match(/(\d+)/);
  if (!match) return fallback;
  const minutes = Number(match[1]);
  return Number.isFinite(minutes) && minutes > 0 ? minutes : fallback;
}

/** Front-office display for minute values (`約3分`). */
export function formatApproxMinutes(minutes: number | string): string {
  const value = parseMinutesValue(minutes, 1);
  return `約${value}分`;
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.map((item) => String(item ?? "").trim()).filter(Boolean);
}

function parseListItems(value: unknown): FaqListItem[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (Array.isArray(item) && item.length >= 2) {
        return {
          heading: String(item[0] ?? "").trim(),
          body: String(item[1] ?? "").trim(),
        };
      }
      if (item && typeof item === "object") {
        const row = item as { heading?: unknown; body?: unknown };
        return {
          heading: String(row.heading ?? "").trim(),
          body: String(row.body ?? "").trim(),
        };
      }
      return { heading: "", body: "" };
    })
    .filter((row) => row.heading || row.body);
}

export function normalizeFaqSections(value: unknown): FaqSection[] {
  if (!Array.isArray(value)) return [];

  const sections: FaqSection[] = [];
  for (const raw of value) {
    if (!raw || typeof raw !== "object") continue;
    const item = raw as Record<string, unknown>;
    const kind = String(item.kind || "").trim();
    const title = String(item.title || "").trim();

    if (kind === "body") {
      sections.push({ kind: "body", title, body: String(item.body || "") });
      continue;
    }
    if (kind === "points") {
      sections.push({
        kind: "points",
        title,
        points: asStringArray(item.points),
      });
      continue;
    }
    if (kind === "list") {
      sections.push({
        kind: "list",
        title,
        list: parseListItems(item.list),
      });
    }
  }
  return sections;
}

export function serializeFaqDoc(data: Record<string, unknown>): FaqEntry | null {
  const numericId = Number(data.numericId);
  if (!Number.isInteger(numericId) || numericId < 1) return null;

  const question = String(data.question || "").trim();
  if (!question) return null;

  const tag = String(data.tag || "").trim();
  const tags = asStringArray(data.tags);
  const sections = normalizeFaqSections(data.sections);
  const content = String(data.content || "").trim();

  return {
    id: numericId,
    question,
    tag,
    tags: tags.length ? tags : tag ? [tag] : [],
    content: content || undefined,
    intro: String(data.intro || ""),
    answer: String(data.answer || ""),
    sections: sections.length ? sections : undefined,
    readTime: parseMinutesValue(data.readTime, 3),
    updatedAt: String(data.updatedAtDisplay || data.updatedAt || ""),
  };
}

/** Fetch published QA questions from Firestore (same collection as admin). */
export async function fetchPublishedFaqs(): Promise<FaqEntry[]> {
  noStore();
  const snap = await getDocs(
    query(
      collection(getDb(), ACADEMY_QA_COLLECTION),
      where("published", "==", true),
    ),
  );

  const faqs: Array<{ faq: FaqEntry; sortOrder: number }> = [];
  for (const doc of snap.docs) {
    const data = doc.data() as Record<string, unknown>;
    const faq = serializeFaqDoc(data);
    if (!faq) continue;
    faqs.push({
      faq,
      sortOrder: Number(data.sortOrder) || faq.id,
    });
  }

  return faqs
    .sort((a, b) => {
      if (a.sortOrder !== b.sortOrder) return a.sortOrder - b.sortOrder;
      return a.faq.id - b.faq.id;
    })
    .map((item) => item.faq);
}

export async function fetchFaqByNumericId(
  id: string | number,
): Promise<FaqEntry | null> {
  const numericId = typeof id === "string" ? Number.parseInt(id, 10) : id;
  if (!Number.isInteger(numericId) || numericId < 1) return null;

  // Prefer published filter so security rules can enforce public-read of published docs only.
  const snap = await getDocs(
    query(
      collection(getDb(), ACADEMY_QA_COLLECTION),
      where("numericId", "==", numericId),
      where("published", "==", true),
      limit(1),
    ),
  );

  if (snap.empty) return null;
  return serializeFaqDoc(snap.docs[0]!.data() as Record<string, unknown>);
}

/** Prefer Firestore; fall back to static seed data if Firebase is unavailable. */
export async function getPublishedFaqs(): Promise<FaqEntry[]> {
  try {
    const faqs = await fetchPublishedFaqs();
    if (faqs.length > 0) return faqs;
    console.warn("[academy-qa] Firestore returned no published FAQs; using static fallback.");
    return FAQ_ENTRIES;
  } catch (error) {
    console.error("[academy-qa] Failed to load FAQs from Firestore:", error);
    return FAQ_ENTRIES;
  }
}

export async function getPublishedFaqById(
  id: string | number,
): Promise<FaqEntry | null> {
  try {
    const faq = await fetchFaqByNumericId(id);
    if (faq) return faq;
  } catch (error) {
    console.error("[academy-qa] Failed to load FAQ from Firestore:", error);
  }

  const numericId = typeof id === "string" ? Number.parseInt(id, 10) : id;
  return FAQ_ENTRIES.find((item) => item.id === numericId) ?? null;
}
