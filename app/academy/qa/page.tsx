import type { Metadata } from "next";
import {
  MessageCircle,
  GraduationCap,
  RefreshCw,
  ArrowRight,
} from "lucide-react";
import { PageShell, Container } from "@academy/components/site/PageShell";
import { Tag } from "@academy/components/site/cards";
import { JsonLd } from "@academy/components/site/JsonLd";
import { QaBrowse } from "@academy/components/site/QaBrowse";
import { getPublishedFaqs } from "@academy/lib/academy-qa";
import { buildFAQPageSchema } from "@academy/lib/faq-schema";
import { typography } from "@academy/lib/typography";
import { cn } from "@academy/lib/utils";

export const metadata: Metadata = {
  title: "DFSChain Q&A — DFS Academy",
  description: "DFSChainのよくある質問を初心者向けにわかりやすくまとめました。",
};

export default async function QAPage() {
  const faqs = await getPublishedFaqs();
  const faqSchema = buildFAQPageSchema(
    faqs.map((faq) => ({ question: faq.question, answer: faq.answer })),
  );
  const popularIds = [2, 4, 3];
  const popular = popularIds
    .map((id) => faqs.find((faq) => faq.id === id))
    .filter((faq): faq is NonNullable<typeof faq> => Boolean(faq));

  return (
    <PageShell>
      <section className="py-10">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 mb-2">
            <div className="mt-6">
              <h1 className={cn(typography.pageTitle, "text-foreground")}>
                <span className="text-primary">DFSChain</span> Q&A
              </h1>
              <p className={cn("mt-5", typography.pageLead)}>
                初心者向けによくある質問をわかりやすくまとめました
              </p>
            </div>
            <aside className="bg-card border border-border rounded-2xl p-6 space-y-5 shadow-md">
              {[
                {
                  icon: <MessageCircle className="w-5 h-5" />,
                  t: "公開Q&A数",
                  v: String(faqs.length),
                },
                {
                  icon: <GraduationCap className="w-5 h-5" />,
                  t: "初心者向け",
                  v: "はじめての方でも安心",
                },
                {
                  icon: <RefreshCw className="w-5 h-5" />,
                  t: "更新中",
                  v: "定期的に最新情報を追加",
                },
              ].map((it, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-4 ${i !== 2 ? " border-b border-border pb-4" : "pb-0"}`}
                >
                  <div className="w-12 h-12 rounded-full bg-primary-softer text-primary flex items-center justify-center">
                    {it.icon}
                  </div>
                  <div>
                    <div className="text-[13px] text-muted-foreground">{it.t}</div>
                    <div className="text-[16px] text-foreground">{it.v}</div>
                  </div>
                </div>
              ))}
            </aside>
          </div>

          <QaBrowse faqs={faqs} />
        </Container>
      </section>

      {popular.length > 0 ? (
        <section className="py-10 bg-secondary/40">
          <Container>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between mb-6">
              <h2 className="text-[26px] sm:text-[28px] lg:text-[30px] font-bold flex items-center gap-2">
                <span className="text-primary">★</span> 人気のQ&A
              </h2>
              <a href="/academy/qa" className="text-[13px] text-primary inline-flex items-center gap-1.5">
                すべて見る <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {popular.map((q) => (
                <a
                  key={q.id}
                  href={`/academy/qa/${q.id}`}
                  className="block bg-card border border-border rounded-xl py-5 px-6 hover:border-primary/40 group relative"
                >
                  <div className="flex items-start gap-3 mb-5">
                    <span className="w-7 h-7 mt-1 rounded-md bg-primary text-primary-foreground flex items-center justify-center text-[13px] font-bold">
                      Q
                    </span>
                    <h3 className={cn(typography.cardTitleMd, "")}>{q.question}</h3>
                  </div>
                  <div className="flex items-center justify-between">
                    <Tag>{q.tag}</Tag>
                    <ArrowRight className="w-4 h-4 text-primary" />
                  </div>
                </a>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <JsonLd data={faqSchema} />
    </PageShell>
  );
}
