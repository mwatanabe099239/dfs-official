import {
  ArrowLeftRight,
  BookOpen,
  Box,
  Code2,
  Cuboid,
  DollarSign,
  FileCode,
  Flag,
  GraduationCap,
  PieChart,
  Sprout,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { unstable_noStore as noStore } from "next/cache";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { getDb } from "@academy/lib/firebase";
import { formatApproxMinutes, parseMinutesValue } from "@academy/lib/academy-qa";

export const ACADEMY_COURSES_COLLECTION = "academy_courses";
export const ACADEMY_LESSONS_COLLECTION = "academy_lessons";

export { formatApproxMinutes };

export type AcademyCourse = {
  id: number;
  title: string;
  description: string;
  tags: string[];
  level: string;
  audienceLabel: string;
  categoryLabel: string;
  durationMinutes: number;
  iconKey: string;
  content: string;
  relatedCourseIds: number[];
  sortOrder: number;
};

export type AcademyLesson = {
  id: number;
  courseId: number;
  title: string;
  description: string;
  durationMinutes: number;
  iconKey: string;
  featured: boolean;
  content: string;
  studyTitle: string;
  studyDescription: string;
  studyContent: string;
  sortOrder: number;
};

const ICON_MAP: Record<string, LucideIcon> = {
  sprout: Sprout,
  box: Box,
  "file-code": FileCode,
  wallet: Wallet,
  "pie-chart": PieChart,
  "code-2": Code2,
  cuboid: Cuboid,
  "dollar-sign": DollarSign,
  "arrow-left-right": ArrowLeftRight,
  flag: Flag,
  "book-open": BookOpen,
  "graduation-cap": GraduationCap,
};

export function courseIcon(iconKey: string): LucideIcon {
  return ICON_MAP[iconKey] || BookOpen;
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.map((item) => String(item ?? "").trim()).filter(Boolean);
}

function asNumberArray(value: unknown): number[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => Number(item))
    .filter((n) => Number.isInteger(n) && n > 0);
}

function resolveDurationMinutes(
  data: Record<string, unknown>,
  fallback: number,
): number {
  if (
    data.durationMinutes !== undefined &&
    data.durationMinutes !== null &&
    data.durationMinutes !== ""
  ) {
    return parseMinutesValue(data.durationMinutes, fallback);
  }
  return parseMinutesValue(data.durationLabel, fallback);
}

export function serializeCourseDoc(
  data: Record<string, unknown>,
): AcademyCourse | null {
  const numericId = Number(data.numericId);
  if (!Number.isInteger(numericId) || numericId < 1) return null;
  const title = String(data.title || "").trim();
  if (!title) return null;

  return {
    id: numericId,
    title,
    description: String(data.description || ""),
    tags: asStringArray(data.tags),
    level: String(data.level || ""),
    audienceLabel: String(data.audienceLabel || ""),
    categoryLabel: String(data.categoryLabel || ""),
    durationMinutes: resolveDurationMinutes(data, 45),
    iconKey: String(data.iconKey || "sprout"),
    content: String(data.content || ""),
    relatedCourseIds: asNumberArray(data.relatedCourseIds),
    sortOrder: Number(data.sortOrder) || numericId,
  };
}

export function serializeLessonDoc(
  data: Record<string, unknown>,
): AcademyLesson | null {
  const numericId = Number(data.numericId);
  const courseId = Number(data.courseNumericId);
  if (!Number.isInteger(numericId) || numericId < 1) return null;
  if (!Number.isInteger(courseId) || courseId < 1) return null;
  const title = String(data.title || "").trim();
  if (!title) return null;

  return {
    id: numericId,
    courseId,
    title,
    description: String(data.description || ""),
    durationMinutes: resolveDurationMinutes(data, 6),
    iconKey: String(data.iconKey || "book-open"),
    featured: Boolean(data.featured),
    content: String(data.content || ""),
    studyTitle: String(data.studyTitle || data.title || ""),
    studyDescription: String(data.studyDescription || data.description || ""),
    studyContent: String(data.studyContent || ""),
    sortOrder: Number(data.sortOrder) || numericId,
  };
}

