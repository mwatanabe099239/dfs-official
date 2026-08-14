import type { Metadata } from "next";

import GuidePage from "@metaface-guide/GuidePage";
import { getAcademyLocale } from "@academy/i18n/server";

const META: Record<string, Metadata> = {
  ja: {
    title: "MetaFace 登録ガイド — DFS Academy",
    description: "約3分で完了するMetaFaceの登録方法をご案内します。",
  },
  en: {
    title: "MetaFace Registration Guide — DFS Academy",
    description: "Create your MetaFace account in about 3 minutes.",
  },
  ko: {
    title: "MetaFace 가입 가이드 — DFS Academy",
    description: "약 3분이면 완료되는 MetaFace 가입 방법을 안내합니다.",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getAcademyLocale();
  return META[locale] ?? META.ja!;
}

export default async function MetafaceGuidePage() {
  const locale = await getAcademyLocale();
  return <GuidePage lang={locale} />;
}
