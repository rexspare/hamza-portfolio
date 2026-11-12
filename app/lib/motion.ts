"use client";

import { useReducedMotion } from "framer-motion";

export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export const DURATION = {
  fast: 0.15,
  base: 0.25,
  slow: 0.4,
} as const;

export function useMotionSafe() {
  const reduced = useReducedMotion();

  return {
    reduced: Boolean(reduced),
    fadeUp: reduced
      ? { initial: { opacity: 1 }, animate: { opacity: 1 }, whileInView: { opacity: 1 } }
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          whileInView: { opacity: 1, y: 0 },
        },
    transition: (delay = 0) =>
      reduced
        ? { duration: 0 }
        : { duration: DURATION.slow, delay, ease: EASE_OUT },
    hover: reduced ? undefined : { y: -2 },
    tap: reduced ? undefined : { scale: 0.98 },
  };
}
