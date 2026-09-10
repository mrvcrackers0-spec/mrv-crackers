import { Link } from "react-router-dom";
import { MapPin, Phone, MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "../ui/Button";
import { useSiteSettings } from "../../hooks/useSiteSettings";
import { formatPhoneDisplay } from "../../lib/utils";

export function ContactPreview() {
  const { settings } = useSiteSettings();

  return (
    <section className="bg-off-white py-14 sm:py-16 lg:py-20">
      <div className="container-page">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-8 rounded-card-lg border border-red/10 bg-white p-8 text-center shadow-soft sm:p-12">
          <h2 className="text-2xl font-extrabold text-text-dark sm:text-3xl">{settings.business_name}</h2>

          <div className="flex flex-col gap-4 sm:flex-row sm:gap-8">
            <span className="flex items-center gap-2 text-sm font-semibold text-text-dark">
              <Phone size={16} className="text-red" aria-hidden /> {settings.phone}
            </span>
            <span className="flex items-center gap-2 text-sm font-semibold text-text-dark">
              <MessageCircle size={16} className="text-red" aria-hidden /> {formatPhoneDisplay(settings.whatsapp_number)}
            </span>
            <span className="flex items-center gap-2 text-sm font-semibold text-text-dark">
              <MapPin size={16} className="text-red" aria-hidden /> {settings.city}
            </span>
          </div>

          <Link to="/contact-us">
            <Button variant="secondary" icon={<ArrowRight size={16} />}>
              Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
