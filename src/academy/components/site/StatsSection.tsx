import { Fragment } from "react";
import { FileText, GraduationCap, MessageCircle, Users } from "lucide-react";
import { cn } from "@academy/lib/utils";
import { Container } from "./PageShell";
import { Stat } from "./cards";

const stats = [
  { icon: MessageCircle, value: "1000+", label: "Q&A" },
  { icon: FileText, value: "200+", label: "記事" },
  { icon: GraduationCap, value: "30+", label: "コース" },
  { icon: Users, value: "10,000+", label: "学習者" },
] as const;

function StatItem({
  icon: Icon,
  value,
  label,
  className,
}: {
  icon: (typeof stats)[number]["icon"];
  value: string;
  label: string;
  className?: string;
}) {
  return (
    <Stat
      icon={<Icon className="h-8 w-8 md:h-14 md:w-14" strokeWidth={1} />}
      value={value}
      label={label}
      className={className}
    />
  );
}

export function StatsSection() {
  return (
    <section className="py-6 lg:py-6 bg-primary-softer/50">
      <Container>
        <div className="md:hidden space-y-4">
          {[stats.slice(0, 2), stats.slice(2, 4)].map((row, rowIndex) => (
            <div key={rowIndex} className="flex items-center">
              {row.map((stat, index) => (
                <Fragment key={stat.label}>
                  {index > 0 && (
                    <div className="flex items-center self-stretch shrink-0 px-2" aria-hidden>
                      <div className="h-20 w-px bg-border" />
                    </div>
                  )}
                  <div className="flex flex-1 min-w-0 justify-center">
                    <StatItem {...stat} />
                  </div>
                </Fragment>
              ))}
            </div>
          ))}
        </div>

        <div className="hidden md:grid md:grid-cols-4">
          {stats.map(({ icon: Icon, value, label }, index) => (
            <StatItem
              key={label}
              icon={Icon}
              value={value}
              label={label}
              className={cn("pl-16", index < stats.length - 1 && "border-r border-border")}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
