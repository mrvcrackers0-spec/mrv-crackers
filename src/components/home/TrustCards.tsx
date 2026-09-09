import { Boxes, ShieldCheck, Tag, MessageCircleMore } from "lucide-react";

const CARDS = [
  { icon: Boxes, title: "Wide Product Range", desc: "From sparklers to gift boxes, a full festive collection." },
  { icon: ShieldCheck, title: "Quality Products", desc: "Carefully selected crackers you can trust." },
  { icon: Tag, title: "Attractive Prices", desc: "Festive pricing across our entire collection." },
  { icon: MessageCircleMore, title: "Easy WhatsApp Ordering", desc: "Build your estimate and order in a few taps." },
];

export function TrustCards() {
  return (
    <section className="bg-navy-dark py-14 sm:py-16 lg:py-20">
      <div className="container-page">
        <div className="grid grid-cols-1 gap-5 rounded-card-lg border border-white/10 bg-white/5 p-2 shadow-soft backdrop-blur-sm sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-white/10 lg:p-0">
          {CARDS.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex flex-col p-6 sm:p-7">
              <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-[16px] bg-gradient-to-br from-red to-gold text-white shadow-glow-gold">
                <Icon size={26} aria-hidden />
              </span>
              <h3 className="mb-1.5 text-lg font-bold text-white">{title}</h3>
              <p className="text-sm leading-relaxed text-cream/70">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
