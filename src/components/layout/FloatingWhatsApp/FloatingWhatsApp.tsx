import { MessageCircle } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useSiteSettings } from "../../../hooks/useSiteSettings";
import { openWhatsApp } from "../../../lib/whatsapp";
import { cn } from "../../../lib/utils";

export function FloatingWhatsApp() {
  const { settings } = useSiteSettings();
  const { pathname } = useLocation();
  // The Estimate page shows a sticky order bar + right-aligned "Add"
  // buttons on mobile — move to the left and lift above the bar there
  // so the floating button never covers a row's Add/quantity control.
  const isEstimatePage = pathname === "/estimate";

  return (
    <button
      type="button"
      aria-label="Chat on WhatsApp"
      onClick={() => openWhatsApp(settings.whatsapp_number, "Hello MRV Crackers, I'd like to know more about your products.")}
      className={cn(
        "fixed z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-float transition-transform hover:scale-110 sm:bottom-6 sm:right-6 sm:h-16 sm:w-16 sm:left-auto",
        isEstimatePage ? "bottom-24 left-4 sm:bottom-6" : "bottom-4 right-4"
      )}
    >
      <MessageCircle size={28} aria-hidden />
    </button>
  );
}
