import type { Metadata } from "next";
import Link from "next/link";
import {
  LayoutGrid,
  GraduationCap,
  Clock,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  ArrowRight,
  CalendarDays,
} from "lucide-react";
import { PageShell, Container, Breadcrumb } from "@academy/components/site/PageShell";
import { Tag } from "@academy/components/site/cards";
import { JsonLd } from "@academy/components/site/JsonLd";
import { FaqSections } from "@academy/components/site/FaqSections";
import { getFaqDetailSchemaAnswer } from "@academy/data/qa-faqs";
import { formatApproxMinutes, getPublishedFaqById, getPublishedFaqs } from "@academy/lib/academy-qa";
import { buildFAQPageSchema } from "@academy/lib/faq-schema";
import { typography } from "@academy/lib/typography";
import { cn } from "@academy/lib/utils";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const faq = await getPublishedFaqById(id);
  return {
    title: faq ? `${faq.question} — DFS Academy` : "Q&A — DFS Academy",
    description: faq?.answer ?? "DFSChainのよくある質問への回答です。",
  };
}

export default async function QADetailPage({ params }: PageProps) {
  const { id } = await params;
  const [faq, faqs] = await Promise.all([
    getPublishedFaqById(id),
    getPublishedFaqs(),
  ]);

  if (!faq) {
    return (
      <PageShell>
        <section className="py-12">
          <Container>
            <Breadcrumb
              items={[
                { label: "ホーム", to: "/" },
                { label: "Q&A", to: "/academy/qa" },
                { label: "見つかりません" },
              ]}
            />
            <h1 className={cn(typography.pageTitle, "text-foreground")}>Q&Aが見つかりません</h1>
            <p className="mt-4 text-muted-foreground">
              お探しの質問は存在しないか、移動した可能性があります。
            </p>
            <Link
              href="/academy/qa"
              className="mt-6 inline-flex items-center gap-2 text-primary font-medium hover:underline"
            >
              Q&A一覧に戻る <ArrowRight className="w-4 h-4" />
            </Link>
          </Container>
        </section>
      </PageShell>
    );
  }

  const faqSchema = buildFAQPageSchema([
    { question: faq.question, answer: getFaqDetailSchemaAnswer(faq) },
  ]);
  const related = faqs.filter((item) => item.id !== faq.id).slice(0, 4);

  return (
    <PageShell>
      <section className="py-10">
        <Container>
          <Breadcrumb
            items={[{ label: "ホーム", to: "/" }, { label: "Q&A", to: "/academy/qa" }, { label: faq.tag }]}
          />
          <div className="">
            <article itemScope itemType="https://schema.org/Question">
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">
                <div>
                  <h1
                    className={cn(typography.pageTitle, "text-foreground")}
                    itemProp="name"
                  >
                    {faq.question}
                  </h1>
                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    {(faq.tags.length ? faq.tags : faq.tag ? [faq.tag] : []).map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                    <span className="inline-flex items-center gap-2 text-[15px] text-muted-foreground">
                      <CalendarDays className="w-4 h-4 text-primary" /> 最終更新：{faq.updatedAt}
                    </span>
                  </div>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    {faq.content?.trim() ? (
                      <div
                        className="rich-html mt-6 space-y-4 text-foreground"
                        itemProp="text"
                        dangerouslySetInnerHTML={{ __html: faq.content }}
                      />
                    ) : (
                      <>
                        <p className="mt-6 text-[15px] text-foreground leading-relaxed whitespace-pre-line">
                          {faq.intro}
                        </p>
                        <div className="mt-10 border-t-2 border-border">
                          {faq.sections && <FaqSections sections={faq.sections} />}
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <aside className="bg-card border border-border rounded-2xl p-6 space-y-5 h-fit">
                  <div className="flex items-center gap-5">
                    <LayoutGrid className="w-5 h-5 text-primary" />
                    <span className="text-[15px] font-medium">{faq.tag}</span>
                  </div>
                  <div className="flex items-center gap-5">
                    <GraduationCap className="w-5 h-5 text-primary" />
                    <span className="text-[15px] font-medium">初心者向け</span>
                  </div>
                  <div className="flex items-center gap-5">
                    <Clock className="w-5 h-5 text-primary" />
                    <span className="text-[15px] font-medium">読了目安：{formatApproxMinutes(faq.readTime)}</span>
                  </div>
                </aside>
              </div>

              <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 border-b-2 border-border pb-10">
                <span className="text-[15px] text-foreground/80">この記事は役に立ちましたか？</span>
                <button className="inline-flex items-center gap-2 px-4 h-9 rounded-md border border-border text-[15px] text-primary hover:bg-primary-softer">
                  <ThumbsUp className="w-4 h-4" /> 役に立った
                </button>
                <button className="inline-flex items-center gap-2 px-4 h-9 rounded-md border border-border text-[15px] text-muted-foreground hover:bg-secondary">
                  <ThumbsDown className="w-4 h-4" /> 役に立たなかった
                </button>
              </div>
            </article>
          </div>

          <div className="mt-10">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between mb-6">
              <h2 className="text-[26px] sm:text-[28px] lg:text-[30px] font-bold">関連Q&A</h2>
              <a href="/academy/qa" className="text-[15px] text-primary inline-flex items-center gap-1.5">
                すべて見る <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {related.map((q) => (
                <a
                  key={q.id}
                  href={`/academy/qa/${q.id}`}
                  className="block bg-card border border-border rounded-xl p-5 hover:border-primary/40"
                >
                  <div className="flex items-start gap-2.5 mb-4">
                    <span className="w-6 h-6 rounded bg-primary text-primary-foreground flex items-center justify-center text-[12px] font-bold">
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
          </div>

          <div className="mt-8 bg-primary-softer/60 border border-primary-soft rounded-2xl px-4 sm:px-8 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8">
              <MessageCircle className="w-10 h-10 sm:w-12 sm:h-12 text-primary shrink-0" />
              <div>
                <div className="font-bold text-[26px] sm:text-[28px] lg:text-[30px]">他のQ&Aも見る</div>
                <p className="text-[15px]">
                  初心者から上級者まで、よくある質問をわかりやすく解説！
                </p>
              </div>
            </div>
            <a
              href="/academy/qa"
              className="inline-flex items-center justify-center gap-2 px-5 h-11 rounded-md bg-primary text-primary-foreground text-[15px] font-semibold w-full md:w-auto"
            >
              すべてのQ&Aを見る <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </Container>
      </section>

      <JsonLd data={faqSchema} />
    </PageShell>
  );
}
