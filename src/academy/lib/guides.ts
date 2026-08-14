import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  CircleHelp,
  GraduationCap,
  Route,
} from "lucide-react";

/**
 * Academy how-to guides catalog.
 * Keep this list as the single source for `/academy/guide`.
 */
export type AcademyGuide = {
  /** Display number, e.g. "01". */
  n: string;
  /** Japanese master title (i18n key). */
  title: string;
  /** Category name (i18n key), matches GUIDE_CATEGORIES. */
  category: string;
  /** Short tag (i18n key). */
  tag: string;
  /** Short Japanese blurb (i18n key). */
  description: string;
  /** Approx. time (i18n key). */
  duration: string;
  /** Difficulty label (i18n key). */
  level: string;
  /**
   * URL segment under `/academy/guide/`.
   * Omit until the detail page exists.
   */
  slug?: string;
};

export type GuideCategory = {
  name: string;
  description: string;
  icon: LucideIcon;
};

export const GUIDE_CATEGORIES: GuideCategory[] = [
  {
    name: "初めての方",
    description: "まず何をすればよいか知りたい方",
    icon: GraduationCap,
  },
  {
    name: "基本操作",
    description: "MetaFaceやアプリの使い方を知りたい方",
    icon: BookOpen,
  },
  {
    name: "目的別ガイド",
    description: "自分に合った学び方を見つけたい方",
    icon: Route,
  },
  {
    name: "困ったとき",
    description: "問題の解決方法をすぐに探したい方",
    icon: CircleHelp,
  },
];

export const ACADEMY_GUIDES: AcademyGuide[] = [
  {
    n: "01",
    title: "DFS Academyの使い方",
    category: "初めての方",
    tag: "入門",
    description:
      "記事・コース・Q&Aの違いと、目的に合った学び方をわかりやすく案内します。",
    duration: "約3分",
    level: "かんたん",
  },
  {
    n: "02",
    title: "MetaFaceの登録方法",
    category: "初めての方",
    tag: "アカウント",
    description:
      "メールアドレスからMetaFaceを作成し、DFSChainを使い始めるまでの手順です。",
    duration: "約5分",
    level: "かんたん",
    slug: "metaface",
  },
  {
    n: "03",
    title: "DFSChainの基本を知る",
    category: "基本操作",
    tag: "基礎知識",
    description:
      "DFSChainとは何か、一般的なブロックチェーンとの違いを初心者向けに説明します。",
    duration: "約8分",
    level: "初級",
  },
  {
    n: "04",
    title: "アプリの始め方・使い方",
    category: "基本操作",
    tag: "実践",
    description:
      "MetaFaceで対応アプリに接続し、サービスを利用する基本の流れを学びます。",
    duration: "約6分",
    level: "初級",
  },
  {
    n: "05",
    title: "目的から学び方を探す",
    category: "目的別ガイド",
    tag: "学習案内",
    description:
      "利用者・企業・投資家・開発者など、あなたの目的に合う学習ルートを紹介します。",
    duration: "約4分",
    level: "すべて",
  },
  {
    n: "06",
    title: "よくある問題と解決方法",
    category: "困ったとき",
    tag: "サポート",
    description:
      "登録、ログイン、接続、表示などで困ったときの確認方法をまとめています。",
    duration: "約7分",
    level: "かんたん",
  },
];

export function guidePath(slug: string): string {
  return `/academy/guide/${slug}`;
}
