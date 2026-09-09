import type { ReactNode } from "react";
import { cn } from "../../lib/utils";

interface SectionHeaderProps {
  kicker: string;
  title: ReactNode;
  subtitle?: string;
  align?: "center" | "left";
  light?: boolean;
}

export function SectionHeader({ kicker, title, subtitle, align = "center", light = false }: SectionHeaderProps) {
  const centered = align === "center";

  return (
    <div className={cn("flex flex-col gap-3", centered ? "items-center text-center" : "items-start text-left")}>
      <span
        className={cn(
          "inline-flex items-center gap-2 rounded-pill px-4 py-1.5 text-xs font-bold uppercase tracking-wider",
          light ? "border border-gold/40 bg-white/5 text-gold-light" : "border border-red/20 bg-red/5 text-red"
        )}
      >
        {kicker}
      </span>
      <h2 className={cn("text-3xl font-extrabold sm:text-4xl", light ? "text-white" : "text-text-dark")}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn("max-w-xl text-base", centered ? "" : "max-w-lg", light ? "text-cream/75" : "text-text-muted")}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
