import { Rocket, Boxes, CircleDollarSign, Users, Bot, MessageSquare } from "lucide-react";

import { AiConsultantPreview } from "./AiConsultantPreview";

const BUILDER_ITEMS = [
  { icon: Rocket, label: "Launch Token", desc: "Create & launch tokens in minutes." },
  { icon: Boxes, label: "Launch DApp", desc: "Build scalable DApps on DFS Chain." },
  {
    icon: CircleDollarSign,
    label: "Raise Funding",
    desc: "Connect with investors and raise capital.",
  },
  { icon: Users, label: "Create Community", desc: "Grow and engage your Web3 community." },
  { icon: Bot, label: "AI Automation", desc: "Automate workflows and save time." },
  {
    icon: MessageSquare,
    label: "Business Consulting",
    desc: "Get expert advice for every decision.",
  },
];

export function Web3Builders() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-8">
      <div className="card-surface p-6 sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="w-full lg:w-[45%]">
            <h2 className="text-2xl font-semibold sm:text-3xl">Built for Web3 Builders</h2>
            <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {BUILDER_ITEMS.map(({ icon: Icon, label, desc }) => (
                <div
                  key={label}
                  className="flex flex-col rounded-xl border-gradient border-gradient-hover bg-surface-2 px-1 py-5 text-center transition-colors"
                >
                  <Icon className="mx-auto h-9 w-9 text-primary" strokeWidth={1} />
                  <span className="mt-2 text-sm font-medium text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-[55%]">
            <AiConsultantPreview />
          </div>
        </div>
      </div>
    </section>
  );
}
