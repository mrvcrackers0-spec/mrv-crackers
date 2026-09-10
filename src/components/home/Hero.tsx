import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { MessageCircle, Sparkles, Star, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "../ui/Button";
import { useSiteSettings } from "../../hooks/useSiteSettings";
import { openWhatsApp } from "../../lib/whatsapp";
import { cn } from "../../lib/utils";

const SPARKLE_DOTS = [
  { top: "12%", left: "8%", size: 10, delay: "0s" },
  { top: "22%", left: "42%", size: 6, delay: "0.6s" },
  { top: "68%", left: "16%", size: 8, delay: "1.2s" },
  { top: "80%", left: "48%", size: 6, delay: "0.3s" },
  { top: "18%", left: "92%", size: 8, delay: "0.9s" },
  { top: "58%", left: "88%", size: 6, delay: "1.5s" },
];

// Floating gold spark particles. First 12 render everywhere; the rest
// only appear from sm: up, keeping the mobile DOM/animation count low
// per the "8-15 mobile / 15-30 desktop" guidance.
const PARTICLES = [
  { top: "8%", left: "6%", size: 4, drift: 10, duration: 6, delay: 0, alwaysOn: true },
  { top: "18%", left: "22%", size: 3, drift: -14, duration: 7, delay: 0.8, alwaysOn: true },
  { top: "34%", left: "4%", size: 5, drift: 8, duration: 6.5, delay: 1.6, alwaysOn: true },
  { top: "52%", left: "14%", size: 3, drift: -10, duration: 5.5, delay: 2.4, alwaysOn: true },
  { top: "70%", left: "8%", size: 4, drift: 12, duration: 7.5, delay: 0.4, alwaysOn: true },
  { top: "85%", left: "26%", size: 3, drift: -8, duration: 6, delay: 3.1, alwaysOn: true },
  { top: "12%", left: "78%", size: 4, drift: -12, duration: 6.8, delay: 1.2, alwaysOn: true },
  { top: "28%", left: "92%", size: 3, drift: 10, duration: 5.8, delay: 2.0, alwaysOn: true },
  { top: "46%", left: "84%", size: 5, drift: -9, duration: 7.2, delay: 0.2, alwaysOn: true },
  { top: "64%", left: "94%", size: 3, drift: 11, duration: 6.3, delay: 2.8, alwaysOn: true },
  { top: "80%", left: "76%", size: 4, drift: -13, duration: 6.9, delay: 1.6, alwaysOn: true },
  { top: "92%", left: "60%", size: 3, drift: 9, duration: 5.6, delay: 0.6, alwaysOn: true },
  { top: "5%", left: "40%", size: 3, drift: 8, duration: 6.4, delay: 3.4 },
  { top: "24%", left: "56%", size: 4, drift: -10, duration: 7.1, delay: 1.0 },
  { top: "40%", left: "36%", size: 3, drift: 12, duration: 5.9, delay: 2.2 },
  { top: "58%", left: "48%", size: 4, drift: -8, duration: 6.6, delay: 0.5 },
  { top: "74%", left: "38%", size: 3, drift: 10, duration: 7.4, delay: 2.9 },
  { top: "15%", left: "64%", size: 4, drift: -11, duration: 6.1, delay: 1.8 },
  { top: "48%", left: "70%", size: 3, drift: 9, duration: 5.7, delay: 3.6 },
  { top: "88%", left: "44%", size: 4, drift: -9, duration: 6.7, delay: 0.9 },
  { top: "3%", left: "18%", size: 3, drift: 8, duration: 7.0, delay: 2.5 },
  { top: "36%", left: "88%", size: 3, drift: -8, duration: 5.4, delay: 1.4 },
  { top: "66%", left: "20%", size: 4, drift: 10, duration: 6.2, delay: 3.0 },
  { top: "95%", left: "82%", size: 3, drift: -10, duration: 6.9, delay: 0.3 },
];

// Firework bursts placed around the visual — staggered so they never
// all pop at once. Kept clear of the bottom-right corner (that's where
// the floating WhatsApp button sits) and the seal (top-left).
const FIREWORKS = [
  { top: "14%", left: "68%", delay: 0, cycle: 7, size: 1, mobile: true },
  { top: "44%", left: "80%", delay: 1.8, cycle: 7, size: 0.8, mobile: true },
  { top: "10%", left: "38%", delay: 3.5, cycle: 7, size: 0.9 },
  { top: "40%", left: "78%", delay: 5.2, cycle: 7, size: 0.7 },
];

const FIREWORK_RAY_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];

const BUYER_HIGHLIGHTS_BASE = ["171+ Products", "Direct WhatsApp Order", "No App, No Login"];

