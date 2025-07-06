
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
import NativeFeaturesShowcase from "@/components/NativeFeaturesShowcase";
import MobileAppPromo from "@/components/MobileAppPromo";
import AuthButton from "@/components/AuthButton";
import PriceCalculator from "@/components/PriceCalculator";
import EnhancedPaymentSystem from "@/components/EnhancedPaymentSystem";
import CarbonOffsetCalculator from "@/components/CarbonOffsetCalculator";
import QuickAccessButtons from "@/components/QuickAccessButtons";
import FinancingServices from "@/components/FinancingServices";
import AIPhotoStudio from "@/components/AIPhotoStudio";

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <div className="fixed top-4 right-4 z-50">
        <AuthButton />
      </div>
      <LanguageSelector />
      <AIChatbot />
      <StickyNavigation />
      <Hero />
      <div className="max-w-7xl mx-auto px-6">
        <NativeFeaturesShowcase />
      </div>
      <LuxuryInventory />
      <AdvancedFeatures />
      <AIPhotoStudio />
      <QuickAccessButtons />
      <MobileAppPromo />
      <EnhancedPaymentSystem amount={5000} purpose="service_payment" />
      <CarbonOffsetCalculator />
      <LuxuryShowroom />
      <FinancingServices />
      <Services />
      <PriceCalculator />
      <About />
      <Contact />
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Index;
