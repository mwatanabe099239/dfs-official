"use client";

import { useCallback, useEffect, useState } from "react";

import { applyTheme, getPreferredTheme, setTheme, type ThemeMode } from "../lib/theme";

export function useTheme() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const preferred = getPreferredTheme() === "dark";
    setIsDark(preferred);
    applyTheme(preferred);
  }, []);

  const toggle = useCallback(() => {
    setIsDark((current) => {
      const nextIsDark = !current;
      const next: ThemeMode = nextIsDark ? "dark" : "light";
      setTheme(next);
      return nextIsDark;
    });
  }, []);

  const setDark = useCallback((dark: boolean) => {
    setIsDark(dark);
    applyTheme(dark);
    setTheme(dark ? "dark" : "light");
  }, []);

  return { isDark, toggle, setDark };
}
