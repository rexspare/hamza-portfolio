"use client";

import { useRef, useState } from "react";

/**
 * Expands a server-rendered list that CSS collapses to its first `visible`
 * items (see `[data-collapsible]` in globals.css). Every item stays in the
 * HTML, and without JS the list is simply shown in full.
 */
export function ShowAllToggle({ targetId, total, visible }: { targetId: string; total: number; visible: number }) {
  const [expanded, setExpanded] = useState(false);
  const button = useRef<HTMLButtonElement>(null);

  function toggle() {
    const list = document.getElementById(targetId);
    if (!list) return;
    const next = !expanded;
    setExpanded(next);
    list.toggleAttribute("data-expanded", next);

    if (next) {
      // Move focus to the first newly shown item so keyboard users land on it.
      list.querySelectorAll<HTMLElement>(":scope > li")[visible]?.querySelector<HTMLElement>("a")?.focus({ preventScroll: true });
    } else if (button.current && button.current.getBoundingClientRect().top < 0) {
      // Collapsing from far down the page: bring the list back into view.
      list.scrollIntoView({ block: "start" });
    }
  }

  return (
    <button
      ref={button}
      type="button"
      onClick={toggle}
      aria-controls={targetId}
      aria-expanded={expanded}
      className="group mt-8 hidden h-11 items-center gap-2 rounded-full px-5 text-[0.9375rem] font-medium text-ink shadow-[inset_0_0_0_1px_var(--rule-strong)] transition-shadow duration-200 hover:shadow-[inset_0_0_0_1px_var(--ink)] [.js_&]:inline-flex"
    >
      {expanded ? "Show fewer" : `Show all ${total} apps`}
      <svg
        aria-hidden
        viewBox="0 0 16 16"
        className={`size-3.5 text-muted transition-transform duration-300 ease-[var(--ease-out-expo)] ${expanded ? "rotate-180" : ""}`}
      >
        <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
