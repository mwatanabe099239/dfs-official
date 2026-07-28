import type { Metadata } from "next";
import { PageShell, Container, Breadcrumb } from "@academy/components/site/PageShell";
import { LegalList, LegalSection } from "@academy/components/site/LegalSection";
import { typography } from "@academy/lib/typography";
import { cn } from "@academy/lib/utils";

export const metadata: Metadata = {
  title: "プライバシー・ポリシー — DFS Academy",
  description: "DFS Academyのプライバシー・ポリシーです。個人情報の取り扱いについてご説明します。",
};

export default function PrivacyPage() {
  return (
    <PageShell>
      <section className="py-12">
        <Container className="max-w-[800px]">
          <Breadcrumb items={[{ label: "ホーム", to: "/" }, { label: "プライバシー・ポリシー" }]} />
          <h1 className={cn(typography.pageTitle, "text-foreground")}>プライバシー・ポリシー</h1>
          <p className="mt-3 text-[13px] text-muted-foreground">最終更新日：2026年6月26日</p>
          <p className="mt-6 text-[15px] text-foreground/90 leading-relaxed">
            DFINES Inc.（以下「当社」）は、DFS Academy（以下「本サービス」）におけるユーザーの個人情報の取扱いについて、以下のとおりプライバシー・ポリシー（以下「本ポリシー」）を定めます。
          </p>

          <div className="mt-10 space-y-0">
            <LegalSection title="1. 取得する情報">
              <p>当社は、本サービスの提供にあたり、以下の情報を取得する場合があります。</p>
              <LegalList
                items={[
                  "氏名、メールアドレス、パスワード等のアカウント情報",
                  "プロフィール情報（ニックネーム、学習履歴等）",
                  "お問い合わせ内容およびサポート対応に関する情報",
                  "Cookie、IPアドレス、端末情報、アクセスログ等の利用状況に関する情報",
                  "その他、本サービスの利用にあたりユーザーが入力または送信する情報",
                ]}
              />
            </LegalSection>

            <LegalSection title="2. 利用目的">
              <p>当社は、取得した情報を以下の目的で利用します。</p>
              <LegalList
                items={[
                  "本サービスの提供、運営、維持および改善のため",
                  "ユーザーからのお問い合わせへの対応のため",
                  "新機能、更新情報、キャンペーン等のご案内のため",
                  "利用規約に違反する行為への対応のため",
                  "本サービスに関する統計データの作成および分析のため",
                  "その他、上記利用目的に付随する目的のため",
                ]}
              />
            </LegalSection>

            <LegalSection title="3. 第三者提供">
              <p>当社は、以下の場合を除き、ユーザーの個人情報を第三者に提供しません。</p>
              <LegalList
                items={[
                  "ユーザーの同意がある場合",
                  "法令に基づく場合",
                  "人の生命、身体または財産の保護のために必要がある場合であって、本人の同意を得ることが困難である場合",
                  "公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合",
                  "国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合",
                ]}
              />
            </LegalSection>

            <LegalSection title="4. 安全管理措置">
              <p>
                当社は、個人情報の漏えい、滅失またはき損の防止その他の個人情報の安全管理のために、必要かつ適切な措置を講じます。具体的には、アクセス制御、暗号化、従業員への教育等を実施しています。
              </p>
            </LegalSection>

            <LegalSection title="5. ユーザーの権利">
              <p>ユーザーは、当社に対し、以下の請求を行うことができます。</p>
              <LegalList
                items={[
                  "保有個人データの開示請求",
                  "内容の訂正、追加または削除の請求",
                  "利用の停止または消去の請求",
                  "第三者への提供の停止の請求",
                ]}
              />
              <p className="mt-3">
                これらの請求を行う場合は、本ポリシー末尾のお問い合わせ先までご連絡ください。当社は、法令に従い適切に対応いたします。
              </p>
            </LegalSection>

            <LegalSection title="6. お問い合わせ">
              <p>本ポリシーに関するお問い合わせは、下記までご連絡ください。</p>
              <div className="mt-3 text-[15px] space-y-1">
                <p className="font-semibold">DFINES Inc.</p>
                <p>メール：<a href="mailto:privacy@dfsacademy.com" className="text-primary hover:underline">privacy@dfsacademy.com</a></p>
                <p>
                  お問い合わせフォーム：<a href="/academy/contact" className="text-primary hover:underline">お問い合わせページ</a>
                </p>
              </div>
            </LegalSection>
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
