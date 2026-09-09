import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const inputId = id ?? props.name;
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-semibold text-text-dark">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "h-13 w-full rounded-[12px] border bg-white px-4 text-[15px] text-text-dark placeholder:text-text-muted/70",
            "transition-colors focus:outline-none focus:ring-2 focus:ring-gold/50",
            error ? "border-red" : "border-black/10 focus:border-gold",
            className
          )}
          style={{ height: "52px" }}
          aria-invalid={Boolean(error)}
          {...props}
        />
        {error && <span className="text-sm text-red">{error}</span>}
      </div>
    );
  }
);
Input.displayName = "Input";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const inputId = id ?? props.name;
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-semibold text-text-dark">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          className={cn(
            "w-full rounded-[12px] border bg-white px-4 py-3 text-[15px] text-text-dark placeholder:text-text-muted/70",
            "min-h-[150px] transition-colors focus:outline-none focus:ring-2 focus:ring-gold/50",
            error ? "border-red" : "border-black/10 focus:border-gold",
            className
          )}
          aria-invalid={Boolean(error)}
          {...props}
        />
        {error && <span className="text-sm text-red">{error}</span>}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";
