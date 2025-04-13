import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import KanbanPreview from "@/components/KanbanPreview";
import PricingSection from "@/components/PricingSection";
import TestimonialsSection from "@/components/TestomoniolSection";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen" >
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <KanbanPreview />
        <FeaturesSection />
        <TestimonialsSection />
        <PricingSection />
      </main>
      <Footer />
    </div >
  );
}
