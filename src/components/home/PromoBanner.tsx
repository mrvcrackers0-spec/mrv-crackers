import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "../ui/Button";

export function PromoBanner() {
  return (
    <section className="bg-off-white px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-card-lg bg-gradient-to-br from-navy via-navy to-red-darkest px-6 py-12 text-center shadow-glow-red sm:px-10 sm:py-16">
          <div className="pointer-events-none absolute inset-0 bg-grid-navy opacity-40" aria-hidden />
          <div className="pointer-events-none absolute -top-10 right-10 h-40 w-40 rounded-full bg-gold/20 blur-3xl" aria-hidden />

          <span className="relative mb-4 inline-flex items-center gap-2 rounded-pill border border-gold/40 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-gold-light">
            <Sparkles size={14} aria-hidden />
            Festival Special
          </span>
          <h2 className="relative mx-auto max-w-xl text-2xl font-extrabold text-white sm:text-3xl lg:text-4xl">
            Celebrate More. Spend Smart.
          </h2>
          <p className="relative mx-auto mt-3 max-w-md text-sm text-cream/80 sm:text-base">
            Great prices across our full range of crackers this Diwali.
          </p>
          <Link to="/estimate" className="relative mt-7 inline-block">
            <Button size="lg" icon={<ArrowRight size={18} />}>
              View Crackers
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