/** Static fallback matching previous hardcoded Academy course list. */
export const FALLBACK_COURSES: AcademyCourse[] = [
  {
    id: 1,
    title: "DFSChain入門コース",
    description:
      "DFSChainの概要や特徴、使い方の基本を学びます。初めての方に最適なコースです。",
    tags: ["初心者向け", "入門"],
    level: "初級",
    audienceLabel: "初心者向け",
    categoryLabel: "基礎",
    durationMinutes: 45,
    iconKey: "sprout",
    content:
      "<h2>このコースで学べること</h2><ul><li>DFSChainの基本</li><li>ウォレットの使い方</li><li>ガス代の仕組み</li><li>はじめての活用</li></ul><p>DFSChainの基本から、ウォレットの使い方、ガス代の仕組み、エコシステムの始め方までをやさしく学べる入門コースです。</p>",
    relatedCourseIds: [2, 3, 4],
    sortOrder: 1,
  },
  {
    id: 2,
    title: "ブロックチェーン基礎コース",
    description:
      "ブロックチェーンの仕組みや構造、重要な用語をわかりやすく解説します。",
    tags: ["基礎知識", "理論"],
    level: "初級〜中級",
    audienceLabel: "基礎知識",
    categoryLabel: "理論",
    durationMinutes: 60,
    iconKey: "box",
    content:
      "<p>ブロックチェーンの仕組みや構造、重要な用語をわかりやすく解説します。</p>",
    relatedCourseIds: [1, 3],
    sortOrder: 2,
  },
  {
    id: 3,
    title: "スマートコントラクト入門",
    description:
      "スマートコントラクトの基本と、DFSChainでの作成・デプロイ方法を学びます。",
    tags: ["基礎知識", "実践"],
    level: "中級",
    audienceLabel: "基礎知識",
    categoryLabel: "実践",
    durationMinutes: 90,
    iconKey: "file-code",
    content:
      "<p>スマートコントラクトの基本と、DFSChainでの作成・デプロイ方法を学びます。</p>",
    relatedCourseIds: [1, 2],
    sortOrder: 3,
  },
  {
    id: 4,
    title: "DFSChainウォレット活用コース",
    description: "ウォレットの作成から送受信、管理方法までを実践的に学びます。",
    tags: ["初心者向け", "実践"],
    level: "初級",
    audienceLabel: "初心者向け",
    categoryLabel: "実践",
    durationMinutes: 30,
    iconKey: "wallet",
    content: "<p>ウォレットの作成から送受信、管理方法までを実践的に学びます。</p>",
    relatedCourseIds: [1, 2],
    sortOrder: 4,
  },
  {
    id: 5,
    title: "DeFiとDFSChainの活用",
    description: "DeFiの基礎とDFSChain上での活用事例を学びます。",
    tags: ["中級者向け", "応用"],
    level: "中級〜上級",
    audienceLabel: "中級者向け",
    categoryLabel: "応用",
    durationMinutes: 75,
    iconKey: "pie-chart",
    content: "<p>DeFiの基礎とDFSChain上での活用事例を学びます。</p>",
    relatedCourseIds: [3, 6],
    sortOrder: 5,
  },
  {
    id: 6,
    title: "開発者向け：DFSChain開発コース",
    description: "DFSChain上でのDApp開発やAPIの利用方法を学ぶ開発者向けコースです。",
    tags: ["上級者向け", "開発"],
    level: "上級",
    audienceLabel: "上級者向け",
    categoryLabel: "開発",
    durationMinutes: 120,
    iconKey: "code-2",
    content: "<p>DFSChain上でのDApp開発やAPIの利用方法を学ぶ開発者向けコースです。</p>",
    relatedCourseIds: [3, 5],
    sortOrder: 6,
  },
];

