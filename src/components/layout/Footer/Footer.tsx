import { Link } from "react-router-dom";
import { MapPin, Phone, MessageCircle } from "lucide-react";
import { useSiteSettings } from "../../../hooks/useSiteSettings";

export function Footer() {
  const { settings } = useSiteSettings();
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-red-darkest text-cream">
      <div
        className="pointer-events-none absolute inset-0 opacity-40 bg-grid-navy"
        aria-hidden
      />
      <div className="container-page relative grid gap-10 py-14 sm:py-16 md:grid-cols-2 lg:grid-cols-4 lg:py-20">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2.5">
            <span className="h-10 w-10 shrink-0 overflow-hidden rounded-full">
              <img
                src={settings.logo_url || "/logo.jpg"}
                alt={`${settings.business_name} logo`}
                className="h-full w-full object-cover"
              />
            </span>
            <span className="text-lg font-extrabold text-white">{settings.business_name}</span>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-cream/80">{settings.footer_text}</p>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-gold-light">
            Quick Links
          </h3>
          <ul className="flex flex-col gap-2.5 text-sm">
            <li><Link to="/home" className="text-cream/90 transition-colors hover:text-gold-light">Home</Link></li>
            <li><Link to="/estimate" className="text-cream/90 transition-colors hover:text-gold-light">Estimate</Link></li>
            <li><Link to="/cart" className="text-cream/90 transition-colors hover:text-gold-light">Cart</Link></li>
            <li><Link to="/contact-us" className="text-cream/90 transition-colors hover:text-gold-light">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-gold-light">Contact</h3>
          <ul className="flex flex-col gap-3 text-sm">
            <li className="flex items-start gap-2.5">
              <Phone size={16} className="mt-0.5 shrink-0 text-gold-light" aria-hidden />
              <span>{settings.phone}</span>
            </li>
            <li className="flex items-start gap-2.5">
              <MessageCircle size={16} className="mt-0.5 shrink-0 text-gold-light" aria-hidden />
              <span>{settings.whatsapp_number}</span>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin size={16} className="mt-0.5 shrink-0 text-gold-light" aria-hidden />
              <span>{settings.address}, {settings.city}</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-gold-light">
            Shop with Confidence
          </h3>
          <p className="text-sm leading-relaxed text-cream/80">
            Browse our range, build your estimate, and order directly on WhatsApp — simple and fast.
          </p>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="container-page flex flex-col items-center gap-2 py-5 text-center text-xs text-cream/70 sm:flex-row sm:justify-between">
          <span>© {year} {settings.business_name}. All rights reserved.</span>
          <span>Handle with care. Follow all safety instructions.</span>
        </div>
      </div>
    </footer>
  );
}
