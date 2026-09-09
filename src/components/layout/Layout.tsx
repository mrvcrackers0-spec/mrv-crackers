import type { ReactNode } from "react";
import { Ticker } from "./Ticker/Ticker";
import { Navbar } from "./Navbar/Navbar";
import { Footer } from "./Footer/Footer";
import { FloatingWhatsApp } from "./FloatingWhatsApp/FloatingWhatsApp";
import { useSiteSettings } from "../../hooks/useSiteSettings";

export function Layout({ children }: { children: ReactNode }) {
  const { settings } = useSiteSettings();

  return (
    <div className="flex min-h-screen flex-col">
      <Ticker text={settings.ticker_text} />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
