import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, MessageCircle, ShoppingCart, X } from "lucide-react";
import { cn } from "../../../lib/utils";
import { useCartStore } from "../../../context/CartStore";
import { useSiteSettings } from "../../../hooks/useSiteSettings";
import { openWhatsApp } from "../../../lib/whatsapp";

const NAV_LINKS = [
  { to: "/home", label: "Home" },
  { to: "/estimate", label: "Estimate" },
  { to: "/cart", label: "Cart" },
  { to: "/contact-us", label: "Contact Us" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const itemCount = useCartStore((s) => s.items.reduce((sum, i) => sum + i.quantity, 0));
  const { settings } = useSiteSettings();

  return (
    <header className="sticky top-0 z-30 border-b border-black/5 bg-off-white/95 backdrop-blur-sm">
      <div className="container-page flex h-20 items-center justify-between gap-4 lg:h-24">
        {/* Brand capsule */}
        <NavLink
          to="/home"
          className="flex items-center gap-3 rounded-pill border border-red/15 bg-white px-3 py-2 shadow-soft sm:px-4 sm:py-2.5"
        >
          <span className="h-9 w-9 shrink-0 overflow-hidden rounded-full sm:h-11 sm:w-11">
            <img
              src={settings.logo_url || "/logo.jpg"}
              alt={`${settings.business_name} logo`}
              className="h-full w-full object-cover"
            />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-sm font-extrabold text-red-dark sm:text-base">
              {settings.business_name}
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-gold-dark sm:text-xs">
              Fancy Crackers
            </span>
          </span>
        </NavLink>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                cn(
                  "rounded-pill px-5 py-2.5 text-[15px] font-semibold transition-colors",
                  isActive
                    ? "bg-red-dark text-white shadow-soft"
                    : "text-red-dark hover:bg-red/5"
                )
              }
            >
              {link.label}
              {link.to === "/cart" && itemCount > 0 && (
                <span className="ml-1.5 rounded-pill bg-gold px-1.5 py-0.5 text-xs font-bold text-navy-dark">
                  {itemCount}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <button
            type="button"
            onClick={() => openWhatsApp(settings.whatsapp_number, "Hello MRV Crackers, I'd like to know more about your products.")}
            className="inline-flex h-11 items-center gap-2 rounded-btn bg-[#25D366] px-5 text-sm font-bold text-white shadow-soft transition-transform hover:-translate-y-0.5"
          >
            <MessageCircle size={18} aria-hidden />
            Order on WhatsApp
          </button>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 lg:hidden">
          <NavLink
            to="/cart"
            aria-label="Cart"
            className="relative flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white text-red-dark"
          >
            <ShoppingCart size={20} />
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-pill bg-red px-1 text-[11px] font-bold text-white">
                {itemCount}
              </span>
            )}
          </NavLink>
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white text-red-dark"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={cn(
          "overflow-hidden border-t border-black/5 bg-white transition-[max-height] duration-300 lg:hidden",
          menuOpen ? "max-h-96" : "max-h-0 border-t-0"
        )}
      >
        <nav className="container-page flex flex-col gap-1 py-3" aria-label="Mobile">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                cn(
                  "rounded-btn px-4 py-3 text-base font-semibold transition-colors",
                  isActive ? "bg-red-dark text-white" : "text-red-dark hover:bg-red/5"
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
          <button
            type="button"
            onClick={() => {
              setMenuOpen(false);
              openWhatsApp(settings.whatsapp_number, "Hello MRV Crackers, I'd like to know more about your products.");
            }}
            className="mt-1 inline-flex h-12 items-center justify-center gap-2 rounded-btn bg-[#25D366] px-5 text-sm font-bold text-white"
          >
            <MessageCircle size={18} aria-hidden />
            Order on WhatsApp
          </button>
        </nav>
      </div>
    </header>
  );
}
