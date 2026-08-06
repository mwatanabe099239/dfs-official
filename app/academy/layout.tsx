import type { ReactNode } from "react";
import type { Metadata } from "next";

import "../../src/academy/styles.css";

import { AcademyLocaleProvider } from "@academy/i18n/AcademyLocaleProvider";
import { ACADEMY_HTML_LANG } from "@academy/i18n/locales";
import { getAcademyLocale } from "@academy/i18n/server";

const META: Record<string, { title: string; description: string }> = {
  ja: {
    title: "DFS Academy — DFSChainを学ぶ Web3学習プラットフォーム",
    description:
      "DFSChainの基礎から応用まで、初心者にもわかりやすく学べるWeb3学習プラットフォーム。",
  },
  en: {
    title: "DFS Academy — Learn DFSChain, the Web3 learning platform",
    description:
      "A Web3 learning platform covering DFSChain from the basics through to advanced topics, written to be clear for beginners.",
  },
  ko: {
    title: "DFS Academy — DFSChain을 배우는 Web3 학습 플랫폼",
    description:
      "DFSChain의 기초부터 응용까지, 초보자도 알기 쉽게 배울 수 있는 Web3 학습 플랫폼입니다.",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getAcademyLocale();
  return META[locale] ?? META.ja!;
}

// Academy pages read live Firestore content (Q&A, articles, courses).
// Without this, Next.js statically prerenders them at build time and new
// admin-created docs never appear until the next redeploy.
export const dynamic = "force-dynamic";

export default async function AcademyLayout({ children }: { children: ReactNode }) {
  const locale = await getAcademyLocale();

  return (
    <div className="academy-scope min-h-screen" lang={ACADEMY_HTML_LANG[locale]}>
      {/* Inter + Noto Sans JP: only loaded on /academy routes so the rest
          of the site keeps its own font stack. `next/head` is not
          available in App Router layouts, but plain <link> tags in the
          rendered tree work fine for stylesheets. */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Noto+Sans+JP:wght@400;500;600;700;800&family=Noto+Sans+KR:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
      />
      <AcademyLocaleProvider locale={locale}>{children}</AcademyLocaleProvider>
    </div>
  );
}
