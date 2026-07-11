import { Database, Network, Brain, MessageSquare, Target, ChevronRight } from "lucide-react";

const NODES = [
  {
    icon: Database,
    title: "Knowledge Sources",
    items: ["Whitepapers", "Docs & Articles", "On-chain Data", "Market Insights"],
  },
  {
    icon: Network,
    title: "Vector Database",
    items: ["Store & Index", "Semantic Search", "Embeddings", "High Accuracy"],
  },
  {
    icon: Brain,
    title: "AI Reasoning Layer",
    items: ["AI Processing", "RAG + LLMs", "Context Analysis", "Smart Reasoning"],
  },
  {
    icon: MessageSquare,
    title: "DFS AI Consultant",
    items: [
      "Natural Conversation",
      "Real-time Insights",
      "Business Guidance",
      "24/7 Availability",
    ],
  },
  {
    icon: Target,
    title: "Actionable Recommendations",
    items: ["Actionable Plans", "Strategy Maps", "Step-by-Step Actions", "Business Impact"],
  },
];

export function KnowledgeGraph() {
  return (
    <section id="ai-consultant" className="mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-8">
      <div className="card-surface p-6 sm:p-8">
        <span className="text-sm font-medium text-primary">Powered By</span>
        <h2 className="text-2xl font-semibold sm:text-3xl">DIFINES Knowledge Graph (RAG)</h2>

        <div className="mt-2 flex flex-col gap-1 lg:flex-row lg:items-stretch">
          {NODES.map((node, i) => (
            <div key={node.title} className="flex flex-1 items-center gap-1">
              <div className="w-full rounded-xl border-gradient bg-surface-2 p-5">
                <div className="flex items-start gap-2">
                  <span className="text-primary">
                    <node.icon className="h-9 w-9" strokeWidth={1} />
                  </span>
                  <span className="font-semibold leading-tight ">{node.title}</span>
                </div>
                <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                  {node.items.map((it) => (
                    <li key={it} style={{ whiteSpace: "nowrap" }}><span className="text-primary">•</span> {it}</li>
                  ))}
                </ul>
              </div>
              {i < NODES.length - 1 && (
                <ChevronRight className="hidden h-5 w-5 shrink-0 text-primary lg:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
