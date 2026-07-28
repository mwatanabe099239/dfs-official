import type { Metadata } from "next";
import { PageShell, Container, Breadcrumb } from "@academy/components/site/PageShell";
import { LegalList, LegalSection } from "@academy/components/site/LegalSection";
import { typography } from "@academy/lib/typography";
import { cn } from "@academy/lib/utils";

export const metadata: Metadata = {
  title: "利用規約 — DFS Academy",
  description: "DFS Academyの利用規約です。サービスのご利用前に必ずお読みください。",
};

export default function TermsPage() {
  return (
    <PageShell>
      <section className="py-12">
        <Container className="max-w-[800px]">
          <Breadcrumb items={[{ label: "ホーム", to: "/" }, { label: "利用規約" }]} />
          <h1 className={cn(typography.pageTitle, "text-foreground")}>利用規約</h1>
          <p className="mt-3 text-[13px] text-muted-foreground">最終更新日：2026年6月26日</p>
          <p className="mt-6 text-[15px] text-foreground/90 leading-relaxed">
            本利用規約（以下「本規約」）は、DFINES Inc.（以下「当社」）が提供するDFS Academy（以下「本サービス」）の利用条件を定めるものです。ユーザーは、本サービスを利用することにより、本規約に同意したものとみなされます。
          </p>

          <div className="mt-10 space-y-0">
            <LegalSection title="第1条（適用）">
              <LegalList
                ordered
                items={[
                  "本規約は、ユーザーと当社との間の本サービスの利用に関わる一切の関係に適用されます。",
                  "当社は本サービスに関し、本規約のほか、ご利用にあたってのルール等を定めることがあります。これらは本規約の一部を構成するものとします。",
                  "本規約の内容と、前項のルール等が異なる場合は、当該ルール等が優先されるものとします。",
                ]}
              />
            </LegalSection>

            <LegalSection title="第2条（利用登録）">
              <LegalList
                ordered
                items={[
                  "本サービスの利用を希望する方は、本規約に同意の上、当社の定める方法によって利用登録を申請し、当社がこれを承認することによって、利用登録が完了するものとします。",
                  "当社は、利用登録の申請者に以下の事由があると判断した場合、利用登録の申請を承認しないことがあります。",
                ]}
              />
              <LegalList
                items={[
                  "虚偽の事項を届け出た場合",
                  "本規約に違反したことがある者からの申請である場合",
                  "その他、当社が利用登録を相当でないと判断した場合",
                ]}
              />
            </LegalSection>

            <LegalSection title="第3条（有料サービス）">
              <LegalList
                ordered
                items={[
                  "本サービスには、無料でご利用いただけるコンテンツのほか、有料のコースやサービスが含まれる場合があります。",
                  "有料サービスの料金、支払方法、解約条件等は、各サービスのページまたは別途定める料金表に従うものとします。",
                  "ユーザーが料金の支払を遅滞した場合、当社は本サービスの提供を停止することができます。",
                ]}
              />
            </LegalSection>

            <LegalSection title="第4条（禁止事項）">
              <p>ユーザーは、本サービスの利用にあたり、以下の行為をしてはなりません。</p>
              <LegalList
                items={[
                  "法令または公序良俗に違反する行為",
                  "犯罪行為に関連する行為",
                  "当社、本サービスの他のユーザー、または第三者の知的財産権、肖像権、プライバシー、名誉その他の権利または利益を侵害する行為",
                  "本サービスのネットワークまたはシステム等に過度な負荷をかける行為",
                  "本サービスの運営を妨害するおそれのある行為",
                  "不正アクセスをし、またはこれを試みる行為",
                  "他のユーザーに関する個人情報等を収集または蓄積する行為",
                  "他のユーザーに成りすます行為",
                  "当社のサービスに関連して、反社会的勢力に対して直接または間接に利益を供与する行為",
                  "その他、当社が不適切と判断する行為",
                ]}
              />
            </LegalSection>

            <LegalSection title="第5条（サービスの変更・停止）">
              <LegalList
                ordered
                items={[
                  "当社は、ユーザーへの事前の通知なく、本サービスの内容を変更し、または提供を中止することができるものとします。",
                  "当社は、本サービスの提供の停止または中断により、ユーザーまたは第三者が被ったいかなる不利益または損害についても、一切の責任を負わないものとします。",
                ]}
              />
            </LegalSection>

            <LegalSection title="第6条（免責事項）">
              <LegalList
                ordered
                items={[
                  "当社は、本サービスに事実上または法律上の瑕疵がないことを保証するものではありません。",
                  "当社は、本サービスに起因してユーザーに生じたあらゆる損害について、当社の故意または重過失による場合を除き、一切の責任を負いません。",
                  "本サービスに関して、ユーザーと他のユーザーまたは第三者との間において生じた取引、連絡または紛争等については、ユーザーが自己の責任によって解決するものとします。",
                ]}
              />
            </LegalSection>

            <LegalSection title="第7条（規約の変更）">
              <p>
                当社は、必要と判断した場合には、ユーザーに通知することなくいつでも本規約を変更することができるものとします。変更後の本規約は、本サービス上に掲示した時点から効力を生じるものとします。
              </p>
            </LegalSection>

            <LegalSection title="第8条（準拠法・裁判管轄）">
              <LegalList
                ordered
                items={[
                  "本規約の解釈にあたっては、日本法を準拠法とします。",
                  "本サービスに関して紛争が生じた場合には、当社の本店所在地を管轄する裁判所を専属的合意管轄とします。",
                ]}
              />
            </LegalSection>
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
