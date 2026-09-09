import { MapPin, Phone } from "lucide-react";
import { useSiteSettings } from "../../hooks/useSiteSettings";
import { ContactForm } from "../../components/contact/ContactForm";

export default function Contact() {
  const { settings } = useSiteSettings();
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${settings.address}, ${settings.city}`
  )}`;

  return (
    <div className="relative overflow-hidden bg-cream py-14 sm:py-20">
      <div className="pointer-events-none absolute inset-0 bg-grid-navy opacity-[0.03]" aria-hidden />

      <div className="container-page relative flex justify-center px-4">
        <div className="w-full max-w-[760px] rounded-card-lg border border-red/10 bg-white p-6 shadow-soft sm:p-10 lg:p-12">
          <div className="mb-8 flex flex-col items-center gap-4 text-center">
            <span className="rounded-pill bg-red/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-red">
              Contact Us
            </span>
            <h1 className="text-3xl font-extrabold text-text-dark sm:text-4xl lg:text-[44px]">
              Send Your Enquiry
            </h1>
            <p className="max-w-md text-text-muted">
              Have a question about our crackers or your order? Reach out and we'll get back to you.
            </p>
          </div>

          <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <a
              href={`tel:${settings.phone.replace(/\s/g, "")}`}
              className="flex h-12 items-center justify-center gap-2 rounded-[14px] border border-red/20 bg-cream text-sm font-bold text-red-dark transition-colors hover:bg-red/5"
            >
              <Phone size={16} aria-hidden />
              Contact No: {settings.phone}
            </a>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 items-center justify-center gap-2 rounded-[14px] border border-red/20 bg-cream text-sm font-bold text-red-dark transition-colors hover:bg-red/5"
            >
              <MapPin size={16} aria-hidden />
              View Location
            </a>
          </div>

          <ContactForm whatsappNumber={settings.whatsapp_number} />
        </div>
      </div>
    </div>
  );
}
