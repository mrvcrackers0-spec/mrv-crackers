import { Link } from "react-router-dom";
import { MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "../ui/Button";
import { useSiteSettings } from "../../hooks/useSiteSettings";
import { openWhatsApp } from "../../lib/whatsapp";

export function WhatsAppCTA() {
  const { settings } = useSiteSettings();

  return (
    <section className="relative overflow-hidden bg-navy py-16 text-center sm:py-20">
      <div className="pointer-events-none absolute inset-0 bg-grid-navy opacity-40" aria-hidden />
      <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-red/20 blur-[100px]" aria-hidden />

      <div className="container-page relative flex flex-col items-center gap-5">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Ready to Celebrate?</h2>
        <p className="max-w-lg text-cream/80">
          Build your cracker list and send your order directly to {settings.business_name} on WhatsApp.
        </p>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <Link to="/estimate">
            <Button size="lg" variant="outline-light" icon={<ArrowRight size={18} />}>
              Browse Crackers
            </Button>
          </Link>
          <Button
            size="lg"
            variant="whatsapp"
            icon={<MessageCircle size={18} />}
            onClick={() => openWhatsApp(settings.whatsapp_number, "Hello MRV Crackers, I'd like to place an order.")}
          >
            Order on WhatsApp
          </Button>
        </div>
      </div>
    </section>
  );
}
