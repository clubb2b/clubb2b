
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
      
      {/* AI Photography Promo Banner */}
      <div className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            🚗 TRANSFORM YOUR VEHICLE PHOTOS WITH AI
          </h3>
          <p className="text-xl text-white mb-6">
            Professional photography enhancement for maximum sales impact
          </p>
          <button 
            onClick={() => window.location.href = '/ai-photo-studio'}
            className="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
          >
            DISCOVER AI PHOTOGRAPHY STUDIO
          </button>
        </div>
      </div>
      
      <About />
      <Contact />
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Index;
