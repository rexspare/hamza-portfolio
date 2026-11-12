export interface ResolvedTechIcon {
  icon: string;
  className: string;
}

/** Dark `logos-*` icons that disappear on OLED backgrounds → light-friendly replacements. */
const ICON_OVERRIDES: Record<string, Omit<ResolvedTechIcon, "className"> & { colorClass: string }> = {
  "logos-nextjs": { icon: "simple-icons:nextdotjs", colorClass: "text-foreground" },
  "logos:nextjs-icon": { icon: "simple-icons:nextdotjs", colorClass: "text-foreground" },
  "logos-supabase": { icon: "simple-icons:supabase", colorClass: "text-[#3ECF8E]" },
  "logos-vercel": { icon: "simple-icons:vercel", colorClass: "text-foreground" },
  "logos-sentry": { icon: "simple-icons:sentry", colorClass: "text-[#FF3621]" },
  "logos-express": { icon: "simple-icons:express", colorClass: "text-foreground" },
  "logos:php-alt": { icon: "simple-icons:php", colorClass: "text-[#777BB4]" },
  "logos-php": { icon: "simple-icons:php", colorClass: "text-[#777BB4]" },
};

export function resolveTechIcon(iconifyClass: string, sizeClass = "text-base"): ResolvedTechIcon {
  const override = ICON_OVERRIDES[iconifyClass];

  if (override) {
    return {
      icon: override.icon,
      className: `${sizeClass} ${override.colorClass}`,
    };
  }

  return { icon: iconifyClass, className: sizeClass };
}
