import type { Metadata } from "next";
import {
  Users,
  Megaphone,
  GraduationCap,
  TrendingUp,
  Code2,
  Store,
  Mail,
  ArrowRight,
} from "lucide-react";
import { PageShell, Container, Breadcrumb } from "@academy/components/site/PageShell";
import { typography } from "@academy/lib/typography";
import { cn } from "@academy/lib/utils";

const PartnershipHeroImg = "/academy/partnership-hero.png";

export const metadata: Metadata = {
  title: "パートナーシップ — DFS Academy",
  description: "DFS Academyとパートナーシップを結び、DFSChainの普及を一緒に加速させましょう。",
};

const benefits = [
  {
    icon: <Users className="w-10 h-10 fill-primary" />,
    title: "新しいユーザーへのリーチ",
    desc: "DFS Academyの学習者コミュニティを通じて、あなたのサービスやプロダクトを多くのユーザーに届けることができます。",
  },
  {
    icon: <Megaphone className="w-10 h-10 fill-primary" />,
    title: "ブランドの認知向上",
    desc: "共同マーケティングやコンテンツ連携により、Web3・ブロックチェーン分野でのブランド認知を高められます。",
  },
  {
    icon: <GraduationCap className="w-10 h-10 fill-primary" />,
    title: "教育コンテンツの共創",
    desc: "専門知識を活かしたコースや記事を共同で制作し、質の高い学習体験を提供できます。",
  },
  {
    icon: <TrendingUp className="w-10 h-10 fill-primary" />,
    title: "ビジネスの成長を加速",
    desc: "エコシステムパートナーとして連携することで、新たなビジネスチャンスと成長機会を獲得できます。",
  },
];

const partnerTypes = [
  {
    icon: <GraduationCap className="w-10 h-10 fill-primary" />,
    title: "教育パートナー",
    desc: "教育機関や研修プロバイダーとの連携により、体系的な学習プログラムを提供します。",
    examples: "大学、専門学校、オンライン学習プラットフォーム",
  },
  {
    icon: <Code2 className="w-10 h-10 fill-primary" />,
    title: "テクノロジーパートナー",
    desc: "開発者向けツールやインフラとの連携により、技術的な学習体験を強化します。",
    examples: "ウォレットプロバイダー、DApp開発ツール、APIプロバイダー",
  },
  {
    icon: <Users className="w-10 h-10 fill-primary" />,
    title: "コミュニティパートナー",
    desc: "コミュニティやメディアとの連携により、学習者への情報発信と交流を促進します。",
    examples: "Discordコミュニティ、Web3メディア、インフルエンサー",
  },
  {
    icon: <Store className="w-10 h-10 fill-primary" />,
    title: "ビジネスパートナー",
    desc: "企業やサービスプロバイダーとの連携により、実践的なユースケースを学習コンテンツに反映します。",
    examples: "DeFiプロトコル、NFTマーケットプレイス、ゲーム開発会社",
  },
];

export default function PartnershipPage() {
  return (
    <PageShell>
      <section className="py-10">
        <Container>
          <Breadcrumb items={[{ label: "ホーム", to: "/" }, { label: "パートナーシップ" }]} />
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10 items-center">
            <div>
              <h1 className={cn(typography.pageTitle, "text-foreground")}>
                一緒にDFSChainの普及を
                <br />
                <span className="text-primary">加速させましょう</span>
              </h1>
              <p className={cn("mt-5", typography.pageLead)}>
                DFS Academyは、教育機関、開発者、コミュニティ、企業の皆さまと連携し、
                DFSChainエコシステムの成長を推進しています。
              </p>
              <p className={cn("mt-3", typography.pageLead)}>
                パートナーシップを通じて、Web3の学習体験をより豊かにし、
                ブロックチェーン技術の普及に貢献しませんか。
              </p>
              <a
                href="/academy/contact"
                className="mt-8 inline-flex items-center gap-2 px-6 h-12 rounded-md bg-primary text-primary-foreground text-[15px] font-semibold hover:bg-primary/90 transition-colors"
              >
                パートナーになる <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            <div className="relative flex items-center justify-center w-full max-w-[420px] mx-auto lg:mx-0 lg:ml-auto">
              <img
                src={PartnershipHeroImg}
                alt="Partnership Illustration"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </Container>
      </section>

      <Container>
        <section className="pt-10 border-t border-border">
          <h2 className="text-[26px] sm:text-[28px] lg:text-[30px] font-bold text-center mb-4">
            パートナーシップのメリット
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="bg-card border border-border rounded-2xl p-6 text-center hover:border-primary/40 transition-colors"
              >
                <div className="w-16 h-16 rounded-full bg-primary-softer text-primary flex items-center justify-center mx-auto mb-4">
                  {b.icon}
                </div>
                <h3 className="text-[18px] mb-3">{b.title}</h3>
                <p className="text-[15px] leading-relaxed text-left text-muted-foreground">
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      </Container>

      <section className="py-10">
        <Container>
          <h2 className="text-[26px] sm:text-[28px] lg:text-[30px] font-bold text-center mb-4">
            パートナーの種類
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {partnerTypes.map((p) => (
              <div
                key={p.title}
                className="flex gap-4 bg-card border border-border rounded-2xl p-6 hover:border-primary/40 transition-colors"
              >
                <div className="w-14 h-14 rounded-full bg-primary-softer text-primary flex items-center justify-center shrink-0">
                  {p.icon}
                </div>
                <div>
                  <h3 className="text-[18px] mb-2">{p.title}</h3>
                  <p className="text-[15px] leading-relaxed text-muted-foreground">{p.desc}</p>
                  <p className="mt-2 text-[13px] text-muted-foreground">
                    <span className="">例：</span>
                    {p.examples}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-10">
        <Container>
          <div className="bg-primary-softer/40 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-6">
            <div className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0">
              <Mail className="w-7 h-7" />
            </div>
            <div className="flex-1">
              <div className="font-bold text-[18px] text-primary">
                一緒にDFSChainの普及を加速させましょう
              </div>
              <p className="mt-1 text-[15px]">
                パートナーシップに関するご質問やご提案は、お気軽にお問い合わせください。
              </p>
            </div>
            <a
              href="/academy/contact"
              className="inline-flex items-center justify-center gap-2 px-6 h-12 rounded-md bg-primary text-primary-foreground text-[15px] font-semibold hover:bg-primary/90 shrink-0"
            >
              提携について問い合わせる <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
