import type { ReactNode } from "react";
import { typography } from "@academy/lib/typography";
import { cn } from "@academy/lib/utils";

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="pt-8 first:pt-0 border-t border-border first:border-t-0">
      <h2 className={cn(typography.sectionTitle, "text-foreground mb-4")}>{title}</h2>
      <div className={cn(typography.body, "text-foreground/90 space-y-3")}>{children}</div>
    </section>
  );
}

export function LegalList({ items, ordered }: { items: ReactNode[]; ordered?: boolean }) {
  const Tag = ordered ? "ol" : "ul";
  return (
    <Tag className={`space-y-2 pl-5 ${ordered ? "list-decimal" : "list-disc"}`}>
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </Tag>
  );
}