export const FALLBACK_LESSONS: AcademyLesson[] = [
  {
    id: 1,
    courseId: 1,
    title: "DFSChainとは？",
    description: "DFSChainの概要と、Web3における役割を学びます。",
    durationMinutes: 6,
    iconKey: "cuboid",
    featured: true,
    content:
      "<p>DFSChainは、高速・低コスト・安全性を兼ね備えた次世代のブロックチェーンです。</p><h2>このレッスンのポイント</h2><ul><li>DFSChainの概要</li><li>Web3における役割</li><li>主な特徴</li></ul>",
    studyTitle: "Web3の概要",
    studyDescription: "DFSChainとWeb3の関係を学びます。",
    studyContent:
      "<p>このレッスンでは、DFSChainがどのようなブロックチェーンなのかを学びます。</p>",
    sortOrder: 1,
  },
  {
    id: 2,
    courseId: 1,
    title: "ウォレットの作り方",
    description: "DFSChain対応ウォレットの作成方法を学びます。",
    durationMinutes: 8,
    iconKey: "wallet",
    featured: false,
    content: "<p>DFSChain対応ウォレットの作成方法を学びます。</p>",
    studyTitle: "ウォレットの作り方",
    studyDescription: "ウォレット作成のステップを確認します。",
    studyContent: "<p>ウォレットアプリをインストールし、新規作成の手順を進めます。</p>",
    sortOrder: 2,
  },
  {
    id: 3,
    courseId: 1,
    title: "ガス代の基本",
    description: "ガス代の仕組みや、支払いの流れを理解します。",
    durationMinutes: 7,
    iconKey: "dollar-sign",
    featured: false,
    content: "<p>ガス代の仕組みや、支払いの流れを理解します。</p>",
    studyTitle: "ガス代の基本",
    studyDescription: "手数料の考え方を学びます。",
    studyContent: "<p>ガス代は取引処理のための手数料です。</p>",
    sortOrder: 3,
  },
  {
    id: 4,
    courseId: 1,
    title: "トランザクションの仕組み",
    description: "トランザクションの流れと確認方法を学びます。",
    durationMinutes: 8,
    iconKey: "arrow-left-right",
    featured: false,
    content: "<p>トランザクションの流れと確認方法を学びます。</p>",
    studyTitle: "トランザクションの仕組み",
    studyDescription: "送金の流れを確認します。",
    studyContent: "<p>トランザクションはブロックチェーン上の取引記録です。</p>",
    sortOrder: 4,
  },
  {
    id: 5,
    courseId: 1,
    title: "DFSの使い道",
    description: "DFSトークンの主な使い道と活用例を紹介します。",
    durationMinutes: 8,
    iconKey: "pie-chart",
    featured: false,
    content: "<p>DFSトークンの主な使い道と活用例を紹介します。</p>",
    studyTitle: "DFSの使い道",
    studyDescription: "トークンの用途を学びます。",
    studyContent: "<p>DFSは決済・ガス代・ステーキングなどに使えます。</p>",
    sortOrder: 5,
  },
  {
    id: 6,
    courseId: 1,
    title: "はじめての活用ガイド",
    description: "はじめてのステップを実践し、エコシステムを体験します。",
    durationMinutes: 8,
    iconKey: "flag",
    featured: false,
    content: "<p>はじめてのステップを実践し、エコシステムを体験します。</p>",
    studyTitle: "はじめての活用ガイド",
    studyDescription: "最初の一歩を踏み出します。",
    studyContent: "<p>学んだ内容を活かして、小さな操作から始めましょう。</p>",
    sortOrder: 6,
  },
];

export async function fetchPublishedCourses(): Promise<AcademyCourse[]> {
  noStore();
  const snap = await getDocs(
    query(
      collection(getDb(), ACADEMY_COURSES_COLLECTION),
      where("published", "==", true),
    ),
  );

  const courses: AcademyCourse[] = [];
  for (const doc of snap.docs) {
    const course = serializeCourseDoc(doc.data() as Record<string, unknown>);
    if (course) courses.push(course);
  }

  return courses.sort((a, b) => {
    if (a.sortOrder !== b.sortOrder) return a.sortOrder - b.sortOrder;
    return a.id - b.id;
  });
}

export async function fetchPublishedCourseById(
  id: string | number,
): Promise<AcademyCourse | null> {
  const numericId = typeof id === "string" ? Number.parseInt(id, 10) : id;
  if (!Number.isInteger(numericId) || numericId < 1) return null;

  const snap = await getDocs(
    query(
      collection(getDb(), ACADEMY_COURSES_COLLECTION),
      where("numericId", "==", numericId),
      where("published", "==", true),
      limit(1),
    ),
  );
  if (snap.empty) return null;
  return serializeCourseDoc(snap.docs[0]!.data() as Record<string, unknown>);
}