function FireworkBurst({ top, left, delay, cycle, size, mobile }: (typeof FIREWORKS)[number]) {
  const style = {
    top,
    left,
    ["--fw-delay" as string]: `${delay}s`,
    ["--fw-cycle" as string]: `${cycle}s`,
    transform: `scale(${size})`,
  };
  return (
    <div
      className={cn("pointer-events-none absolute h-0 w-0", !mobile && "hidden sm:block")}
      style={style}
      aria-hidden
    >
      <span
        className="animate-firework-flash absolute -left-[3px] -top-[3px] h-[6px] w-[6px] rounded-full bg-gold-light shadow-glow-gold"
        style={{ ["--fw-delay" as string]: `${delay}s`, ["--fw-cycle" as string]: `${cycle}s` }}
      />
      {FIREWORK_RAY_ANGLES.map((angle, i) => (
        <span
          key={angle}
          className="animate-firework-ray absolute left-0 top-0 w-[2px] origin-bottom rounded-full bg-gradient-to-t from-transparent to-gold-light"
          style={{
            transform: `rotate(${angle}deg)`,
            ["--fw-delay" as string]: `${delay + i * 0.015}s`,
            ["--fw-cycle" as string]: `${cycle}s`,
          }}
        />
      ))}
    </div>
  );
}

