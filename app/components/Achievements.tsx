"use client";

import { motion } from "framer-motion";
import {
  Calendar,
  Gauge,
  Rocket,
  Smartphone,
  TrendingUp,
} from "lucide-react";
import { SectionHeader } from "@/app/components/ui/SectionHeader";
import { DURATION, EASE_OUT } from "@/app/lib/motion";

const STATS = [
  { value: 50, suffix: "+", label: "Production apps", icon: Smartphone },
  { value: 70, suffix: "%", label: "Stability improvement", icon: TrendingUp },
  { value: 50, suffix: "%", label: "Faster load times", icon: Rocket },
  { value: 6, suffix: "+", label: "Years experience", icon: Calendar },
  { value: 60, suffix: " FPS", label: "Target performance", icon: Gauge },
];

export function Achievements() {
  return (
    <section id="achievements" className="section-padding relative border-t border-border">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 xl:max-w-7xl">
        <SectionHeader
          label="Impact"
          title="Highlights"
          description="Key metrics and achievements from real production work."
        />

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
          {STATS.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: DURATION.slow, delay: idx * 0.06, ease: EASE_OUT }}
                whileHover={{ y: -2 }}
                className="surface-card rounded-2xl p-5 text-center sm:p-6"
              >
                <Icon className="mx-auto size-5 text-muted" strokeWidth={1.75} />
                <p className="mt-4 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                  {stat.value}
                  <span className="text-muted">{stat.suffix}</span>
                </p>
                <p className="mt-2 text-xs leading-relaxed text-muted sm:text-sm">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
