import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "お問い合わせ — DFS Academy",
  description:
    "DFS Academyへのお問い合わせはこちらから。コース、Q&A、パートナーシップなどに関するご質問をお受けしています。",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
