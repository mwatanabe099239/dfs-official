import type { ReactNode } from "react";
import type { Metadata } from "next";

import "../../src/difinesai/styles.css";

import { I18nProvider } from "../../src/difinesai/i18n/I18nProvider";
import { Toaster } from "../../src/difinesai/components/ui/sonner";

export const metadata: Metadata = {
  title: "DIFINES — Launch Your Business with DFS Chain + AI",
  description:
    "AI consultant trained on the DFS Chain ecosystem — blockchain strategy, tokenomics, fundraising, automation.",
};

export default function DifinesAiLayout({ children }: { children: ReactNode }) {
  return (
    <div className="difinesai-scope difinesai-dark min-h-screen">
      <I18nProvider>
        {children}
        <Toaster richColors position="top-right" />
      </I18nProvider>
    </div>
  );
}
