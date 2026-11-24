"use client";

import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

/**
 * Flips between light and dark. The initial theme is set before paint by the
 * script in app/layout.tsx, so this renders both icons and lets CSS pick one:
 * no hydration mismatch, no flash.
 */
export function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const next: Theme = root.dataset.theme === "dark" ? "light" : "dark";
    const apply = () => {
      root.dataset.theme = next;
      try {
        localStorage.setItem("theme", next);
      } catch {}
    };
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce && "startViewTransition" in document) {
      document.startViewTransition(apply);
    } else {
      apply();
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="group relative ml-1 grid size-9 place-items-center rounded-full text-muted transition-colors hover:bg-paper-sunk hover:text-ink"
      aria-label="Toggle dark mode"
    >
      <Sun
        aria-hidden
        className="size-[18px] transition-transform duration-300 ease-out group-active:rotate-45 [[data-theme=dark]_&]:hidden"
        strokeWidth={1.75}
      />
      <Moon
        aria-hidden
        className="hidden size-[18px] transition-transform duration-300 ease-out group-active:-rotate-12 [[data-theme=dark]_&]:block"
        strokeWidth={1.75}
      />
    </button>
  );
}
