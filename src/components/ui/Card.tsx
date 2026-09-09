import type { HTMLAttributes } from "react";
import { cn } from "../../lib/utils";

type CardVariant = "light" | "dark" | "festive";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
}

const variantClasses: Record<CardVariant, string> = {
  light: "bg-white border border-black/[0.06] shadow-soft",
  dark: "bg-navy-light/40 border border-white/10 text-white shadow-soft backdrop-blur-sm",
  festive: "bg-gradient-to-br from-red to-red-dark border border-gold/30 text-white shadow-glow-red",
};

export function Card({ variant = "light", className, ...props }: CardProps) {
  return (
    <div
      className={cn("rounded-card p-6", variantClasses[variant], className)}
      {...props}
    />
  );
}
