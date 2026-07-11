import type { Metadata } from "next";

import { CTASection } from "../../src/difinesai/components/difines/CTASection";
import { Ecosystem } from "../../src/difinesai/components/difines/Ecosystem";
import { Features } from "../../src/difinesai/components/difines/Features";
import { Footer } from "../../src/difinesai/components/difines/Footer";
import { Hero } from "../../src/difinesai/components/difines/Hero";
import { KnowledgeGraph } from "../../src/difinesai/components/difines/KnowledgeGraph";
import { Navbar } from "../../src/difinesai/components/difines/Navbar";
import { Web3Builders } from "../../src/difinesai/components/difines/Web3Builders";
import { WhatIs } from "../../src/difinesai/components/difines/WhatIs";

export const metadata: Metadata = {
  title: "DIFINES — Launch Your Business with DFS Chain + AI",
  description:
    "AI-powered business consultant on the DIFINES ecosystem. Build, fund and scale Web3 ventures with DFS Chain.",
};

export default function DifinesAiIndex() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <WhatIs />
        <Features />
        <KnowledgeGraph />
        <Web3Builders />
        <Ecosystem />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
