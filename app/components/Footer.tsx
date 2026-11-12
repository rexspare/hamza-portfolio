"use client";

import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { Download, Mail } from "lucide-react";
import { Button } from "@/app/components/ui/Button";
import { Reveal } from "@/app/components/ui/Reveal";
import type { SocialMediaLinks } from "@/app/types/portfolio";

const SOCIAL_LINKS: {
  key: keyof SocialMediaLinks;
  icon: string;
  label: string;
}[] = [
  { key: "github", icon: "mdi:github", label: "GitHub" },
  { key: "linkedin", icon: "mdi:linkedin", label: "LinkedIn" },
  { key: "gitlab", icon: "mdi:gitlab", label: "GitLab" },
  { key: "instagram", icon: "mdi:instagram", label: "Instagram" },
  { key: "whatsapp", icon: "mdi:whatsapp", label: "WhatsApp" },
  { key: "telegram", icon: "mdi:telegram", label: "Telegram" },
];

interface FooterProps {
  name: string;
  social: SocialMediaLinks;
  resumeUrl?: string;
}

export function Footer({ name, social, resumeUrl }: FooterProps) {
  return (
    <footer id="contact" className="section-padding relative border-t border-border">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 xl:max-w-7xl">
        <div className="surface-card rounded-3xl px-6 py-12 text-center sm:px-10 sm:py-14">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
              Connect
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Let&apos;s build something exceptional.
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted">
              Open to senior mobile engineering roles, product collaborations, and
              high-impact freelance engagements.
            </p>
          </Reveal>

          <Reveal delay={0.15} className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {social.gmail && (
              <Button href={`mailto:${social.gmail}`} icon={Mail} variant="primary">
                {social.gmail}
              </Button>
            )}
            {resumeUrl && (
              <Button href={resumeUrl} icon={Download} variant="secondary" external>
                Download Resume
              </Button>
            )}
          </Reveal>

          <Reveal delay={0.2} className="mt-10 flex flex-wrap justify-center gap-3">
            {SOCIAL_LINKS.map(({ key, icon, label }) => {
              const url = social[key];
              if (!url) return null;

              return (
                <motion.a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex size-11 cursor-pointer items-center justify-center rounded-full border border-border bg-background text-muted transition-colors duration-200 hover:border-border-hover hover:bg-surface-hover hover:text-foreground"
                >
                  <Icon icon={icon} className="text-xl" />
                </motion.a>
              );
            })}
          </Reveal>

          <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">
            © {new Date().getFullYear()} {name}
          </p>
        </div>
      </div>
    </footer>
  );
}
