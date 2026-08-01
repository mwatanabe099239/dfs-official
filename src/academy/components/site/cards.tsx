import type { ReactNode } from "react";
import { ArrowRight, Clock } from "lucide-react";
import { cn } from "@academy/lib/utils";
import { typography } from "@academy/lib/typography";

export function Tag({ children, tone = "soft" }: { children: ReactNode; tone?: "soft" | "solid" }) {
  if (tone === "solid") {
    return (
      <span
        className={cn(
          "inline-flex items-center px-2.5 py-1 rounded-md bg-primary text-primary-foreground font-semibold",
          typography.badge,
        )}
      >
        {children}
      </span>
    );
  }
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 rounded-md bg-primary-softer text-primary font-medium border border-primary-soft/60",
        typography.badge,
      )}
    >
      {children}
    </span>
  );
}

export function QCard({ title, tag, to = "/academy/qa" }: { title: string; tag: string; to?: string }) {
  return (
    <a
      href={to}
      className="group bg-card border border-border rounded-xl p-5 hover:border-primary/40 hover:shadow-sm transition-all flex flex-col justify-between"
    >
      <div className="flex items-start gap-3 mb-8">
        <span
          className={cn(
            "shrink-0 w-7 h-7 rounded-md bg-primary text-primary-foreground flex items-center justify-center font-bold",
            typography.badge,
          )}
        >
          Q
        </span>
        <h3 className={cn(typography.cardTitleMd, "text-foreground")}>{title}</h3>
      </div>
      <div className="flex items-center justify-between">
        <Tag>{tag}</Tag>
        <span className="w-7 h-7 rounded-md flex items-center justify-center text-primary group-hover:bg-primary-softer">
          <ArrowRight className="w-4 h-4" />
        </span>
      </div>
    </a>
  );
}

export function ArticleCard({
  icon,
  tag,
  title,
  readTime,
  to = "/academy/articles",
  isLanding = false,
}: {
  icon: ReactNode;
  tag: string;
  title: string;
  readTime: string;
  to?: string;
  isLanding?: boolean;
}) {
  return (
    <a
      href={to}
      className={cn(
        "group flex h-full flex-col bg-card border border-border rounded-xl p-5 hover:border-primary/40 hover:shadow-sm transition-all",
        isLanding && "gap-4 sm:flex-row sm:items-start",
      )}
    >
      <div
        className={cn(
          "text-primary w-12 h-12 shrink-0 flex items-center justify-center",
          !isLanding && "mb-4",
        )}
      >
        {icon}
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <div>
          <Tag>{tag}</Tag>
        </div>
        <h3 className={cn("mt-3 min-h-[2.75em] text-foreground", typography.cardTitleMd)}>
          {title}
        </h3>
        <div className={cn("mt-4 flex items-center justify-between", typography.meta)}>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" /> {readTime}
          </span>
          <ArrowRight className="w-4 h-4 text-primary" />
        </div>
      </div>
    </a>
  );
}

export function SectionHeader({ title, action }: { title: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between mb-6">
      <h2 className={cn(typography.sectionTitle, "text-foreground")}>{title}</h2>
      {action}
    </div>
  );
}

export function ViewAll({ to = "/academy/qa" }: { to?: string }) {
  return (
    <a
      href={to}
      className={cn("inline-flex items-center gap-1.5 hover:underline", typography.link)}
    >
      すべて見る <ArrowRight className="w-3.5 h-3.5" />
    </a>
  );
}

export function Stat({
  icon,
  value,
  label,
  className,
}: {
  icon: ReactNode;
  value: string;
  label: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex min-w-0 flex-col items-center gap-3 text-center md:flex-row md:items-center md:gap-4 md:text-left",
        className,
      )}
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-softer text-primary md:h-12 md:w-12">
        {icon}
      </div>
      <div className="flex min-w-0 items-baseline justify-center gap-1.5 whitespace-nowrap md:flex-col md:items-start md:gap-0 md:whitespace-normal">
        <div className={cn(typography.cardTitleLg, "text-primary leading-none")}>{value}</div>
        <div className={cn(typography.cardTitleSm, "text-foreground md:mt-1")}>{label}</div>
      </div>
    </div>
  );
}
