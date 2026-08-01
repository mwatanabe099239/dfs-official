import {
  ArrowLeftRight,
  BookOpen,
  Box,
  FileText,
  Fuel,
  Rocket,
  Shield,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { unstable_noStore as noStore } from "next/cache";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { getDb } from "@academy/lib/firebase";
import { parseMinutesValue } from "@academy/lib/academy-qa";
import { assignUniqueSlugs, matchesSlugOrId } from "@academy/lib/academy-slug";

export const ACADEMY_ARTICLES_COLLECTION = "academy_articles";

export type AcademyArticle = {
  id: number;
  title: string;
  /** Title-based URL segment (assigned when loading published lists). */
  slug?: string;
  intro: string;
  tag: string;
  tags: string[];
  level: string;
  iconKey: string;
  readTime: number;
  updatedAt: string;
  content: string;
  featured: boolean;
  beginnerRecommended: boolean;
  relatedArticleIds: number[];
  sortOrder: number;
};

const ICON_MAP: Record<string, LucideIcon> = {
  rocket: Rocket,
  box: Box,
  wallet: Wallet,
  fuel: Fuel,
  shield: Shield,
  "file-text": FileText,
  "arrow-left-right": ArrowLeftRight,
  "book-open": BookOpen,
};

export function articleIcon(iconKey: string): LucideIcon {
  return ICON_MAP[iconKey] || BookOpen;
}

/** List cards: `5分で読める` */
export function formatArticleReadTime(minutes: number | string): string {
  return `${parseMinutesValue(minutes, 5)}分で読める`;
}

/** Detail meta: `完了目安 5分` */
export function formatArticleDuration(minutes: number | string): string {
  return `完了目安 ${parseMinutesValue(minutes, 5)}分`;
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

export function serializeArticleDoc(
  data: Record<string, unknown>,
): AcademyArticle | null {
  const numericId = Number(data.numericId);
  if (!Number.isInteger(numericId) || numericId < 1) return null;
  const title = String(data.title || "").trim();
  if (!title) return null;
  const tag = String(data.tag || "").trim();
  const tags = asStringArray(data.tags);

  return {
    id: numericId,
    title,
    intro: String(data.intro || ""),
    tag,
    tags: tags.length ? tags : tag ? [tag] : [],
    level: String(data.level || "初心者向け"),
    iconKey: String(data.iconKey || "book-open"),
    readTime: parseMinutesValue(data.readTime, 5),
    updatedAt: String(data.updatedAtDisplay || data.updatedAt || ""),
    content: String(data.content || ""),
    featured: Boolean(data.featured),
    beginnerRecommended: Boolean(data.beginnerRecommended),
    relatedArticleIds: asNumberArray(data.relatedArticleIds),
    sortOrder: Number(data.sortOrder) || numericId,
  };
}

export const FALLBACK_ARTICLES: AcademyArticle[] = [
  {
    id: 1,
    title: "DFSChainのはじめ方",
    intro: "初心者向けに、最初に知っておきたいポイントをわかりやすく解説",
    tag: "基礎知識",
    tags: ["基礎知識", "初心者向け"],
    level: "初心者向け",
    iconKey: "rocket",
    readTime: 5,
    updatedAt: "2024年6月1日",
    content:
      "<p>DFSChainは、高速・低コスト・安全性を兼ね備えた次世代のブロックチェーンです。このガイドでは、初心者の方が最初に知っておきたいポイントをステップごとに解説します。</p><h2>1. まず最初に知ること</h2><ul><li>DFSChainは、Web3アプリや暗号資産の利用をもっと身近にするブロックチェーンです。</li><li>高速な処理と低コストで、初心者でも安心して使えます。</li><li>独自のエコシステムで、さまざまなアプリやサービスが利用できます。</li></ul><h2>2. ウォレットを準備する</h2><ul><li>対応ウォレットをインストールまたは作成します。</li><li>ウォレットの秘密鍵やリカバリーフレーズは安全に保管しましょう。</li><li>少額のテストDFS（トークン）を入金すると、さまざまな機能が利用できます。</li></ul><h2>3. DFSを使ってみる</h2><ul><li>高速かつ安価で送金してみる</li><li>DApps（分散型アプリ）を利用してみる</li><li>ガス代の仕組みを確認する</li></ul>",
    featured: true,
    beginnerRecommended: true,
    relatedArticleIds: [2, 3, 4],
    sortOrder: 1,
  },
  {
    id: 2,
    title: "ブロックチェーンとは？",
    intro: "ブロックチェーンの基本的な仕組みをやさしく解説します。",
    tag: "基礎知識",
    tags: ["基礎知識", "初心者向け"],
    level: "初心者向け",
    iconKey: "box",
    readTime: 4,
    updatedAt: "2024年6月1日",
    content:
      "<p>ブロックチェーンは、取引データを分散して記録する仕組みです。</p><ul><li>取引はブロックにまとめられ、鎖のようにつながります</li><li>特定の管理者に依存しない分散型の仕組みです</li><li>DFSChainもこの技術をベースにしています</li></ul>",
    featured: false,
    beginnerRecommended: true,
    relatedArticleIds: [1, 3],
    sortOrder: 2,
  },
  {
    id: 3,
    title: "ウォレットの作り方",
    intro: "DFSChain対応ウォレットの作成手順を紹介します。",
    tag: "ウォレット",
    tags: ["ウォレット", "初心者向け"],
    level: "初心者向け",
    iconKey: "wallet",
    readTime: 6,
    updatedAt: "2024年6月1日",
    content:
      "<p>ウォレットは暗号資産を管理するための「お財布」です。</p><ul><li>対応ウォレットアプリをインストールする</li><li>新規ウォレットを作成する</li><li>シードフレーズを安全に保管する</li></ul>",
    featured: false,
    beginnerRecommended: true,
    relatedArticleIds: [1, 8],
    sortOrder: 3,
  },
  {
    id: 4,
    title: "ガス代の仕組み",
    intro: "ガス代とは何か、なぜ必要なのかをわかりやすく説明します。",
    tag: "ガス代",
    tags: ["ガス代", "基礎知識"],
    level: "初心者向け",
    iconKey: "fuel",
    readTime: 4,
    updatedAt: "2024年6月1日",
    content:
      "<p>ガス代は、ブロックチェーン上で取引を処理するための手数料です。</p><ul><li>送金やコントラクト実行時に発生します</li><li>ネットワークの混雑状況で変動することがあります</li><li>少額から試せるので初心者にも安心です</li></ul>",
    featured: false,
    beginnerRecommended: true,
    relatedArticleIds: [1, 6],
    sortOrder: 4,
  },
  {
    id: 5,
    title: "Web3セキュリティ入門",
    intro: "安全にWeb3を始めるための基本的な注意点をまとめました。",
    tag: "セキュリティ",
    tags: ["セキュリティ", "初心者向け"],
    level: "初心者向け",
    iconKey: "shield",
    readTime: 5,
    updatedAt: "2024年6月1日",
    content:
      "<p>Web3を安心して使うには、セキュリティの基本を押さえることが大切です。</p><ul><li>シードフレーズは誰にも共有しない</li><li>不審なリンクや偽サイトに注意する</li><li>少額から操作を練習する</li></ul>",
    featured: false,
    beginnerRecommended: false,
    relatedArticleIds: [3, 8],
    sortOrder: 5,
  },
  {
    id: 6,
    title: "トークンとガス代の基礎知識",
    intro: "トークンとガス代の関係を基礎から学びます。",
    tag: "基礎知識",
    tags: ["基礎知識", "ガス代"],
    level: "初心者向け",
    iconKey: "file-text",
    readTime: 6,
    updatedAt: "2024年6月1日",
    content:
      "<p>トークンはブロックチェーン上の資産です。ガス代の支払いに使われることもあり、DFSChainではDFSが中心的な役割を持ちます。</p>",
    featured: false,
    beginnerRecommended: false,
    relatedArticleIds: [2, 4],
    sortOrder: 6,
  },
  {
    id: 7,
    title: "ブリッジの使い方",
    intro: "他チェーンとの資産移動（ブリッジ）の基本を解説します。",
    tag: "ブリッジ",
    tags: ["ブリッジ", "使い方"],
    level: "中級者向け",
    iconKey: "arrow-left-right",
    readTime: 5,
    updatedAt: "2024年6月1日",
    content:
      "<p>ブリッジを使うと、異なるブロックチェーン間で資産を移動できます。</p><ul><li>対応ネットワークを確認する</li><li>手数料と所要時間を確認する</li><li>少額でテストしてから本格利用する</li></ul>",
    featured: false,
    beginnerRecommended: false,
    relatedArticleIds: [4, 8],
    sortOrder: 7,
  },
  {
    id: 8,
    title: "DFSChainウォレットの使い方",
    intro: "送受信や残高確認など、日常的なウォレット操作を紹介します。",
    tag: "使い方",
    tags: ["使い方", "ウォレット"],
    level: "初心者向け",
    iconKey: "wallet",
    readTime: 7,
    updatedAt: "2024年6月1日",
    content:
      "<p>ウォレット作成後は、送受信や残高確認などの基本操作を覚えておくと安心です。</p><ul><li>アドレスを確認して受け取る</li><li>ガス代を含めて送金する</li><li>取引履歴を確認する</li></ul>",
    featured: false,
    beginnerRecommended: false,
    relatedArticleIds: [1, 3],
    sortOrder: 8,
  },
];

export async function fetchPublishedArticles(): Promise<AcademyArticle[]> {
  noStore();
  const snap = await getDocs(
    query(
      collection(getDb(), ACADEMY_ARTICLES_COLLECTION),
      where("published", "==", true),
    ),
  );

  const articles: AcademyArticle[] = [];
  for (const doc of snap.docs) {
    const article = serializeArticleDoc(doc.data() as Record<string, unknown>);
    if (article) articles.push(article);
  }

  return articles.sort((a, b) => {
    if (a.sortOrder !== b.sortOrder) return a.sortOrder - b.sortOrder;
    return a.id - b.id;
  });
}

export async function fetchPublishedArticleById(
  id: string | number,
): Promise<AcademyArticle | null> {
  const numericId = typeof id === "string" ? Number.parseInt(id, 10) : id;
  if (!Number.isInteger(numericId) || numericId < 1) return null;

  const snap = await getDocs(
    query(
      collection(getDb(), ACADEMY_ARTICLES_COLLECTION),
      where("numericId", "==", numericId),
      where("published", "==", true),
      limit(1),
    ),
  );
  if (snap.empty) return null;
  return serializeArticleDoc(snap.docs[0]!.data() as Record<string, unknown>);
}

function withArticleSlugs(articles: AcademyArticle[]): AcademyArticle[] {
  const slugs = assignUniqueSlugs(articles, (item) => item.title);
  return articles.map((article) => ({ ...article, slug: slugs.get(article.id) }));
}

export async function getPublishedArticles(): Promise<AcademyArticle[]> {
  try {
    const articles = await fetchPublishedArticles();
    if (articles.length > 0) return withArticleSlugs(articles);
    console.warn(
      "[academy-articles] Firestore returned no published articles; using static fallback.",
    );
    return withArticleSlugs(FALLBACK_ARTICLES);
  } catch (error) {
    console.error("[academy-articles] Failed to load articles:", error);
    return withArticleSlugs(FALLBACK_ARTICLES);
  }
}

/** Resolve by title slug or legacy numeric id. */
export async function getPublishedArticleBySlug(
  slug: string | number,
): Promise<AcademyArticle | null> {
  const param = String(slug);
  const articles = await getPublishedArticles();
  return (
    articles.find((article) =>
      matchesSlugOrId(param, article.title, article.id, article.slug),
    ) ?? null
  );
}

/** @deprecated Prefer getPublishedArticleBySlug. */
export async function getPublishedArticleById(
  id: string | number,
): Promise<AcademyArticle | null> {
  return getPublishedArticleBySlug(id);
}

export async function getBeginnerArticles(limitCount = 4): Promise<AcademyArticle[]> {
  const articles = await getPublishedArticles();
  const beginner = articles.filter((item) => item.beginnerRecommended);
  return (beginner.length ? beginner : articles).slice(0, limitCount);
}

export const ARTICLE_FILTER_TABS = [
  "すべて",
  "基礎知識",
  "初心者向け",
  "ウォレット",
  "使い方",
  "ガス代",
  "セキュリティ",
  "ブリッジ",
] as const;
