import { MessageSquare, Send } from "lucide-react";

import { InfinityMark } from "./Logo";

const SUGGESTED = [
  "How do I launch a token?",
  "What are the benefits of DFS Chain?",
  "How to raise funding on DFS Chain?",
];

export function AiConsultantPreview() {
  return (
    <div className="overflow-hidden rounded-2xl border-gradient bg-card p-4 sm:p-5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-foreground sm:text-base">
          AI Consultant Preview
        </span>
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary">
          <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_6px_var(--difinesai-primary)]" />
          Online
        </span>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[2fr_3fr]">
        <div>
          <p className="mb-3 text-sm font-semibold text-primary">Suggested Questions</p>
          <div className="space-y-2.5">
            {SUGGESTED.map((q) => (
              <button
                key={q}
                type="button"
                className="flex w-full items-center gap-2.5 rounded-xl border-gradient border-gradient-hover bg-surface-2 px-3 py-2.5 text-left text-xs text-foreground transition-colors sm:text-[13px]"
              >
                <MessageSquare className="h-4 w-4 shrink-0 text-primary" strokeWidth={1.75} />
                {q}
              </button>
            ))}
          </div>
        </div>

        <div className="relative flex min-h-[280px] flex-col overflow-hidden rounded-xl border-gradient bg-surface-2/80 p-3 sm:p-4">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              backgroundImage: `
                radial-gradient(circle at 20% 30%, rgb(53 149 94 / 0.15) 0%, transparent 45%),
                radial-gradient(circle at 80% 70%, rgb(53 149 94 / 0.1) 0%, transparent 40%)
              `,
            }}
          />

          <div className="relative flex flex-1 flex-col">
            <div className="flex-1 space-y-4">
              <div className="flex flex-col items-end">
                <p className="max-w-[90%] rounded-xl rounded-tr-sm border-gradient bg-card px-3 py-2 text-xs leading-relaxed text-foreground sm:text-[13px]">
                  What are the benefits of DFS Chain?
                </p>
                <span className="mt-1 text-[10px] text-muted-foreground">10:30 AM</span>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_0_12px_rgb(53_149_94/0.45)]">
                  <InfinityMark className="h-4 w-7" />
                </span>
                <div className="flex min-w-0 flex-col">
                  <p className="max-w-[95%] rounded-xl rounded-tl-sm border-gradient bg-card px-3 py-2 text-xs leading-relaxed text-foreground sm:text-[13px]">
                    DFS Chain offers high performance, low fees, and robust security with AI
                    integration—built to power real-world Web3 businesses.
                  </p>
                  <span className="mt-1 text-[10px] text-muted-foreground">10:30 AM</span>
                </div>
              </div>
            </div>

            <div className="relative mt-4 flex items-center gap-2 rounded-full border-gradient bg-card px-3 py-2">
              <input
                type="text"
                placeholder="Ask anything about DFS Chain..."
                readOnly
                className="flex-1 bg-transparent text-xs outline-none placeholder:text-muted-foreground sm:text-[13px]"
              />
              <button
                type="button"
                aria-label="Send message"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
