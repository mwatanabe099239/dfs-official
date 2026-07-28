import { Logo } from "./Logo";
import { Globe, ChevronDown } from "lucide-react";

const columns = [
  {
    title: "学ぶ",
    links: [
      { label: "記事", to: "/academy/articles" },
      { label: "コース", to: "/academy/courses" },
      { label: "Q&A", to: "/academy/qa" },
      // { label: "Learn & Earn", to: "/learn-earn" },
    ],
  },
  {
    title: "サポート",
    links: [
      { label: "よくある質問", to: "/academy/qa" },
      { label: "お問い合わせ", to: "/academy/contact" },
      { label: "ご意見・ご要望", to: "/academy/contact" },
      { label: "サポート", to: "/academy/contact" },
    ],
  },
  {
    title: "パートナーシップ",
    links: [{ label: "パートナーになる", to: "/academy/partnership" }],
  },
];

export function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-6 py-8 md:py-10">
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 md:grid-cols-5 md:gap-10">
          <div className="col-span-2 sm:col-span-3 md:col-span-2">
            <Logo />
            <p className="mt-4 text-[15px] text-muted-foreground leading-relaxed max-w-sm">
              DFSChainを学び、Web3の未来を一緒に創る学習プラットフォーム。
            </p>
            <div className="flex items-center gap-4 mt-5 text-foreground/70">
              <a
                href="https://x.com/DFS_Chain"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2H21l-6.52 7.45L22 22h-6.59l-5.16-6.74L4.3 22H1.55l6.98-7.97L1 2h6.74l4.66 6.16L18.244 2zm-2.31 18h1.84L7.16 4H5.21l10.72 16z" />
                </svg>
              </a>
              <a href="#" aria-label="Discord">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@difines_dapps"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a
                href="https://t.me/DFSCommunity"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9.964 16.864l-.401 4.236c.574 0 .822-.247 1.122-.547l2.688-2.576 5.571 4.07c1.019.56 1.748.265 2.022-.944L23.95 4.703c.284-1.168-.422-1.627-1.42-1.312L1.797 9.344c-1.15.372-1.135 1.087-.208 1.344l5.827 1.818 13.537-8.556c.603-.35 1.093-.157.674.21l-11.22 9.711z" />
                </svg>
              </a>
            </div>
          </div>
          {columns.map((c) => (
            <div key={c.title} className="min-w-0">
              <h4 className="text-[15px] md:text-[16px] font-semibold text-foreground mb-3 md:mb-4">
                {c.title}
              </h4>
              <ul className="space-y-2 md:space-y-1">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.to}
                      className="text-[13px] md:text-[15px] text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-8 md:mt-10 pt-6 border-t border-border flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <span className="text-[13px] md:text-[15px] text-muted-foreground">
            © 2026 DFS Academy. All rights reserved.
          </span>
          <div className="grid grid-cols-2 gap-x-4 gap-y-3 sm:flex sm:flex-wrap sm:items-center sm:gap-6">
            <button
              type="button"
              className="col-span-2 sm:col-span-1 inline-flex items-center justify-center sm:justify-start gap-2 px-3 h-9 rounded-md border border-border text-[15px] text-foreground w-full sm:w-auto"
            >
              <Globe className="w-4 h-4" /> 日本語 <ChevronDown className="w-3.5 h-3.5" />
            </button>
            <a
              href="/academy/privacy"
              className="md:text-[13px] text-[12px] text-muted-foreground hover:text-foreground border-r border-muted-foreground pr-5 text-center"
            >
              プライバシー・ポリシー
            </a>
            <a
              href="/academy/terms"
              className="md:text-[13px] text-[12px] text-muted-foreground hover:text-foreground text-center"
            >
              利用規約
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
