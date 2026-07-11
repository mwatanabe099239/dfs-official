import { ClipboardList, CircleDollarSign, Users, Bot } from "lucide-react";

const FEATURES = [
  {
    icon: ClipboardList,
    title: "Business Planning",
    desc: "Create strategies and roadmaps with AI.",
  },
  {
    icon: CircleDollarSign,
    title: "Token Strategy",
    desc: "Design tokenomics built for growth.",
  },
  {
    icon: Users,
    title: "Fundraising",
    desc: "Find investors and prepare pitch decks.",
  },
  {
    icon: Bot,
    title: "AI Automation",
    desc: "Automate workflows and operations.",
  },
];

export function Features() {
  return (
    <section id="solutions" className="mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-8">
      <div className="card-surface py-4 px-8">
        <h2 className="text-center text-2xl font-semibold text-primary">AI Consultant Features</h2>
        <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="rounded-xl border-gradient border-gradient-hover bg-surface-2 p-4 transition-colors flex items-center gap-2"
            >
              <div className="flex items-start gap-2 w-full">
                <Icon className="h-14 w-14 shrink-0 text-primary" strokeWidth={1} />
                <div className="flex flex-col gap-2 flex-1 min-w-0">
                  <h3 className="font-semibold text-primary">{title}</h3>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
