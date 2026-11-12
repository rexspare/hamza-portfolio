"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ExternalLink, MapPin } from "lucide-react";
import { SectionHeader } from "@/app/components/ui/SectionHeader";
import { DURATION, EASE_OUT } from "@/app/lib/motion";
import type { ExperienceData } from "@/app/types/portfolio";

interface ExperienceProps {
  data: ExperienceData;
}

export function Experience({ data }: ExperienceProps) {
  const experiences = data.sections.flatMap((section) => section.experiences);

  return (
    <section id="experience" className="section-padding relative">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 xl:max-w-7xl">
        <SectionHeader
          label="Experience"
          title={data.title}
          description={data.description}
        />

        <div className="relative">
          <div
            aria-hidden
            className="timeline-line absolute bottom-0 left-[19px] top-0 hidden w-px md:block"
          />

          <div className="space-y-6">
            {experiences.map((exp, idx) => (
              <ExperienceCard key={`${exp.company}-${idx}`} experience={exp} index={idx} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({
  experience,
  index,
}: {
  experience: {
    title: string;
    company: string;
    company_url: string;
    logo_path: string;
    duration: string;
    location: string;
    description: string[];
  };
  index: number;
}) {
  const [expanded, setExpanded] = useState(index === 0);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: DURATION.slow, delay: index * 0.06, ease: EASE_OUT }}
      className="relative md:pl-14"
    >
      <div
        aria-hidden
        className="absolute left-3 top-8 hidden size-2.5 -translate-x-1/2 rounded-full border border-border bg-background ring-4 ring-background md:block"
      />

      <div className="surface-card rounded-2xl p-5 sm:p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
          <div className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border bg-surface-hover">
            <Image
              src={`/${experience.logo_path}`}
              alt={experience.company}
              width={56}
              height={56}
              className="size-full object-cover"
            />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-foreground">{experience.title}</h3>
                <a
                  href={experience.company_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-1 inline-flex cursor-pointer items-center gap-1.5 text-sm font-medium text-accent-muted transition-colors duration-200 hover:text-foreground"
                >
                  {experience.company}
                  <ExternalLink
                    className="size-3.5 opacity-60 transition-opacity group-hover:opacity-100"
                    strokeWidth={1.75}
                  />
                </a>
              </div>
              <div className="text-right">
                <p className="font-mono text-xs text-muted">{experience.duration}</p>
                <p className="mt-1 inline-flex items-center gap-1 text-xs text-subtle">
                  <MapPin className="size-3" strokeWidth={1.75} />
                  {experience.location}
                </p>
              </div>
            </div>

            <AnimatePresence initial={false}>
              {expanded && (
                <motion.ul
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: DURATION.base, ease: EASE_OUT }}
                  className="mt-5 space-y-3 overflow-hidden border-t border-border pt-5"
                >
                  {experience.description.map((item, i) => (
                    <li key={i} className="flex gap-3 text-sm leading-relaxed text-muted">
                      <span className="mt-2 size-1 shrink-0 rounded-full bg-accent-muted" />
                      <span>{item}</span>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>

            <button
              type="button"
              aria-expanded={expanded}
              onClick={() => setExpanded((value) => !value)}
              className="mt-4 inline-flex cursor-pointer items-center gap-1.5 text-sm font-medium text-foreground transition-colors duration-200 hover:text-accent-muted"
            >
              {expanded ? "Collapse details" : "View achievements"}
              <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown className="size-4" strokeWidth={1.75} />
              </motion.span>
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
