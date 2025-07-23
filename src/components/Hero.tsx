
import { Button } from "@/components/ui/button";
import PaymentButton from "./PaymentButton";
import { useTranslation } from 'react-i18next';
import LuxuryBrandLogos from "./LuxuryBrandLogos";
import { Sparkles, Crown, Star } from "lucide-react";

const Hero = () => {
  const { t } = useTranslation('common');
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleImportExport = () => {
    window.location.href = '/import-export';
  };

  const handleViewCars = () => {
    window.location.href = '/cars-collection';
  };

  const handleBookVIP = () => {
    const message = "I'm interested in VIP rental services. Please provide more information.";
    const whatsappUrl = `https://wa.me/15185077243?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-luxury-black">
      {/* Luxury enhanced background with sophisticated parallax */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105 transition-transform duration-1000 hover:scale-110"
          style={{
            backgroundImage: `linear-gradient(135deg, hsla(var(--luxury-black), 0.3), hsla(var(--luxury-charcoal), 0.6)), url('/lovable-uploads/6cc198e0-a2f6-420b-96e2-bd97bc9b39f7.png')`,
            filter: 'brightness(1.3) contrast(1.2) saturate(1.2)'
          }}
        />
        {/* Luxury gradient overlays with premium effects */}
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-transparent to-luxury-charcoal/30 opacity-70"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-luxury-black/40 via-transparent to-luxury-black/40"></div>
        <div className="absolute inset-0 bg-gradient-glow opacity-20"></div>
        
        {/* Animated luxury particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-luxury-gold rounded-full animate-luxury-glow opacity-60"></div>
        <div className="absolute top-3/4 right-1/3 w-1.5 h-1.5 bg-luxury-platinum rounded-full animate-pulse opacity-50"></div>
        <div className="absolute top-1/2 left-1/5 w-1 h-1 bg-luxury-gold rounded-full animate-ping opacity-40"></div>
        <div className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-luxury-gold/30 rounded-full animate-premium-float opacity-70"></div>
      </div>

      {/* Luxury main content with sophisticated layout */}
      <div className="relative z-10 text-center px-6 max-w-7xl mx-auto flex-1 flex flex-col justify-center">
        {/* Luxury status indicators */}
        <div className="flex justify-center items-center space-x-6 mb-8 animate-elegant-slide-up">
          <div className="flex items-center space-x-2 px-4 py-2 bg-luxury-charcoal/20 backdrop-blur-md rounded-full border border-luxury-gold/30">
            <Crown className="w-4 h-4 text-luxury-gold" />
            <span className="text-luxury-platinum text-sm font-elegant tracking-wide">PREMIUM</span>
          </div>
          <div className="flex items-center space-x-2 px-4 py-2 bg-luxury-charcoal/20 backdrop-blur-md rounded-full border border-luxury-platinum/30">
            <Star className="w-4 h-4 text-luxury-platinum" />
            <span className="text-luxury-platinum text-sm font-elegant tracking-wide">EXCLUSIVE</span>
          </div>
          <div className="flex items-center space-x-2 px-4 py-2 bg-luxury-charcoal/20 backdrop-blur-md rounded-full border border-luxury-gold/30">
            <Sparkles className="w-4 h-4 text-luxury-gold" />
            <span className="text-luxury-platinum text-sm font-elegant tracking-wide">LUXURY</span>
          </div>
        </div>

        {/* Sophisticated title with luxury typography */}
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-luxury text-luxury-white mb-8 tracking-[0.15em] leading-none animate-elegant-slide-up">
          <span className="block bg-gradient-to-r from-luxury-white via-luxury-platinum to-luxury-white bg-clip-text text-transparent drop-shadow-2xl">
            CLUB B2B
          </span>
          <span className="block text-4xl md:text-5xl lg:text-6xl mt-6 font-light tracking-[0.25em] bg-gradient-luxury bg-clip-text text-transparent animate-luxury-shimmer bg-[length:200%_100%]">
            PERFORMANCE
          </span>
        </h1>

        {/* Elegant subtitle with premium styling */}
        <div className="mb-12 space-y-6 animate-elegant-slide-up" style={{ animationDelay: '0.2s' }}>
          <p className="text-xl md:text-2xl lg:text-3xl font-elegant text-luxury-platinum tracking-wider leading-relaxed">
            {t('hero.title')}
          </p>
          <p className="text-lg md:text-xl font-elegant text-luxury-platinum/80 tracking-wide leading-relaxed max-w-4xl mx-auto">
            {t('hero.description')}
          </p>
          <div className="w-32 h-px bg-gradient-luxury mx-auto"></div>
        </div>

        {/* Luxury CTA buttons with premium interactions */}
        <div className="flex flex-col lg:flex-row gap-6 justify-center items-center animate-elegant-slide-up" style={{ animationDelay: '0.4s' }}>
          <Button 
            onClick={handleViewCars}
            className="group relative bg-transparent border-2 border-luxury-platinum text-luxury-platinum hover:bg-luxury-platinum hover:text-luxury-black px-10 py-4 text-lg font-elegant tracking-wider transition-all duration-500 hover:scale-105 backdrop-blur-md hover:shadow-premium overflow-hidden"
          >
            <span className="relative z-10">VIEW CARS FOR SALE</span>
            <div className="absolute inset-0 bg-gradient-luxury opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
          </Button>
          
          <Button 
            onClick={handleBookVIP}
            className="group relative bg-transparent border-2 border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-luxury-black px-10 py-4 text-lg font-elegant tracking-wider transition-all duration-500 hover:scale-105 backdrop-blur-md hover:shadow-glow overflow-hidden animate-luxury-glow"
          >
            <span className="relative z-10">BOOK RENTAL</span>
            <div className="absolute inset-0 bg-gradient-luxury opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
          </Button>
          
          <Button 
            onClick={handleImportExport}
            className="group relative bg-gradient-premium text-luxury-charcoal hover:bg-gradient-luxury hover:text-luxury-black px-10 py-4 text-lg font-elegant tracking-wider transition-all duration-500 hover:scale-105 shadow-premium hover:shadow-luxury overflow-hidden"
          >
            <span className="relative z-10">IMPORT EXPORT SERVICES</span>
            <div className="absolute inset-0 bg-gradient-luxury opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
          </Button>

          <Button 
            onClick={() => window.location.href = '/vip-membership'}
            className="group relative bg-gradient-luxury text-luxury-black hover:bg-gradient-dark hover:text-luxury-gold px-10 py-4 text-lg font-elegant tracking-wider transition-all duration-500 hover:scale-105 shadow-luxury hover:shadow-glow overflow-hidden animate-luxury-glow"
          >
            <span className="relative z-10 flex items-center space-x-2">
              <Crown className="w-5 h-5" />
              <span>VIP MEMBERSHIP</span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-luxury-gold to-luxury-gold-dark opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
          </Button>
        </div>

        {/* Luxury scroll indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-premium-float">
          <div className="w-8 h-12 border-2 border-luxury-gold rounded-full flex justify-center bg-luxury-charcoal/20 backdrop-blur-sm hover:shadow-glow transition-all duration-300">
            <div className="w-1.5 h-4 bg-gradient-luxury rounded-full mt-3 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Luxury Brand Showcase */}
      <div className="relative z-10">
        <LuxuryBrandLogos />
      </div>

      {/* Sophisticated floating luxury elements */}
      <div className="absolute top-24 right-24 w-3 h-3 bg-luxury-gold rounded-full animate-luxury-glow opacity-70 shadow-glow"></div>
      <div className="absolute bottom-40 left-24 w-2 h-2 bg-luxury-platinum rounded-full animate-ping opacity-50"></div>
      <div className="absolute top-1/2 right-12 w-2.5 h-2.5 bg-luxury-gold rounded-full animate-premium-float opacity-60 shadow-glow"></div>
      <div className="absolute top-1/3 left-1/6 w-1.5 h-1.5 bg-luxury-platinum rounded-full animate-pulse opacity-40"></div>
      <div className="absolute bottom-1/3 right-1/5 w-4 h-4 bg-luxury-gold/20 rounded-full animate-luxury-glow opacity-50 blur-sm"></div>
    </section>
  );
};

export default Hero;