export async function fetchPublishedLessonsForCourse(
  courseId: string | number,
): Promise<AcademyLesson[]> {
  const numericId =
    typeof courseId === "string" ? Number.parseInt(courseId, 10) : courseId;
  if (!Number.isInteger(numericId) || numericId < 1) return [];

  const snap = await getDocs(
    query(
      collection(getDb(), ACADEMY_LESSONS_COLLECTION),
      where("courseNumericId", "==", numericId),
      where("published", "==", true),
    ),
  );

  const lessons: AcademyLesson[] = [];
  for (const doc of snap.docs) {
    const lesson = serializeLessonDoc(doc.data() as Record<string, unknown>);
    if (lesson) lessons.push(lesson);
  }

  return lessons.sort((a, b) => {
    if (a.sortOrder !== b.sortOrder) return a.sortOrder - b.sortOrder;
    return a.id - b.id;
  });
}

export async function fetchPublishedLesson(
  courseId: string | number,
  lessonId: string | number,
): Promise<AcademyLesson | null> {
  const courseNumericId =
    typeof courseId === "string" ? Number.parseInt(courseId, 10) : courseId;
  const lessonNumericId =
    typeof lessonId === "string" ? Number.parseInt(lessonId, 10) : lessonId;
  if (!Number.isInteger(courseNumericId) || courseNumericId < 1) return null;
  if (!Number.isInteger(lessonNumericId) || lessonNumericId < 1) return null;

  const snap = await getDocs(
    query(
      collection(getDb(), ACADEMY_LESSONS_COLLECTION),
      where("courseNumericId", "==", courseNumericId),
      where("numericId", "==", lessonNumericId),
      where("published", "==", true),
      limit(1),
    ),
  );
  if (snap.empty) return null;
  return serializeLessonDoc(snap.docs[0]!.data() as Record<string, unknown>);
}

export async function getPublishedCourses(): Promise<AcademyCourse[]> {
  try {
    const courses = await fetchPublishedCourses();
    if (courses.length > 0) return courses;
    console.warn(
      "[academy-courses] Firestore returned no published courses; using static fallback.",
    );
    return FALLBACK_COURSES;
  } catch (error) {
    console.error("[academy-courses] Failed to load courses:", error);
    return FALLBACK_COURSES;
  }
}

export async function getPublishedCourseById(
  id: string | number,
): Promise<AcademyCourse | null> {
  try {
    const course = await fetchPublishedCourseById(id);
    if (course) return course;
  } catch (error) {
    console.error("[academy-courses] Failed to load course:", error);
  }
  const numericId = typeof id === "string" ? Number.parseInt(id, 10) : id;
  return FALLBACK_COURSES.find((item) => item.id === numericId) ?? null;
}

export async function getPublishedLessonsForCourse(
  courseId: string | number,
): Promise<AcademyLesson[]> {
  const numericId =
    typeof courseId === "string" ? Number.parseInt(courseId, 10) : courseId;
  try {
    const lessons = await fetchPublishedLessonsForCourse(courseId);
    if (lessons.length > 0) return lessons;
  } catch (error) {
    console.error("[academy-courses] Failed to load lessons:", error);
  }
  return FALLBACK_LESSONS.filter((item) => item.courseId === numericId);
}

export async function getPublishedLesson(
  courseId: string | number,
  lessonId: string | number,
): Promise<AcademyLesson | null> {
  try {
    const lesson = await fetchPublishedLesson(courseId, lessonId);
    if (lesson) return lesson;
  } catch (error) {
    console.error("[academy-courses] Failed to load lesson:", error);
  }
  const cId = typeof courseId === "string" ? Number.parseInt(courseId, 10) : courseId;
  const lId = typeof lessonId === "string" ? Number.parseInt(lessonId, 10) : lessonId;
  return (
    FALLBACK_LESSONS.find((item) => item.courseId === cId && item.id === lId) ??
    null
  );
}

export const RICH_HTML_CLASS =
  "space-y-4 text-[15px] leading-relaxed text-foreground [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:border-l-4 [&_h2]:border-primary [&_h2]:pl-3 [&_h2]:text-[22px] [&_h2]:font-bold [&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:text-[18px] [&_h3]:font-semibold [&_p]:text-foreground/90 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-5 [&_a]:text-primary [&_a]:underline [&_strong]:font-semibold";
