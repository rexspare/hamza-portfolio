"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Download, Mail } from "lucide-react";
import { Button } from "@/app/components/ui/Button";
import { DURATION, EASE_OUT } from "@/app/lib/motion";
import type { PortfolioData } from "@/app/types/portfolio";

interface HeroProps {
  data: Pick<PortfolioData, "name" | "title" | "sub_title" | "description">;
  resumeUrl?: string;
}

const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.slow, ease: EASE_OUT },
  },
};

export function Hero({ data, resumeUrl }: HeroProps) {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="hero"
      className="hero-ambient relative flex min-h-screen items-center overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent via-transparent to-background" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-20 pt-28 sm:px-6 sm:pt-32 lg:px-8 xl:max-w-7xl">
        <motion.div
          variants={reducedMotion ? undefined : stagger}
          initial={reducedMotion ? false : "hidden"}
          animate="show"
          className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16"
        >
          <div>
            <motion.p
              variants={item}
              className="font-mono text-xs uppercase tracking-[0.24em] text-muted"
            >
              Senior Mobile Engineer
            </motion.p>

            <motion.h1
              variants={item}
              className="mt-5 font-display text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-foreground"
            >
              {data.name}
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-4 max-w-xl text-lg font-medium leading-snug text-foreground sm:text-xl"
            >
              {data.title}
            </motion.p>

            <motion.p
              variants={item}
              className="mt-3 font-mono text-sm text-accent-muted"
            >
              {data.sub_title.replace(/\s*🚀\s*/g, "").trim()}
            </motion.p>

            <motion.p
              variants={item}
              className="mt-6 max-w-xl text-base leading-relaxed text-muted"
            >
              {data.description}
            </motion.p>

            <motion.div
              variants={item}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              {resumeUrl && (
                <Button href={resumeUrl} icon={Download} variant="primary" external>
                  View Resume
                </Button>
              )}
              <Button href="#contact" icon={Mail} variant="secondary">
                Start a Conversation
              </Button>
            </motion.div>
          </div>

          <motion.div variants={item} className="relative mx-auto w-full max-w-sm lg:max-w-none">
            <div className="surface-card relative overflow-hidden rounded-2xl p-1.5">
              <div className="absolute inset-x-8 top-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />
              <Image
                src="/HamzaPro2.png"
                alt={data.name}
                width={520}
                height={520}
                className="aspect-square w-full rounded-xl object-cover"
                priority
              />
            </div>
            <div className="absolute -bottom-4 -left-4 hidden rounded-xl border border-border bg-surface px-4 py-3 lg:block">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-subtle">
                Shipped
              </p>
              <p className="mt-1 font-display text-2xl font-semibold text-foreground">50+</p>
              <p className="text-xs text-muted">Production apps</p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.a
        href="#experience"
        aria-label="Scroll to experience"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: DURATION.slow }}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 cursor-pointer flex-col items-center gap-2 text-subtle transition-colors duration-200 hover:text-muted"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.2em]">Explore</span>
        <motion.span
          animate={reducedMotion ? undefined : { y: [0, 6, 0] }}
          transition={
            reducedMotion
              ? undefined
              : { repeat: Infinity, duration: 2.4, ease: "easeInOut" }
          }
        >
          <ArrowDown className="size-4" strokeWidth={1.75} />
        </motion.span>
      </motion.a>
    </section>
  );
}
