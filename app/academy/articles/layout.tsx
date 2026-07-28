import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DFSChain 記事一覧 — DFS Academy",
  description: "初心者から上級者まで学べる記事をまとめました。",
};

export default function ArticlesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
