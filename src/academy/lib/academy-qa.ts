import { unstable_noStore as noStore } from "next/cache";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import type {
  FaqEntry,
  FaqListItem,
  FaqSection,
  FaqTranslation,
} from "@academy/data/qa-faqs";
import { FAQ_ENTRIES } from "@academy/data/qa-faqs";
import { getDb } from "@academy/lib/firebase";
import { assignUniqueSlugs, matchesSlugOrId } from "@academy/lib/academy-slug";
import { DEFAULT_ACADEMY_LOCALE, type AcademyLocale } from "@academy/i18n/locales";

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

/** Locale-aware read-time label. */
export function formatReadTime(
  minutes: number | string,
  locale: AcademyLocale = DEFAULT_ACADEMY_LOCALE,
): string {
  const value = parseMinutesValue(minutes, 1);
  if (locale === "en") return `About ${value} min`;
  if (locale === "ko") return `약 ${value}분`;
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

/**
 * Read the translations written by the admin AI pipeline. A translation missing
 * a title or body is dropped so the page falls back to Japanese rather than
 * rendering blanks.
 */
function parseFaqTranslations(value: unknown): Record<string, FaqTranslation> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  const raw = value as Record<string, unknown>;
  const result: Record<string, FaqTranslation> = {};

  for (const [locale, entry] of Object.entries(raw)) {
    if (!entry || typeof entry !== "object") continue;
    const row = entry as Record<string, unknown>;
    const question = String(row.question || "").trim();
    const content = String(row.content || "").trim();
    if (!question || !content) continue;

    result[locale] = {
      question,
      answer: String(row.answer || "").trim(),
      content,
      seoTitle: String(row.seoTitle || "").trim(),
      metaDescription: String(row.metaDescription || "").trim(),
    };
  }

  return result;
}

/**
 * Swap an entry to its translated view for the given locale.
 *
 * `tag`/`tags` deliberately stay Japanese: they are the canonical filter keys
 * shared across all three languages, and the UI localises them for display.
 * Anything without a translation is returned untouched, so a partially
 * translated library still renders — just in Japanese.
 */
export function localizeFaq(faq: FaqEntry, locale: AcademyLocale): FaqEntry {
  if (locale === "ja") return { ...faq, translated: true };

  const translation = faq.translations?.[locale];
  if (!translation) return { ...faq, translated: false };

  return {
    ...faq,
    question: translation.question,
    answer: translation.answer || faq.answer,
    content: translation.content,
    // Legacy section-based bodies are Japanese-only; the translated HTML in
    // `content` replaces them entirely.
    intro: "",
    sections: undefined,
    translated: true,
  };
}

export function localizeFaqs(faqs: FaqEntry[], locale: AcademyLocale): FaqEntry[] {
  return faqs.map((faq) => localizeFaq(faq, locale));
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
    translations: parseFaqTranslations(data.translations),
    slug: String(data.slug || "").trim() || undefined,
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

/**
 * Entries published through the admin carry a slug frozen at publish time, so
 * renaming a question never moves its URL. Only legacy entries without one fall
 * back to deriving a slug from the current title.
 */
function withFaqSlugs(faqs: FaqEntry[]): FaqEntry[] {
  const frozen = new Set(
    faqs.map((faq) => faq.slug).filter((slug): slug is string => Boolean(slug)),
  );
  const derived = assignUniqueSlugs(
    faqs.filter((faq) => !faq.slug),
    (item) => item.question,
  );

  return faqs.map((faq) => {
    if (faq.slug) return faq;
    const candidate = derived.get(faq.id) || String(faq.id);
    return {
      ...faq,
      slug: frozen.has(candidate) ? `${candidate}-${faq.id}` : candidate,
    };
  });
}

/**
 * Prefer Firestore; fall back to static seed data if Firebase is unavailable.
 *
 * Slugs are always assigned from the Japanese master before localisation, so a
 * translated page keeps the exact same URL as its Japanese original.
 */
export async function getPublishedFaqs(
  locale: AcademyLocale = DEFAULT_ACADEMY_LOCALE,
): Promise<FaqEntry[]> {
  try {
    const faqs = await fetchPublishedFaqs();
    if (faqs.length > 0) return localizeFaqs(withFaqSlugs(faqs), locale);
    console.warn("[academy-qa] Firestore returned no published FAQs; using static fallback.");
    return localizeFaqs(withFaqSlugs(FAQ_ENTRIES), locale);
  } catch (error) {
    console.error("[academy-qa] Failed to load FAQs from Firestore:", error);
    return localizeFaqs(withFaqSlugs(FAQ_ENTRIES), locale);
  }
}

/** Resolve by title slug or legacy numeric id. */
export async function getPublishedFaqBySlug(
  slug: string | number,
  locale: AcademyLocale = DEFAULT_ACADEMY_LOCALE,
): Promise<FaqEntry | null> {
  const param = String(slug);
  // Match against the Japanese master so a translated URL resolves even though
  // the visible title is in another language.
  const faqs = await getPublishedFaqs(DEFAULT_ACADEMY_LOCALE);
  const match = faqs.find((faq) =>
    matchesSlugOrId(param, faq.question, faq.id, faq.slug),
  );
  return match ? localizeFaq(match, locale) : null;
}

/** @deprecated Prefer getPublishedFaqBySlug — kept for call-site migration. */
export async function getPublishedFaqById(
  id: string | number,
): Promise<FaqEntry | null> {
  return getPublishedFaqBySlug(id);
}
