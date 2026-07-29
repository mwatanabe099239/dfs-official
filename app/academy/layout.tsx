import type { ReactNode } from "react";
import type { Metadata } from "next";

import "../../src/academy/styles.css";

export const metadata: Metadata = {
  title: "DFS Academy — DFSChainを学ぶ Web3学習プラットフォーム",
  description:
    "DFSChainの基礎から応用まで、初心者にもわかりやすく学べるWeb3学習プラットフォーム。",
};

// Academy pages read live Firestore content (Q&A, articles, courses).
// Without this, Next.js statically prerenders them at build time and new
// admin-created docs never appear until the next redeploy.
export const dynamic = "force-dynamic";

export default function AcademyLayout({ children }: { children: ReactNode }) {
  return (
    <div className="academy-scope min-h-screen">
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
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Noto+Sans+JP:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
      />
      {children}
    </div>
  );
}
