import { Link } from "react-router-dom";
import { MessageCircle, Sparkles, Star, ArrowRight, Gem } from "lucide-react";
import { Button } from "../ui/Button";
import { useSiteSettings } from "../../hooks/useSiteSettings";
import { openWhatsApp } from "../../lib/whatsapp";

const SPARKLE_DOTS = [
  { top: "12%", left: "8%", size: 10, delay: "0s" },
  { top: "22%", left: "42%", size: 6, delay: "0.6s" },
  { top: "68%", left: "16%", size: 8, delay: "1.2s" },
  { top: "80%", left: "48%", size: 6, delay: "0.3s" },
  { top: "18%", left: "92%", size: 8, delay: "0.9s" },
  { top: "58%", left: "88%", size: 6, delay: "1.5s" },
];

export function Hero() {
  const { settings } = useSiteSettings();

  return (
    <section className="relative overflow-hidden bg-navy bg-grid-navy">
      {/* Ambient glows */}
      <div
        className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-red/30 blur-[100px] animate-pulse-glow"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-gold/20 blur-[110px] animate-pulse-glow"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-light/10 blur-[90px]"
        aria-hidden
      />

      {/* Scattered sparkle particles */}
      {SPARKLE_DOTS.map((dot, i) => (
        <Star
          key={i}
          className="pointer-events-none absolute animate-pulse-glow fill-gold-light text-gold-light"
          style={{ top: dot.top, left: dot.left, width: dot.size, height: dot.size, animationDelay: dot.delay }}
          aria-hidden
        />
      ))}

      <div className="container-page relative grid min-h-[560px] items-center gap-10 py-16 sm:min-h-[640px] sm:py-20 lg:min-h-[680px] lg:grid-cols-2 lg:py-24">
        <div className="flex max-w-[600px] flex-col items-start gap-6">
          <span className="inline-flex items-center gap-2 rounded-pill border border-gold/40 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-wider text-gold-light">
            <Sparkles size={14} aria-hidden />
            MRV Crackers • Premium Festive Store
          </span>

          <h1 className="text-4xl font-extrabold leading-[1.08] text-white text-shadow-soft sm:text-5xl lg:text-[64px]">
            Celebrate Diwali <br />
            With <span className="text-gold-light">More Spark.</span>
          </h1>

          <p className="max-w-[520px] text-base leading-relaxed text-cream/80 sm:text-lg">
            Explore a wide range of quality crackers, build your own estimate,
            and place your order in minutes — straight to WhatsApp.
          </p>

          <div className="flex items-center gap-3 text-gold-light/60" aria-hidden>
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold-light/50" />
            <Gem size={14} />
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold-light/50" />
          </div>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link to="/estimate" className="w-full sm:w-auto">
              <Button size="lg" fullWidth icon={<ArrowRight size={18} />} className="sm:w-auto">
                Browse Crackers
              </Button>
            </Link>
            <Button
              variant="outline-light"
              size="lg"
              icon={<MessageCircle size={18} />}
              onClick={() => openWhatsApp(settings.whatsapp_number, "Hello MRV Crackers, I'd like to place an order.")}
            >
              Order on WhatsApp
            </Button>
          </div>
        </div>

        <div className="relative mx-auto flex h-[280px] w-full max-w-[520px] items-center justify-center sm:h-[380px] lg:h-[500px]">
          <div className="absolute inset-0 rounded-full bg-gold/10 blur-3xl" aria-hidden />

          {/* Concentric decorative rings, evoking the mandala/ornamental motifs */}
          <div
            className="pointer-events-none absolute h-[85%] w-[85%] rounded-full border border-dashed border-gold-light/20"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute h-[60%] w-[60%] rounded-full border border-gold-light/15"
            aria-hidden
          />

          {/* Smaller accent bursts around the main sparkle */}
          <Sparkles
            className="absolute left-[8%] top-[18%] h-10 w-10 rotate-[-15deg] text-red-light/70 drop-shadow-lg sm:h-12 sm:w-12"
            strokeWidth={1.25}
            aria-hidden
          />
          <Star
            className="absolute bottom-[14%] right-[10%] h-8 w-8 fill-gold-light/80 text-gold-light/80 drop-shadow-lg sm:h-10 sm:w-10"
            aria-hidden
          />

          <Sparkles
            className="relative h-40 w-40 text-gold-light drop-shadow-2xl sm:h-56 sm:w-56 lg:h-72 lg:w-72"
            strokeWidth={1}
            aria-hidden
          />
        </div>
      </div>
    </section>
  );
}
