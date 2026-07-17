export function WhatIs() {
  return (
    <section id="dfs-chain" className="mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-8">
      <div className="card-surface flex flex-col gap-6 py-4 px-8 lg:flex-row lg:items-center">
        <div className="w-full lg:w-3/9">
          <span className="text-sm font-medium text-primary">What is DFS Chain?</span>
          <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
            The AI-Integrated Blockchain for Real-World Business
          </h2>
          <p className="mt-4 text-muted-foreground">
            DFS Chain merges AI and blockchain to power the next generation of Web3 business.
          </p>
        </div>

        <div className="flex w-full items-center justify-center lg:w-6/9">
          <img
            src="/ai/dfschain_question_white.png"
            alt="DFS Chain ecosystem layers — AI, blockchain, and business"
            className="w-full object-contain dark:hidden"
          />
          <img
            src="/ai/dfschain_question.png"
            alt="DFS Chain ecosystem layers — AI, blockchain, and business"
            className="hidden w-full object-contain dark:block"
          />
        </div>
      </div>
    </section>
  );
}
