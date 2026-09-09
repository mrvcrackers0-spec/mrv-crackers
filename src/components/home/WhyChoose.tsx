import { Award, Headset, LayoutGrid, MessageSquareHeart } from "lucide-react";
import { SectionHeader } from "../ui/SectionHeader";

const REASONS = [
  { icon: Award, tag: "Handpicked", title: "Quality-Focused Selection", desc: "Every product is chosen with care and quality in mind." },
  { icon: LayoutGrid, tag: "15+ Categories", title: "Wide Collection", desc: "A broad range across sparklers, aerials, gift boxes and more." },
  { icon: MessageSquareHeart, tag: "In Minutes", title: "Easy Ordering", desc: "Build your estimate online, order instantly via WhatsApp." },
  { icon: Headset, tag: "Always Here", title: "Customer-Friendly Support", desc: "Reach out anytime with questions about your order." },
];

export function WhyChoose() {
  return (
    <section className="bg-cream py-14 sm:py-16 lg:py-20">
      <div className="container-page">
        <div className="mb-10">
          <SectionHeader
            kicker="Why Choose Us"
            title={<>Why Celebrate With <span className="text-red">MRV Crackers</span></>}
            subtitle="Straightforward pricing and quality you can rely on, every festive season."
          />
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {REASONS.map(({ icon: Icon, tag, title, desc }) => (
            <div key={title} className="relative overflow-hidden rounded-card border border-red/10 bg-white p-6 shadow-soft">
              <span className="absolute right-4 top-4 rounded-pill bg-gold/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-gold-dark">
                {tag}
              </span>
              <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-[14px] bg-red/10 text-red">
                <Icon size={22} aria-hidden />
              </span>
              <h3 className="mb-1.5 text-base font-bold text-text-dark">{title}</h3>
              <p className="text-sm leading-relaxed text-text-muted">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
