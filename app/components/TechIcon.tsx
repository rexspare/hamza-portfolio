import { Icon } from "@iconify/react";
import { resolveTechIcon } from "@/app/lib/tech-icons";

interface TechIconProps {
  icon: string;
  className?: string;
}

export function TechIcon({ icon, className = "text-base" }: TechIconProps) {
  const resolved = resolveTechIcon(icon, className);

  return <Icon icon={resolved.icon} className={resolved.className} aria-hidden />;
}
