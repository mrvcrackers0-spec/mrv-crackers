import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/utils";

type Variant = "primary" | "secondary" | "tertiary" | "whatsapp" | "outline-light";
type Size = "md" | "lg" | "sm";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  fullWidth?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-red text-white hover:bg-red-dark shadow-glow-red border border-transparent",
  secondary:
    "bg-transparent text-red border-2 border-red hover:bg-red/5",
  tertiary: "bg-transparent text-red hover:underline border-0 shadow-none",
  whatsapp: "bg-[#25D366] text-white hover:brightness-95 border border-transparent",
  "outline-light":
    "bg-white/10 text-white border border-white/30 hover:bg-white/20 backdrop-blur-sm",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-10 px-4 text-sm rounded-btn",
  md: "h-12 px-6 text-base rounded-btn",
  lg: "h-14 px-8 text-base rounded-btn",
};

export function Button({
  variant = "primary",
  size = "md",
  icon,
  fullWidth,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200",
        "hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]",
        "disabled:opacity-50 disabled:pointer-events-none disabled:translate-y-0",
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}
