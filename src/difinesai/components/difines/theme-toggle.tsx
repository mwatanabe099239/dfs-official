"use client";

import { Moon, Sun } from "lucide-react";

import { useTheme } from "../../hooks/use-theme";

export function ThemeToggle() {
  const { isDark, toggle } = useTheme();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle color theme"
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border-gradient border-gradient-hover bg-surface-2 text-foreground transition-colors hover:text-primary"
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
