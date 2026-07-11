import { Boxes, Search, CircleDollarSign, Bot, Package } from "lucide-react";

const ECO = [
  {
    icon: Boxes,
    title: "DFS Chain",
    desc: "High-performance blockchain infrastructure",
  },
  { icon: Search, title: "DFS Scan", desc: "Real-time explorer and analytics platform" },
  {
    icon: CircleDollarSign,
    title: "Token Tools",
    desc: "No-code token creation and management",
  },
  { icon: Bot, title: "AI Agents", desc: "Intelligent agents for automation and insights" },
  { icon: Package, title: "Future Products", desc: "Expanding ecosystem for limitless possibilities" },
];

export function Ecosystem() {
  return (
    <section id="ecosystem" className="mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-8">
      <div className="card-surface pt-4 pb-8 px-8">
        <h2 className="text-center text-2xl font-semibold text-primary">THE DIFINES Ecosystem</h2>
        <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-5">
          {ECO.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="flex items-center gap-2 rounded-xl border-gradient border-gradient-hover bg-surface-2 p-4 transition-colors"
            >
              <div className="flex w-full items-start gap-2">
                <Icon className="h-9 w-9 shrink-0 text-primary" strokeWidth={1} />
                <div className="flex min-w-0 flex-1 flex-col gap-2">
                  <h3 className="font-semibold">{title}</h3>
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
