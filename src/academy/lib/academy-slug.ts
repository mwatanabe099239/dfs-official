/**
 * Title-based URL slugs for Academy content.
 *
 * Japanese titles are kept as Unicode path segments (browsers display them
 * readable). Unsafe URL characters and whitespace are normalized. Numeric
 * ids remain as a fallback for old bookmarks / collisions.
 */

/** Turn a title/question into a URL path segment. */
export function slugifyTitle(title: string): string {
  return String(title || "")
    .trim()
    .normalize("NFKC")
    .replace(/[\s\u3000]+/g, "-")
    .replace(/[\/\\?#%&=+<>:"'|^*`[\]{}]+/g, "")
    .replace(/[。．！!？?、，,・…〜～：:；;（）()【】「」『』〈〉《》""'']+/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Stable slug for a content item. Collisions append `-{id}`. */
export function contentSlug(title: string, id: number): string {
  const base = slugifyTitle(title);
  return base || String(id);
}

/** Assign unique slugs across a list (append `-{id}` when base collides). */
export function assignUniqueSlugs<T extends { id: number }>(
  items: T[],
  getTitle: (item: T) => string,
): Map<number, string> {
  const bases = items.map((item) => {
    const base = slugifyTitle(getTitle(item)) || `item-${item.id}`;
    return { id: item.id, base };
  });

  const counts = new Map<string, number>();
  for (const { base } of bases) {
    counts.set(base, (counts.get(base) || 0) + 1);
  }

  const result = new Map<number, string>();
  for (const { id, base } of bases) {
    result.set(id, (counts.get(base) || 0) > 1 ? `${base}-${id}` : base);
  }
  return result;
}

/** Match a route param against an item's slug or legacy numeric id. */
export function matchesSlugOrId(
  param: string,
  title: string,
  id: number,
  uniqueSlug?: string,
): boolean {
  const decoded = safeDecode(param);
  if (decoded === String(id)) return true;
  if (uniqueSlug && (decoded === uniqueSlug || param === uniqueSlug)) return true;
  const base = contentSlug(title, id);
  return decoded === base || param === base || decoded === `${base}-${id}`;
}

function safeDecode(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export function qaPath(question: string, id: number, slug?: string): string {
  return `/academy/qa/${slug || contentSlug(question, id)}`;
}

export function articlePath(title: string, id: number, slug?: string): string {
  return `/academy/articles/${slug || contentSlug(title, id)}`;
}

export function coursePath(title: string, id: number, slug?: string): string {
  return `/academy/courses/${slug || contentSlug(title, id)}`;
}

export function courseLessonsPath(title: string, id: number, slug?: string): string {
  return `${coursePath(title, id, slug)}/lessons`;
}

export function lessonPath(
  courseTitle: string,
  courseId: number,
  lessonTitle: string,
  lessonId: number,
  courseSlug?: string,
  lessonSlug?: string,
): string {
  const courseSeg = courseSlug || contentSlug(courseTitle, courseId);
  const lessonSeg = lessonSlug || contentSlug(lessonTitle, lessonId);
  return `/academy/courses/${courseSeg}/lessons/${lessonSeg}`;
}

export function studyPath(
  courseTitle: string,
  courseId: number,
  lessonTitle: string,
  lessonId: number,
  courseSlug?: string,
  lessonSlug?: string,
): string {
  return `${lessonPath(courseTitle, courseId, lessonTitle, lessonId, courseSlug, lessonSlug)}/study`;
}
