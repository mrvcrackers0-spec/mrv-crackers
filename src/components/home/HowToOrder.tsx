import { ClipboardList, ListChecks, ShoppingBag, Search, Send } from "lucide-react";
import { SectionHeader } from "../ui/SectionHeader";

const STEPS = [
  { icon: Search, title: "Browse Products", desc: "Explore categories and find your favorites." },
  { icon: ListChecks, title: "Add to Estimate", desc: "Pick quantities for the crackers you want." },
  { icon: ShoppingBag, title: "Review Cart", desc: "Check your selection and total before ordering." },
  { icon: ClipboardList, title: "Enter Details", desc: "Add your name, phone and address." },
  { icon: Send, title: "Send on WhatsApp", desc: "Submit your order directly to MRV Crackers." },
];

export function HowToOrder() {
  return (
    <section className="bg-off-white py-14 sm:py-16 lg:py-20">
      <div className="container-page">
        <div className="mb-12">
          <SectionHeader
            kicker="Simple & Transparent"
            title={<>How to Order <span className="text-red">in 5 Easy Steps</span></>}
            subtitle="Get your crackers ready for the festival in just a few taps."
          />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {STEPS.map(({ icon: Icon, title, desc }, i) => (
            <div
              key={title}
              className="relative flex flex-col items-start overflow-hidden rounded-card border border-black/[0.06] bg-white p-6 shadow-soft transition-transform hover:-translate-y-1"
            >
              <span className="pointer-events-none absolute -right-1 -top-3 text-6xl font-extrabold text-gold/10" aria-hidden>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="relative z-10 mb-4 flex h-12 w-12 items-center justify-center rounded-[14px] bg-navy text-gold-light shadow-soft">
                <Icon size={22} aria-hidden />
              </span>
              <h3 className="relative z-10 mb-1.5 text-base font-bold text-text-dark">{title}</h3>
              <p className="relative z-10 text-sm text-text-muted">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
