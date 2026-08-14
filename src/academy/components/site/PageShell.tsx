import type { ReactNode } from "react";
import Footer from "@/src/components/Footer";
import { Header } from "./Header";
import { PromoBar } from "./PromoBar";

export function PageShell({
  children,
  hidePromo = false,
}: {
  children: ReactNode;
  hidePromo?: boolean;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      {hidePromo ? null : <PromoBar />}
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`max-w-[1200px] mx-auto px-4 lg:px-6 ${className}`}>{children}</div>;
}

import { typography } from "@academy/lib/typography";
import { cn } from "@academy/lib/utils";

export function Breadcrumb({ items }: { items: { label: string; to?: string }[] }) {
  return (
    <nav className={cn("flex flex-wrap items-center gap-x-2 gap-y-1 mb-6", typography.meta)}>
      {items.map((it, i) => (
        <span key={i} className="flex items-center gap-2">
          {it.to ? (
            <a href={it.to} className="text-primary hover:underline">{it.label}</a>
          ) : (
            <span className="text-foreground/70">{it.label}</span>
          )}
          {i < items.length - 1 && <span className="text-border">/</span>}
        </span>
      ))}
    </nav>
  );
}
