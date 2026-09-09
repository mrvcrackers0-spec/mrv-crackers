import { Hero } from "../../components/home/Hero";
import { TrustCards } from "../../components/home/TrustCards";
import { FeaturedProducts } from "../../components/home/FeaturedProducts";
import { HowToOrder } from "../../components/home/HowToOrder";
import { PromoBanner } from "../../components/home/PromoBanner";
import { WhyChoose } from "../../components/home/WhyChoose";
import { WhatsAppCTA } from "../../components/home/WhatsAppCTA";
import { ContactPreview } from "../../components/home/ContactPreview";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustCards />
      <FeaturedProducts />
      <HowToOrder />
      <PromoBanner />
      <WhyChoose />
      <WhatsAppCTA />
      <ContactPreview />
    </>
  );
}
