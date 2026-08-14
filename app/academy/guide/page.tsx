import type { Metadata } from "next";

import { GuidesBrowse } from "@academy/components/site/GuidesBrowse";
import { PageShell } from "@academy/components/site/PageShell";
import { getAcademyI18n } from "@academy/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getAcademyI18n();
  return {
    title: t("ガイド — DFS Academy"),
    description: t("DFSChainの使い方をステップで学べるガイド一覧です。"),
  };
}

export default async function GuidesPage() {
  return (
    <PageShell hidePromo>
      <GuidesBrowse />
    </PageShell>
  );
}
