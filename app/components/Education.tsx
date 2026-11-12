"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { SectionHeader } from "@/app/components/ui/SectionHeader";
import { DURATION, EASE_OUT } from "@/app/lib/motion";
import type { Degree } from "@/app/types/portfolio";

interface EducationProps {
  degrees: Degree[];
}

export function Education({ degrees }: EducationProps) {
  return (
    <section id="education" className="section-padding relative border-t border-border">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 xl:max-w-7xl">
        <SectionHeader
          label="Foundation"
          title="Education"
          description="Academic background and continuous learning."
        />

        <div className="space-y-5">
          {degrees.map((degree, idx) => (
            <motion.article
              key={degree.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: DURATION.slow, delay: idx * 0.08, ease: EASE_OUT }}
              className="surface-card flex flex-col gap-6 rounded-2xl p-6 sm:flex-row sm:items-start sm:p-8"
            >
              <div className="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border bg-surface-hover">
                <Image
                  src={`/${degree.logo_path}`}
                  alt={degree.alt_name || degree.title}
                  width={80}
                  height={80}
                  className="size-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <a
                  href={degree.website_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex cursor-pointer items-center gap-2 text-xl font-semibold text-foreground transition-colors duration-200 hover:text-accent-muted"
                >
                  {degree.title}
                  <ExternalLink
                    className="size-4 opacity-0 transition-opacity group-hover:opacity-100"
                    strokeWidth={1.75}
                  />
                </a>
                <p className="mt-1 text-sm font-medium text-muted">{degree.subtitle}</p>
                {degree.duration && (
                  <p className="mt-1 font-mono text-xs text-subtle">{degree.duration}</p>
                )}
                <ul className="mt-5 space-y-3">
                  {degree.descriptions.map((desc, i) => (
                    <li key={i} className="flex gap-3 text-sm leading-relaxed text-muted">
                      <span className="mt-2 size-1 shrink-0 rounded-full bg-border" />
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
