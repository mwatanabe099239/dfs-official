import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-2xl border-gradient bg-background">
        <div className="pointer-events-none absolute inset-0 z-0 hidden lg:block">
          <img
            src="/ai/cta_1.png"
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="absolute left-15 top-1/2 h-[85%] w-auto max-w-[42%] -translate-y-1/2 object-contain object-left sm:h-[90%] sm:max-w-[18%]"
          />
          <img
            src="/ai/cta_2_white.png"
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="absolute right-0 top-1/2 h-full w-auto max-w-[50%] -translate-y-1/2 object-contain object-right dark:hidden"
          />
          <img
            src="/ai/cta_2.png"
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="absolute right-0 top-1/2 hidden h-full w-auto max-w-[50%] -translate-y-1/2 object-contain object-right dark:block"
          />
        </div>

        <div className="relative z-10 px-6 text-center py-6">
          <h2 className="text-2xl font-semibold sm:text-3xl">Ready to Build the Future?</h2>
          <p className="mt-2 text-2xl font-semibold text-primary sm:text-3xl">
            Start Your AI Consultation Today
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-4">
            <Link
              href="/ai/consultant"
              className="glow-primary inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
            >
              AI Consultant
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#dfs-chain"
              className="inline-flex items-center gap-2 rounded-md border-gradient border-gradient-hover bg-transparent px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-primary/5"
            >
              Explore DFS Chain
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
