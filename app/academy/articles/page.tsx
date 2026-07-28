import type { Metadata } from "next";
import { PageShell, Container, Breadcrumb } from "@academy/components/site/PageShell";
import { StatsSection } from "@academy/components/site/StatsSection";
import { ArticlesBrowse } from "@academy/components/site/ArticlesBrowse";
import { getPublishedArticles } from "@academy/lib/academy-articles";
import { typography } from "@academy/lib/typography";
import { cn } from "@academy/lib/utils";

export const metadata: Metadata = {
  title: "DFSChain 記事 — DFS Academy",
  description: "初心者から上級者まで学べる記事をまとめました。",
};

export default async function ArticlesPage() {
  const articles = await getPublishedArticles();

  return (
    <PageShell>
      <section className="py-12">
        <Container>
          <Breadcrumb items={[{ label: "ホーム", to: "/" }, { label: "記事" }]} />
          <h1 className={cn(typography.pageTitle, "text-foreground")}>
            <span className="text-primary">DFSChain</span> 記事
          </h1>
          <p className={cn("mt-5", typography.pageLead)}>
            初心者から上級者まで学べる記事をまとめました
          </p>
          <ArticlesBrowse articles={articles} />
        </Container>
      </section>
      <StatsSection />
    </PageShell>
  );
}
