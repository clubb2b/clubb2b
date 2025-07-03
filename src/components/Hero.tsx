
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import OptimizedImage from "./OptimizedImage";

const Hero = () => {
  const { t } = useLanguage();
  
  const handleWhatsAppClick = () => {
    const message = "Hello! I'm interested in your luxury car services. Please tell me more.";
    const whatsappUrl = `https://wa.me/15185077243?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <OptimizedImage
          src="/lovable-uploads/65e689ae-1df4-49a9-a317-bb8251b3da02.png"
          alt="Luxury Range Rover in premium showroom setting"
          className="w-full h-full"
          lazy={false}
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extralight text-white mb-8 tracking-wider leading-tight">
          CLUB B2B
          <br />
          <span className="text-3xl md:text-4xl lg:text-5xl">PERFORMANCE</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-200 font-light mb-12 max-w-3xl mx-auto leading-relaxed">
          {t('hero.subtitle')}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button 
            onClick={handleWhatsAppClick}
            className="bg-white text-black hover:bg-gray-200 px-8 py-4 text-lg font-light tracking-wider transition-all duration-300 hover:scale-105"
          >
            {t('hero.cta_primary')}
          </Button>
          
          <Button 
            variant="outline" 
            className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg font-light tracking-wider transition-all duration-300"
          >
            {t('hero.cta_secondary')}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
