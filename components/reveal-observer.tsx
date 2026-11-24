"use client";

import { useEffect } from "react";

/**
 * One observer for the whole page: any element with `data-reveal` fades up
 * once when it enters the viewport. Elements are visible without JS (the
 * hiding CSS only applies under `.js`), and reduced motion gets opacity only.
 */
export function RevealObserver() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-shown])");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.setAttribute("data-shown", ""));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // Also reveal anything already above the viewport (restored scroll, anchor jumps).
          if (!entry.isIntersecting && entry.boundingClientRect.top >= 0) continue;
          entry.target.setAttribute("data-shown", "");
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
