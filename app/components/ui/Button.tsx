"use client";

import { motion } from "framer-motion";
import { type LucideIcon } from "lucide-react";
import { DURATION, EASE_OUT } from "@/app/lib/motion";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps {
  href: string;
  children: React.ReactNode;
  icon?: LucideIcon;
  variant?: ButtonVariant;
  external?: boolean;
  className?: string;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-accent-fg border border-accent hover:bg-accent/90 hover:border-accent/90 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]",
  secondary:
    "bg-surface text-foreground border border-border hover:border-border-hover hover:bg-surface-hover",
  ghost:
    "bg-transparent text-foreground border border-transparent hover:border-border hover:bg-surface/60",
};

export function Button({
  href,
  children,
  icon: Icon,
  variant = "primary",
  external = false,
  className = "",
}: ButtonProps) {
  return (
    <motion.a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: DURATION.fast, ease: EASE_OUT }}
      className={`group relative inline-flex cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3 text-sm font-medium transition-colors duration-200 ${variants[variant]} ${className}`}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/10 to-transparent transition-transform duration-500 group-hover:translate-x-full"
      />
      {Icon && <Icon className="size-4 shrink-0" strokeWidth={1.75} />}
      {children}
    </motion.a>
  );
}