export function Hero() {
  const { settings } = useSiteSettings();
  const sectionRef = useRef<HTMLElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const discount = Number.isFinite(settings.hero_discount_percent)
    ? Math.round(settings.hero_discount_percent)
    : 40;

  const buyerHighlights = [`Up to ${discount}% Off`, ...BUYER_HIGHLIGHTS_BASE];

  // Subtle desktop-only parallax: the decorative visual drifts a few px
  // toward the cursor. Skipped on touch devices and reduced-motion.
  useEffect(() => {
    const section = sectionRef.current;
    const parallax = parallaxRef.current;
    if (!section || !parallax) return;

    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canHover || reduced) return;

    let frame = 0;
    function handleMove(e: MouseEvent) {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        if (!section || !parallax) return;
        const rect = section.getBoundingClientRect();
        const relX = (e.clientX - rect.left) / rect.width - 0.5;
        const relY = (e.clientY - rect.top) / rect.height - 0.5;
        const maxShift = 6;
        parallax.style.transform = `translate3d(${relX * maxShift * 2}px, ${relY * maxShift * 2}px, 0)`;
      });
    }
    function handleLeave() {
      if (parallax) parallax.style.transform = "translate3d(0, 0, 0)";
    }

    section.addEventListener("mousemove", handleMove);
    section.addEventListener("mouseleave", handleLeave);
    return () => {
      section.removeEventListener("mousemove", handleMove);
      section.removeEventListener("mouseleave", handleLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-navy bg-grid-navy">
      {/* Ambient glows */}
      <div
        className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-red/30 blur-[100px] animate-pulse-glow"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-gold/20 blur-[110px] animate-pulse-glow"
        aria-hidden
        style={{ animationDelay: "1.5s" }}
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-light/10 blur-[90px]"
        aria-hidden
      />

      {/* Scattered sparkle particles (small stars) */}
      {SPARKLE_DOTS.map((dot, i) => (
        <Star
          key={i}
          className="pointer-events-none absolute animate-pulse-glow fill-gold-light text-gold-light"
          style={{ top: dot.top, left: dot.left, width: dot.size, height: dot.size, animationDelay: dot.delay }}
          aria-hidden
        />
      ))}

      {/* Rising gold spark particles */}
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className={cn(
            "animate-particle-rise pointer-events-none absolute rounded-full bg-gold-light",
            !p.alwaysOn && "hidden sm:block"
          )}
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
            ["--drift-x" as string]: `${p.drift}px`,
            ["--duration" as string]: `${p.duration}s`,
            ["--particle-opacity" as string]: 0.75,
            animationDelay: `${p.delay}s`,
          }}
          aria-hidden
        />
      ))}

      <div className="container-page relative grid min-h-[520px] items-center gap-5 py-8 sm:min-h-[640px] sm:gap-8 sm:py-20 lg:min-h-[700px] lg:grid-cols-2 lg:gap-10 lg:py-24">
        <div className="flex max-w-[600px] flex-col items-start gap-3 sm:gap-5">
          <span
            className="animate-fade-slide-up order-1 inline-flex items-center gap-2 rounded-pill bg-gradient-to-r from-red to-red-dark px-3.5 py-1.5 text-[11px] font-extrabold uppercase tracking-wider text-white shadow-glow-red sm:px-4 sm:py-2 sm:text-xs"
            style={{ animationDelay: "150ms" }}
          >
            <Sparkles size={13} aria-hidden />
            Up to {discount}% Off • This Festive Season
          </span>

          <h1 className="order-2 text-[clamp(2.25rem,8vw,3.75rem)] font-extrabold leading-[1.06] text-white text-shadow-soft">
            <span className="animate-fade-slide-up block" style={{ animationDelay: "300ms" }}>
              Premium
            </span>
            <span className="animate-fade-slide-up block" style={{ animationDelay: "420ms" }}>
              Crackers,
            </span>
            <span
              className="animate-fade-slide-up animate-shine-sweep block"
              style={{ animationDelay: "540ms" }}
            >
              Unbeatable Prices.
            </span>
          </h1>

          <p
            className="animate-fade-slide-up order-3 max-w-[520px] text-[15px] leading-snug text-cream/80 sm:hidden"
            style={{ animationDelay: "450ms" }}
          >
            171+ crackers, direct festive pricing — order straight to WhatsApp.
          </p>
          <p
            className="animate-fade-slide-up order-3 hidden max-w-[520px] text-lg leading-relaxed text-cream/80 sm:block"
            style={{ animationDelay: "450ms" }}
          >
            171+ crackers across 15 categories at direct, festive pricing. Build your
            estimate and send it straight to WhatsApp — no app to install, no account
            to create.
          </p>

          <div
            className="animate-fade-slide-up order-4 mt-1 flex w-full flex-col gap-3 sm:order-5 sm:w-auto sm:flex-row"
            style={{ animationDelay: "750ms" }}
          >
            <Link to="/estimate" className="w-full sm:w-auto">
              <Button
                size="lg"
                fullWidth
                icon={<ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />}
                className="group sm:w-auto"
              >
                Shop & Save Now
              </Button>
            </Link>
            <div className="animate-fade-slide-up" style={{ animationDelay: "850ms" }}>
              <Button
                variant="outline-light"
                size="lg"
                fullWidth
                icon={<MessageCircle size={18} aria-hidden />}
                onClick={() => openWhatsApp(settings.whatsapp_number, "Hello MRV Crackers, I'd like to place an order.")}
                className="w-full sm:w-auto"
              >
                Order on WhatsApp
              </Button>
            </div>
          </div>

          <ul
            className="animate-fade-slide-up order-5 flex flex-wrap gap-2 sm:order-4 sm:gap-2.5"
            style={{ animationDelay: "600ms" }}
            aria-label="Why shop with us"
          >
            {buyerHighlights.map((item) => (
              <li
                key={item}
                className="inline-flex items-center gap-1.5 rounded-pill border border-white/15 bg-white/5 px-2.5 py-1.5 text-[11px] font-semibold text-cream/90 sm:px-3 sm:text-xs"
              >
                <CheckCircle2 size={12} className="text-gold-light" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto flex h-[160px] w-full max-w-[520px] items-center justify-center sm:h-[380px] lg:h-[500px]">
          <div ref={parallaxRef} className="relative flex h-full w-full items-center justify-center will-change-transform">
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

            {/* Firework bursts */}
            {FIREWORKS.map((fw, i) => (
              <FireworkBurst key={i} {...fw} />
            ))}

            {/* Smaller accent bursts around the main sparkle */}
            <Sparkles
              className="absolute right-[8%] top-[18%] h-9 w-9 rotate-[15deg] text-red-light/70 drop-shadow-lg sm:h-12 sm:w-12"
              strokeWidth={1.25}
              aria-hidden
            />
            {/* Kept clear of the bottom-right corner — that's where the
                floating WhatsApp button sits on shorter viewports. */}
            <Star
              className="absolute bottom-[16%] left-[6%] h-7 w-7 fill-gold-light/80 text-gold-light/80 drop-shadow-lg sm:h-10 sm:w-10"
              aria-hidden
            />

            <Sparkles
              className="animate-float-3d animate-breathe-glow relative h-24 w-24 text-gold-light drop-shadow-2xl sm:h-56 sm:w-56 lg:h-72 lg:w-72"
              strokeWidth={1}
              aria-hidden
            />

            {/* Discount seal — the strongest buyer-facing signal in the hero.
                Kept on the LEFT so it never sits under the floating WhatsApp
                button, which is fixed to the bottom-right of the viewport.
                Floats gently — a rise + hair of rotation, never a spin. */}
            <div
              className="animate-seal-float absolute -left-1 top-0 flex h-20 w-20 items-center justify-center sm:h-28 sm:w-28 sm:top-2 lg:-left-4 lg:top-6"
              aria-hidden
            >
              <div className="absolute inset-0 rotate-[20deg] rounded-2xl bg-red" />
              <div className="absolute inset-0 -rotate-[16deg] rounded-2xl bg-red-dark" />
              <div className="relative flex h-full w-full flex-col items-center justify-center rounded-full border-2 border-gold-light bg-gradient-to-br from-red to-red-dark text-center leading-none text-white shadow-glow-red">
                <span className="text-[9px] font-bold uppercase tracking-wide sm:text-xs">Upto</span>
                <span className="text-xl font-extrabold sm:text-3xl">{discount}%</span>
                <span className="text-[9px] font-bold uppercase tracking-wide sm:text-xs">Off</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
