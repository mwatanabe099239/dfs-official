import { CheckCircle2 } from "lucide-react";
import type { FaqSection } from "../../data/qa-faqs";
import { typography } from "@academy/lib/typography";
import { cn } from "@academy/lib/utils";

export function FaqSections({ sections }: { sections: FaqSection[] }) {
  return (
    <div className="mt-10 space-y-6">
      {sections.map((s) => (
        <div key={s.title}>
          <h2 className={cn(typography.sectionTitle, "border-l-4 border-primary pl-3 mb-4")}>{s.title}</h2>
          {s.kind === "body" && (
            <p className={cn(typography.body, "text-foreground/90")}>{s.body}</p>
          )}
          {s.kind === "points" && (
            <ul className="space-y-2">
              {s.points.map((p) => (
                <li key={p} className={cn("flex items-start gap-2.5", typography.body)}>
                  <CheckCircle2 className="w-5 h-5 text-white fill-primary shrink-0 mt-0.5" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          )}
          {s.kind === "list" && (
            <ul className="space-y-2">
              {s.list.map((row) => (
                <li key={row.heading} className={cn("flex items-start gap-2.5", typography.body)}>
                  <CheckCircle2 className="w-5 h-5 text-white fill-primary shrink-0 mt-0.5" />
                  <span>
                    <b className="font-semibold">{row.heading}</b>：{row.body}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
