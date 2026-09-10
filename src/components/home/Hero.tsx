import { Link } from "react-router-dom";
import { MessageCircle, Sparkles, Star, ArrowRight, CheckCircle2 } from "lucide-react";
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
  const discount = Number.isFinite(settings.hero_discount_percent)
    ? Math.round(settings.hero_discount_percent)
    : 40;

  const buyerHighlights = [
    `Up to ${discount}% Off`,
    "171+ Products",
    "Direct WhatsApp Order",
    "No App, No Login",
  ];

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

      <div className="container-page relative grid min-h-[600px] items-center gap-10 py-16 sm:min-h-[660px] sm:py-20 lg:min-h-[700px] lg:grid-cols-2 lg:py-24">
        <div className="flex max-w-[600px] flex-col items-start gap-5">
          <span
            className="animate-fade-slide-up inline-flex items-center gap-2 rounded-pill bg-gradient-to-r from-red to-red-dark px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-white shadow-glow-red"
            style={{ animationDelay: "0ms" }}
          >
            <Sparkles size={14} aria-hidden />
            Up to {discount}% Off • This Festive Season
          </span>

          <h1
            className="animate-fade-slide-up text-4xl font-extrabold leading-[1.08] text-white text-shadow-soft sm:text-5xl lg:text-[60px]"
            style={{ animationDelay: "100ms" }}
          >
            Premium Crackers,<br />
            <span className="text-gold-light">Unbeatable Prices.</span>
          </h1>

          <p
            className="animate-fade-slide-up max-w-[520px] text-base leading-relaxed text-cream/80 sm:text-lg"
            style={{ animationDelay: "200ms" }}
          >
            171+ crackers across 15 categories at direct, festive pricing. Build your
            estimate and send it straight to WhatsApp — no app to install, no account
            to create.
          </p>

          <ul
            className="animate-fade-slide-up flex flex-wrap gap-2.5"
            style={{ animationDelay: "300ms" }}
            aria-label="Why shop with us"
          >
            {buyerHighlights.map((item) => (
              <li
                key={item}
                className="inline-flex items-center gap-1.5 rounded-pill border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-cream/90"
              >
                <CheckCircle2 size={13} className="text-gold-light" aria-hidden />
                {item}
              </li>
            ))}
          </ul>

          <div
            className="animate-fade-slide-up mt-1 flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
            style={{ animationDelay: "400ms" }}
          >
            <Link to="/estimate" className="w-full sm:w-auto">
              <Button size="lg" fullWidth icon={<ArrowRight size={18} />} className="sm:w-auto">
                Shop & Save Now
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

          {/* Concentric decorative rings — outer one slowly orbits for depth */}
          <div
            className="animate-spin-slow pointer-events-none absolute h-[85%] w-[85%] rounded-full border border-dashed border-gold-light/20"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute h-[60%] w-[60%] rounded-full border border-gold-light/15"
            aria-hidden
          />

          {/* Smaller accent bursts around the main sparkle */}
          <Sparkles
            className="absolute right-[8%] top-[18%] h-10 w-10 rotate-[15deg] text-red-light/70 drop-shadow-lg sm:h-12 sm:w-12"
            strokeWidth={1.25}
            aria-hidden
          />
          <Star
            className="absolute bottom-[14%] right-[10%] h-8 w-8 fill-gold-light/80 text-gold-light/80 drop-shadow-lg sm:h-10 sm:w-10"
            aria-hidden
          />

          <Sparkles
            className="animate-float-3d relative h-40 w-40 text-gold-light drop-shadow-2xl sm:h-56 sm:w-56 lg:h-72 lg:w-72"
            strokeWidth={1}
            aria-hidden
          />

          {/* Discount seal — the strongest buyer-facing signal in the hero.
              Kept on the LEFT so it never sits under the floating WhatsApp
              button, which is fixed to the bottom-right of the viewport.
              Wobbles gently in 3D to draw the eye without being distracting. */}
          <div
            className="animate-seal-wobble absolute -left-2 top-2 flex h-24 w-24 items-center justify-center sm:h-28 sm:w-28 lg:-left-4 lg:top-6"
            aria-hidden
          >
            <div className="absolute inset-0 rotate-[20deg] rounded-2xl bg-red" />
            <div className="absolute inset-0 -rotate-[16deg] rounded-2xl bg-red-dark" />
            <div className="relative flex h-full w-full flex-col items-center justify-center rounded-full border-2 border-gold-light bg-gradient-to-br from-red to-red-dark text-center leading-none text-white shadow-glow-red">
              <span className="text-[10px] font-bold uppercase tracking-wide sm:text-xs">Upto</span>
              <span className="text-2xl font-extrabold sm:text-3xl">{discount}%</span>
              <span className="text-[10px] font-bold uppercase tracking-wide sm:text-xs">Off</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
