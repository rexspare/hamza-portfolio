"use client";

import { motion } from "framer-motion";
import { DURATION, EASE_OUT } from "@/app/lib/motion";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
  delay?: number;
}

export function GlassCard({
  children,
  className = "",
  hover = true,
  onClick,
  delay = 0,
}: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: DURATION.slow, delay, ease: EASE_OUT }}
      whileHover={hover ? { y: -2 } : undefined}
      onClick={onClick}
      className={`surface-card rounded-2xl ${onClick ? "cursor-pointer" : ""} ${className}`}
    >
      {children}
    </motion.div>
  );
}
