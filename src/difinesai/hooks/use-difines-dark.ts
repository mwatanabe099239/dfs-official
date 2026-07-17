"use client";

import { useEffect, useState } from "react";

/**
 * Reflects whether the `.difinesai-dark` class is currently applied to the
 * root `.difinesai-scope` element.
 *
 * Portalled Radix components (Sheet, Dialog, Popover, DropdownMenu, Toast...)
 * render into `<body>`, i.e. *outside* the `.difinesai-scope` wrapper set in
 * `app/ai/layout.tsx`. That means their subtree loses access to our
 * scoped CSS variables and utilities (border-gradient, card-surface,
 * scrollbar-pro, dark-mode overrides, etc.).
 *
 * To restore the scope inside a portalled element we re-apply
 * `difinesai-scope` on its root node, and use this hook to also mirror the
 * current dark/light state.
 */
export function useDifinesDark(): boolean {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const scope = document.querySelector<HTMLElement>(".difinesai-scope");
    if (!scope) return;
    const sync = () => setIsDark(scope.classList.contains("difinesai-dark"));
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(scope, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return isDark;
}
