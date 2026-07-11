export const THEME_STORAGE_KEY = "difinesai.theme";

export type ThemeMode = "dark" | "light";

export function getPreferredTheme(): ThemeMode {
  if (typeof window === "undefined") return "dark";
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    /* ignore */
  }
  return "dark";
}

/**
 * Toggle the `difinesai-dark` class on all `.difinesai-scope` elements. We do
 * NOT touch `document.documentElement` because the main dfs-official site uses
 * `.dark` on <html> for its own theming and we must not collide.
 */
export function applyTheme(isDark: boolean): void {
  if (typeof document === "undefined") return;
  const scopes = document.querySelectorAll(".difinesai-scope");
  scopes.forEach((el) => el.classList.toggle("difinesai-dark", isDark));
}

export function setTheme(mode: ThemeMode): void {
  applyTheme(mode === "dark");
  try {
    localStorage.setItem(THEME_STORAGE_KEY, mode);
  } catch {
    /* ignore */
  }
}
