import { Sparkles } from "lucide-react";

interface TickerProps {
  text: string;
}

export function Ticker({ text }: TickerProps) {
  return (
    <div className="relative z-40 flex h-10 items-center overflow-hidden bg-red text-white sm:h-12" role="marquee">
      <div className="flex w-max animate-marquee items-center gap-10 whitespace-nowrap">
        {[0, 1].map((rep) => (
          <span key={rep} className="flex items-center gap-10 pl-10 text-sm font-semibold sm:text-[15px]">
            <span className="flex items-center gap-2">
              <Sparkles size={14} className="text-gold-light" aria-hidden />
              {text}
            </span>
            <span className="flex items-center gap-2">
              <Sparkles size={14} className="text-gold-light" aria-hidden />
              {text}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
