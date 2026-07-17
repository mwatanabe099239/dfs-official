import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 pb-8 pt-10 sm:px-6 lg:px-8">
        <div className="relative">
          <div className="relative z-10 w-full max-w-xl lg:max-w-[42%]">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border-gradient bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              AI-Powered Business Consultant
            </span>

            <h1 className="mt-6 text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Launch Your Business with{" "}
              <span className="text-primary">DFS Chain + AI</span>
            </h1>

            <p className="mt-6 text-2xl font-semibold text-primary">Build. Fund. Scale.</p>

            <p className="mt-4 max-w-md text-base text-muted-foreground">
              AI business consulting built for the DFS Chain ecosystem to help you build, fund, and
              grow.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/ai/consultant"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
              >
                Try AI Consultant
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#dfs-chain"
                className="inline-flex items-center gap-2 rounded-md border-gradient border-gradient-hover bg-surface-2 px-6 py-3 text-sm font-semibold text-foreground transition-colors"
              >
                Explore DFS Chain
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          <img
            src="/ai/hero-infinity_white.png"
            alt="Launch Your Business with DFS Chain + AI"
            width={960}
            height={960}
            className="pointer-events-none absolute -right-10 top-0 hidden h-full w-auto max-w-[58%] object-contain object-right lg:block dark:hidden"
          />
          <img
            src="/ai/hero-infinity.png"
            alt="Launch Your Business with DFS Chain + AI"
            width={960}
            height={960}
            className="pointer-events-none absolute -right-10 top-0 hidden h-full w-auto max-w-[58%] object-contain object-right lg:dark:block"
          />
        </div>

        <div className="lg:hidden">
          <img
            src="/ai/hero-infinity_white.png"
            alt="Launch Your Business with DFS Chain + AI"
            width={960}
            height={960}
            className="mx-auto mt-10 w-full max-w-sm object-contain sm:max-w-md dark:hidden"
          />
          <img
            src="/ai/hero-infinity.png"
            alt="Launch Your Business with DFS Chain + AI"
            width={960}
            height={960}
            className="mx-auto mt-10 hidden w-full max-w-sm object-contain sm:max-w-md dark:block"
          />
        </div>
      </div>
    </section>
  );
}
