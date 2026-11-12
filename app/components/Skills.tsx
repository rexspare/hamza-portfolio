"use client";

import { motion } from "framer-motion";
import { TechIcon } from "@/app/components/TechIcon";
import { SectionHeader } from "@/app/components/ui/SectionHeader";
import { DURATION, EASE_OUT } from "@/app/lib/motion";
import type { SkillsData } from "@/app/types/portfolio";

interface SkillsProps {
  data: SkillsData;
}

export function Skills({ data }: SkillsProps) {
  return (
    <section id="skills" className="section-padding relative border-t border-border">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 xl:max-w-7xl">
        <SectionHeader
          label="Capabilities"
          title={data.title}
          description={data.description}
        />

        <div className="grid gap-5 lg:grid-cols-2">
          {data.categories.map((category, cIdx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: DURATION.slow, delay: cIdx * 0.06, ease: EASE_OUT }}
              className="surface-card rounded-2xl p-6"
            >
              <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
                {category.title}
              </h3>
              <div className="mt-5 flex flex-wrap gap-2.5">
                {category.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-2 text-sm text-foreground transition-colors duration-200 hover:border-border-hover hover:bg-surface-hover"
                  >
                    <TechIcon icon={skill.iconifyClass} className="text-base" />
                    <span>{skill.name}</span>
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
