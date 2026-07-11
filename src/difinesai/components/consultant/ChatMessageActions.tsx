"use client";

import { useState } from "react";
import { Check, Copy, Share2, Smile, ThumbsDown, ThumbsUp } from "lucide-react";

import { useT } from "../../i18n/I18nProvider";

export function ChatMessageActions({ text }: { text: string }) {
  const { t } = useT();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard may be unavailable in some browsers/contexts.
    }
  };

  return (
    <div className="mt-3 flex items-center gap-3 border-t-gradient pt-3 text-muted-foreground">
      <button type="button" className="hover:text-primary" aria-label={t("React")}>
        <Smile className="h-4 w-4" />
      </button>
      <button type="button" className="hover:text-primary" aria-label={t("Like")}>
        <ThumbsUp className="h-4 w-4" />
      </button>
      <button type="button" className="hover:text-primary" aria-label={t("Dislike")}>
        <ThumbsDown className="h-4 w-4" />
      </button>
      <button type="button" className="hover:text-primary" aria-label={t("Share")}>
        <Share2 className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => void handleCopy()}
        className="hover:text-primary"
        aria-label={copied ? t("Copied") : t("Copy")}
      >
        {copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
      </button>
    </div>
  );
}
