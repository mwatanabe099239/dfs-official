"use client";

import { useMemo, useState } from "react";
import {
  ChevronRight,
  Clock3,
  Search,
  Sparkles,
  Target,
} from "lucide-react";

import { GuideIllustration } from "@academy/components/site/GuideIllustration";
import { Badge } from "@academy/components/ui/badge";
import { Button } from "@academy/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@academy/components/ui/card";
import { Input } from "@academy/components/ui/input";
import { useAcademyI18n } from "@academy/i18n/AcademyLocaleProvider";
import {
  ACADEMY_GUIDES,
  GUIDE_CATEGORIES,
  guidePath,
} from "@academy/lib/guides";
import { cn } from "@academy/lib/utils";

const wrap =
  "mx-auto w-[min(1140px,calc(100%-48px))] max-md:w-[min(620px,calc(100%-28px))]";

const FEATURES = [
  "順番どおりに進められる",
  "画像つきでわかりやすい",
  "初心者向けの簡単な説明",
  "目的別にすぐ探せる",
] as const;

export function GuidesBrowse() {
  const { t, path } = useAcademyI18n();
  const [selected, setSelected] = useState("すべて");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ACADEMY_GUIDES.filter((guide) => {
      if (selected !== "すべて" && guide.category !== selected) return false;
      if (!q) return true;
      const haystack = `${t(guide.title)} ${t(guide.description)}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [selected, query, t]);

  const choose = (name: string) => {
    setSelected(name);
    document.getElementById("guides")?.scrollIntoView({ behavior: "smooth" });
  };

  const starter = ACADEMY_GUIDES.find((guide) => guide.slug === "metaface");

  return (
    <div className="bg-background text-foreground">
      <div className="flex min-h-12 items-center justify-center gap-3 bg-secondary px-4 text-sm text-[#37403a] max-md:text-center max-md:text-xs">
        <Sparkles className="size-4 shrink-0 text-primary" />
        <span>{t("DFSChainを、もっと簡単に。迷ったときはガイドから始めましょう。")}</span>
        <a
          className="ml-8 font-extrabold text-primary max-md:ml-0"
          href="#guides"
        >
          {t("ガイドを見る")} →
        </a>
      </div>

      <section
        className={cn(
          wrap,
          "grid min-h-[305px] grid-cols-[1.45fr_1fr] items-center max-md:min-h-[430px] max-md:grid-cols-1",
        )}
        id="guide"
      >
        <div>
          <div className="mb-9 text-[13px] text-[#737873]">
            <a href={path("/academy")} className="text-primary hover:underline">
              {t("ホーム")}
            </a>
            <b className="mx-3.5 font-normal text-[#b3b6b3]">/</b>
            {t("ガイド")}
          </div>
          <h1 className="mb-5 text-[50px] font-bold leading-[1.15] tracking-[-2.4px] max-md:text-[39px] max-sm:text-[32px]">
            <em className="not-italic text-primary">DFS Academy</em> {t("ガイド")}
          </h1>
          <p className="text-base leading-[1.8] text-muted-foreground">
            {t(
              "DFSChainを初めて使う方から、目的に合わせて学びたい方まで。知りたいことを、順番にわかりやすくご案内します。",
            )}
          </p>
        </div>
        <div className="flex h-[250px] items-center justify-center max-md:h-[165px] max-md:scale-75">
          <GuideIllustration />
        </div>
      </section>

      <section className={cn(wrap, "pb-[52px] pt-[18px]")}>
        <h2 className="mb-6 text-[28px] font-bold tracking-[-1px]">
          {t("知りたいことから選ぶ")}
        </h2>
        <div className="grid grid-cols-4 gap-4 max-md:grid-cols-2 max-sm:gap-2">
          {GUIDE_CATEGORIES.map(({ name, description, icon: Icon }) => (
            <Card
              key={name}
              role="button"
              tabIndex={0}
              onClick={() => choose(name)}
              onKeyDown={(e) => e.key === "Enter" && choose(name)}
              className={cn(
                "min-h-[220px] cursor-pointer items-center justify-center text-center transition hover:-translate-y-0.5 hover:border-primary hover:shadow-[0_10px_28px_rgba(39,138,69,.09)] max-sm:min-h-[190px]",
                selected === name &&
                  "border-primary shadow-[0_10px_28px_rgba(39,138,69,.09)]",
              )}
            >
              <CardHeader className="items-center justify-items-center px-3 pt-5 text-center">
                <Icon className="mx-auto size-[54px] stroke-[1.6] text-primary" />
                <CardTitle className="text-lg text-[#239347] max-sm:text-[15px]">
                  {t(name)}
                </CardTitle>
                <CardDescription className="min-h-11 text-center text-[13px] leading-6 max-sm:text-[11px]">
                  {t(description)}
                </CardDescription>
              </CardHeader>
              <CardContent className="px-3 pb-5 text-center">
                <span className="text-sm font-extrabold text-primary">
                  {t("ガイドを見る")} →
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section
        className={cn(
          wrap,
          "grid grid-cols-[minmax(0,1fr)_294px] gap-[30px] pb-20 max-md:grid-cols-1",
        )}
        id="guides"
      >
        <div>
          <div className="flex items-center justify-between max-md:flex-col max-md:items-start max-md:gap-4">
            <h2 className="mb-6 text-[28px] font-bold tracking-[-1px]">
              {t("ガイド一覧")}
            </h2>
            <div className="relative mb-6 w-[225px] max-md:mb-0 max-md:w-full">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="h-[42px] pl-9"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("ガイドを検索")}
              />
            </div>
          </div>

          <div className="mb-[18px] flex flex-wrap gap-2">
            {["すべて", ...GUIDE_CATEGORIES.map((c) => c.name)].map((name) => (
              <Button
                key={name}
                type="button"
                variant={selected === name ? "default" : "outline"}
                size="sm"
                className="rounded-full"
                onClick={() => setSelected(name)}
              >
                {t(name)}
              </Button>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            {filtered.map((guide) => {
              const href = guide.slug ? path(guidePath(guide.slug)) : undefined;
              const body = (
                <>
                  <div className="grid h-[94px] place-items-center rounded-[10px] bg-gradient-to-br from-[#ecfaee] to-[#f8fff9] text-[25px] font-extrabold text-primary max-md:h-[70px] max-sm:h-[52px] max-sm:text-lg">
                    {guide.n}
                  </div>
                  <div>
                    <div className="flex flex-wrap gap-1.5">
                      <Badge variant="secondary">{t(guide.category)}</Badge>
                      <Badge variant="secondary">{t(guide.tag)}</Badge>
                      {!guide.slug ? (
                        <Badge variant="outline">{t("準備中")}</Badge>
                      ) : null}
                    </div>
                    <h3 className="my-2 text-lg font-semibold max-sm:text-base">
                      {t(guide.title)}
                    </h3>
                    <p className="m-0 text-[13px] leading-[1.7] text-muted-foreground max-sm:text-xs">
                      {t(guide.description)}
                    </p>
                  </div>
                  <div className="flex flex-col gap-3 text-xs text-[#777d79] max-md:hidden">
                    <span className="flex items-center gap-1">
                      <Clock3 className="size-4" />
                      {t(guide.duration)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Target className="size-4" />
                      {t(guide.level)}
                    </span>
                  </div>
                  <span
                    className={cn(
                      "inline-flex size-9 items-center justify-center rounded-md",
                      href
                        ? "text-foreground"
                        : "text-muted-foreground opacity-40",
                    )}
                    aria-hidden={!href}
                  >
                    <ChevronRight className="size-5" />
                  </span>
                </>
              );

              const className =
                "grid min-h-[142px] grid-cols-[94px_1fr_95px_26px] items-center gap-[18px] rounded-xl border bg-card p-[18px] transition hover:border-[#b9dabe] hover:shadow-[0_7px_24px_rgba(27,82,42,.07)] max-md:grid-cols-[70px_1fr_22px] max-sm:grid-cols-[52px_1fr_18px] max-sm:gap-[11px] max-sm:p-3";

              return href ? (
                <a key={guide.n} href={href} className={className}>
                  {body}
                </a>
              ) : (
                <div
                  key={guide.n}
                  className={cn(className, "cursor-default opacity-90")}
                  aria-disabled="true"
                >
                  {body}
                </div>
              );
            })}

            {filtered.length === 0 ? (
              <div className="rounded-xl border border-dashed p-12 text-center text-muted-foreground">
                {t("該当するガイドがありません。別の言葉で検索してください。")}
              </div>
            ) : null}
          </div>
        </div>

        <aside className="flex flex-col gap-4 pt-[54px] max-md:pt-0">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{t("ガイドの特徴")}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="flex list-none flex-col gap-4 p-0 text-[13px]">
                {FEATURES.map((item) => (
                  <li className="flex items-center gap-2.5" key={item}>
                    <span className="grid size-[23px] place-items-center rounded-md bg-secondary text-primary">
                      ✓
                    </span>
                    {t(item)}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-[#239649] to-[#3bbe61] text-white">
            <CardHeader>
              <CardDescription className="text-xs text-white/80">
                {t("はじめての方へ")}
              </CardDescription>
              <CardTitle className="text-[23px] leading-[1.4]">
                {t("まずはここから始めましょう")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-xs leading-[1.7] text-white/90">
                {t("MetaFaceの登録方法を画面どおりに進められます。")}
              </p>
              {starter?.slug ? (
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-0 bg-white text-[#238b44] hover:bg-white/90"
                >
                  <a href={path(guidePath(starter.slug))}>
                    {t("スタートガイドを見る")} →
                  </a>
                </Button>
              ) : null}
            </CardContent>
          </Card>

          <Card className="flex-row items-start gap-3 p-5">
            <span className="grid size-9 shrink-0 place-items-center rounded-full border-2 border-primary font-extrabold text-primary">
              ?
            </span>
            <div>
              <h3 className="mb-1 text-sm font-semibold">
                {t("解決しませんでしたか？")}
              </h3>
              <p className="mb-2 text-[11px] text-muted-foreground">
                {t("Q&Aから詳しい回答を探せます。")}
              </p>
              <a
                className="text-xs font-extrabold text-primary"
                href={path("/academy/qa")}
              >
                {t("Q&Aを見る")} →
              </a>
            </div>
          </Card>
        </aside>
      </section>
    </div>
  );
}
