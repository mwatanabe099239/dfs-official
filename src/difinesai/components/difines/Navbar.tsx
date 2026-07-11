"use client";

import Link from "next/link";
import { ArrowRight, Menu } from "lucide-react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

import { Logo } from "./Logo";
import { ThemeToggle } from "./theme-toggle";

const NAV_LINKS = [
  { label: "DFS Chain", href: "#dfs-chain" },
  { label: "Ecosystem", href: "#ecosystem" },
  { label: "AI Consultant", href: "#ai-consultant" },
  { label: "Solutions", href: "#solutions" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b-gradient bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Link href="/difinesai" className="shrink-0">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />

          <Link
            href="/difinesai/consultant"
            className="glow-primary hidden items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03] sm:inline-flex sm:px-5 lg:inline-flex"
          >
            AI Consultant
            <ArrowRight className="h-4 w-4" />
          </Link>

          <Sheet>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Open menu"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border-gradient border-gradient-hover bg-surface-2 text-foreground transition-colors hover:text-primary lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="z-[60] flex h-full w-[min(100vw-2rem,320px)] flex-col !fixed border-0 bg-background p-0 sm:max-w-[320px]"
            >
              <div className="flex h-full min-h-0 flex-col border-l-gradient">
              <SheetTitle className="sr-only">Navigation menu</SheetTitle>

              <div className="border-b-gradient px-5 py-4">
                <Logo />
              </div>

              <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4" aria-label="Mobile navigation">
                {NAV_LINKS.map((link) => (
                  <SheetClose asChild key={link.label}>
                    <a
                      href={link.href}
                      className="rounded-lg px-3 py-3 text-base font-medium text-foreground transition-colors hover:bg-surface-2 hover:text-primary"
                    >
                      {link.label}
                    </a>
                  </SheetClose>
                ))}
              </nav>

              <div className="border-t-gradient p-4">
                <SheetClose asChild>
                  <Link
                    href="/difinesai/consultant"
                    className="glow-primary inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
                  >
                    AI Consultant
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </SheetClose>
              </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
