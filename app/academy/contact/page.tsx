"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Mail, Users, HelpCircle, Send, ArrowRight } from "lucide-react";
import { PageShell, Container, Breadcrumb } from "@academy/components/site/PageShell";
import { ContactIllustration } from "@academy/components/site/ContactIllustration";
import { typography } from "@academy/lib/typography";
import { cn } from "@academy/lib/utils";

const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string;
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string;
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY as string;

const inquiryTypes = [
  "コースについて",
  "Q&A・記事について",
  "アカウント・ログインについて",
  "パートナーシップについて",
  "技術的なお問い合わせ",
  "その他",
];

type Status = "idle" | "sending" | "success" | "error";

const initialForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function ContactPage() {
  const [form, setForm] = useState(initialForm);
  const [inquiryType, setInquiryType] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const resetForm = () => {
    setForm(initialForm);
    setInquiryType("");
    setConsent(false);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!consent) {
      setErrorMsg("プライバシーポリシーに同意してください。");
      setStatus("error");
      return;
    }

    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      setErrorMsg("メール送信の設定が完了していません。管理者にお問い合わせください。");
      setStatus("error");
      return;
    }

    setStatus("sending");
    setErrorMsg("");

    const details = form.subject ? `件名: ${form.subject}\n\n${form.message}` : form.message;

    try {
      const { default: emailjs } = await import("@emailjs/browser");

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          company: "",
          name: form.name,
          email: form.email,
          phone: "",
          topics: inquiryType,
          details,
        },
        { publicKey: EMAILJS_PUBLIC_KEY },
      );

      setStatus("success");
      resetForm();
    } catch (err) {
      setStatus("error");
      setErrorMsg("送信に失敗しました。時間をおいて再度お試しください。");
      console.error(err);
    }
  };

  return (
    <PageShell>
      <section className="py-12">
        <Container>
          <Breadcrumb items={[{ label: "ホーム", to: "/" }, { label: "お問い合わせ" }]} />
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 items-center mb-12">
            <div>
              <h1 className={cn(typography.pageTitle, "text-foreground")}>お問い合わせ</h1>
              <p className={cn("mt-5", typography.pageLead)}>
                DFS
                Academyに関するご質問・ご意見・ご要望は、下記フォームよりお気軽にお問い合わせください。
              </p>
              <p className={cn("mt-2", typography.pageLead)}>
                内容を確認のうえ、担当者より順次ご連絡いたします。
              </p>
            </div>
            <ContactIllustration />
          </div>

          <div className="bg-card border border-border rounded-2xl p-8 md:p-10">
            <h2 className="text-[26px] sm:text-[28px] lg:text-[30px] font-bold border-l-4 border-primary pl-3 mb-8">
              お問い合わせフォーム
            </h2>

            {status === "success" ? (
              <div className="rounded-xl bg-primary-softer border border-primary-soft p-8 text-center">
                <p className="text-[16px] font-bold text-primary">送信が完了しました。</p>
                <p className="mt-2 text-[15px] text-foreground/90">
                  担当者より追ってご連絡いたしますので、しばらくお待ちください。
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-6 inline-flex items-center gap-2 px-6 h-11 rounded-md bg-primary text-primary-foreground text-[15px] font-semibold hover:bg-primary/90"
                >
                  新しいお問い合わせを送る
                </button>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    label="お名前"
                    required
                    placeholder="例）山田 太郎"
                    value={form.name}
                    onChange={(name) => setForm({ ...form, name })}
                  />
                  <FormField
                    label="メールアドレス"
                    required
                    placeholder="例）example@email.com"
                    type="email"
                    value={form.email}
                    onChange={(email) => setForm({ ...form, email })}
                  />
                  <FormSelect
                    label="お問い合わせの種類"
                    required
                    options={inquiryTypes}
                    value={inquiryType}
                    onChange={setInquiryType}
                  />
                  <FormField
                    label="件名"
                    optional
                    placeholder="例）コースについての質問"
                    value={form.subject}
                    onChange={(subject) => setForm({ ...form, subject })}
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-[15px] font-medium mb-2">
                    メッセージ <RequiredBadge />
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="お問い合わせ内容をご記入ください"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-[15px] focus:outline-none focus:border-primary resize-none"
                  />
                  <p className="mt-2 text-[13px] text-muted-foreground">
                    ※ お問い合わせ内容によっては、回答までにお時間をいただく場合がございます。
                  </p>
                </div>

                <div>
                  <p className="text-[13px] text-muted-foreground">
                    個人情報の取り扱いに同意のうえ、送信してください。
                  </p>
                  <label className="mt-2 flex flex-wrap items-center gap-2 text-[15px] text-foreground">
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="h-4 w-4 accent-primary rounded border-border"
                    />
                    <span>プライバシーポリシーに同意します。</span>
                    <Link href="/academy/privacy" className="text-primary hover:underline">
                      ポリシーを見る
                    </Link>
                    <RequiredBadge />
                  </label>
                </div>

                {status === "error" && errorMsg && (
                  <p className="text-center text-[15px] font-medium text-destructive">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full inline-flex items-center justify-center gap-2 h-12 rounded-md bg-primary text-primary-foreground text-[15px] font-semibold hover:bg-primary/90 transition-colors disabled:opacity-60"
                >
                  <Send className="w-4 h-4" />
                  {status === "sending" ? "送信中..." : "送信する"}
                </button>
              </form>
            )}
          </div>

          <div className="mt-12 bg-primary-softer/40 rounded-2xl p-6 flex flex-col md:flex-row md:items-center">
            {[
              {
                icon: <Mail className="w-8 h-8 fill-primary text-white" />,
                title: "メールでのお問い合わせ",
                body: (
                  <>
                    <a
                      href="mailto:support@dfsacademy.com"
                      className="text-[15px] font-semibold text-primary hover:underline"
                    >
                      support@dfsacademy.com
                    </a>
                    <p className="mt-2 text-[15px]">24時間以内にご返信いたします。</p>
                  </>
                ),
              },
              {
                icon: <Users className="w-8 h-8 fill-primary text-white" />,
                title: "コミュニティで質問する",
                body: (
                  <>
                    <p className="text-[15px] leading-relaxed">
                      Discordコミュニティで他の学習者やスタッフに質問できます。
                    </p>
                    <a
                      href="#"
                      className="mt-4 inline-flex items-center gap-2 px-4 h-10 rounded-md border border-primary text-primary text-[15px] hover:bg-primary-softer"
                    >
                      コミュニティに参加する <ArrowRight className="w-4 h-4" />
                    </a>
                  </>
                ),
              },
              {
                icon: <HelpCircle className="w-8 h-8 fill-primary text-white" />,
                title: "ヘルプセンター",
                body: (
                  <>
                    <p className="text-[15px] leading-relaxed">
                      よくある質問やガイドをご確認いただけます。
                    </p>
                    <a
                      href="/academy/qa"
                      className="mt-4 inline-flex items-center gap-2 px-4 h-10 rounded-md border border-primary text-primary text-[15px] hover:bg-primary-softer"
                    >
                      ヘルプセンターへ <ArrowRight className="w-4 h-4" />
                    </a>
                  </>
                ),
              },
            ]
              .flatMap((card, index, cards) => [
                <div key={card.title} className="flex items-start gap-4 flex-1 min-w-0">
                  <div className="w-14 h-14 rounded-full bg-primary-softer text-primary flex items-center justify-center shrink-0">
                    {card.icon}
                  </div>
                  <div className="w-full text-left min-w-0">
                    <h3 className="text-[18px] mb-3">{card.title}</h3>
                    {card.body}
                  </div>
                </div>,
                index < cards.length - 1 ? (
                  <div
                    key={`${card.title}-divider`}
                    className="flex items-center justify-center shrink-0 md:self-stretch py-4 md:py-0 md:px-6"
                    aria-hidden
                  >
                    <div className="w-full h-px md:w-px md:h-24 bg-border" />
                  </div>
                ) : null,
              ])
              .filter(Boolean)}
          </div>
        </Container>
      </section>
    </PageShell>
  );
}

function RequiredBadge() {
  return (
    <span className="inline-flex px-2 py-0.5 rounded text-[12px] font-bold bg-primary text-primary-foreground">
      必須
    </span>
  );
}

function OptionalBadge() {
  return (
    <span className="inline-flex px-2 py-0.5 rounded text-[12px] font-medium bg-secondary text-muted-foreground border border-border">
      任意
    </span>
  );
}

function FormField({
  label,
  required,
  optional,
  placeholder,
  type = "text",
  value,
  onChange,
}: {
  label: string;
  required?: boolean;
  optional?: boolean;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="flex items-center gap-2 text-[15px] font-medium mb-2">
        {label} {required && <RequiredBadge />} {optional && <OptionalBadge />}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-11 px-4 rounded-lg border border-border bg-background text-[15px] focus:outline-none focus:border-primary"
      />
    </div>
  );
}

function FormSelect({
  label,
  required,
  options,
  value,
  onChange,
}: {
  label: string;
  required?: boolean;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="flex items-center gap-2 text-[15px] font-medium mb-2">
        {label} {required && <RequiredBadge />}
      </label>
      <select
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-11 px-4 rounded-lg border border-border bg-background text-[15px] focus:outline-none focus:border-primary text-foreground/80"
      >
        <option value="">選択してください</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
