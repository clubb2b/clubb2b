
import Hero from "@/components/Hero";
import LuxuryInventory from "@/components/LuxuryInventory";
import Services from "@/components/Services";
import LuxuryShowroom from "@/components/LuxuryShowroom";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import LanguageSelector from "@/components/LanguageSelector";
import AIChatbot from "@/components/AIChatbot";
import AdvancedFeatures from "@/components/AdvancedFeatures";
import BackToTop from "@/components/BackToTop";
import StickyNavigation from "@/components/StickyNavigation";
import AuthButton from "@/components/AuthButton";
import ThemeToggle from "@/components/ThemeToggle";
import PriceCalculator from "@/components/PriceCalculator";
import EnhancedPaymentSystem from "@/components/EnhancedPaymentSystem";
import CarbonOffsetCalculator from "@/components/CarbonOffsetCalculator";

import FinancingServices from "@/components/FinancingServices";
import AIPhotoStudio from "@/components/AIPhotoStudio";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden transition-colors duration-300">
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <ThemeToggle />
        <AuthButton />
      </div>
      <LanguageSelector />
      <AIChatbot />
      <StickyNavigation />
      <Hero />
      <LuxuryInventory />
      <Services />
      
      <EnhancedPaymentSystem amount={5000} purpose="service_payment" />
      <FinancingServices />
      <PriceCalculator />
      
      <About />
      <Contact />
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Index;
