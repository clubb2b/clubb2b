
import { Button } from "@/components/ui/button";
import PaymentButton from "./PaymentButton";

const Hero = () => {
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Enhanced background with parallax effect */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105 transition-transform duration-1000"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url('/lovable-uploads/6cc198e0-a2f6-420b-96e2-bd97bc9b39f7.png')`,
            filter: 'brightness(1.2) contrast(1.1) saturate(1.1)'
          }}
        />
        {/* Modern overlay with subtle animation */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-60"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        {/* Enhanced title with modern typography */}
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-extralight text-white mb-6 tracking-[0.1em] leading-none">
          <span className="block bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
            CLUB B2B
          </span>
          <span className="block text-4xl md:text-5xl lg:text-6xl mt-4 font-light tracking-[0.2em]">
            PERFORMANCE
          </span>
        </h1>

        {/* Enhanced subtitle */}
        <div className="mb-8 space-y-4">
          <p className="text-xl md:text-2xl lg:text-3xl font-light text-gray-200 tracking-wider">
            Elite Cars | Global Import & Export | VIP Services
          </p>
          <p className="text-lg md:text-xl font-light text-gray-300 tracking-wide">
            Worldwide Luxury Shipping
          </p>
        </div>

        {/* Enhanced CTA buttons with modern design */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button 
            onClick={handleViewCars}
            className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg font-light tracking-wider transition-all duration-300 hover:scale-105 backdrop-blur-sm"
          >
            VIEW CARS FOR SALE
          </Button>
          
          <Button 
            onClick={handleBookVIP}
            className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg font-light tracking-wider transition-all duration-300 hover:scale-105 backdrop-blur-sm"
          >
            BOOK RENTAL
          </Button>
          
          <Button 
            onClick={handleImportExport}
            className="bg-white text-black hover:bg-gray-200 px-8 py-4 text-lg font-light tracking-wider transition-all duration-300 hover:scale-105 shadow-lg"
          >
            IMPORT EXPORT SERVICES
          </Button>

          <Button 
            onClick={() => window.location.href = '/vip-membership'}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 px-8 py-4 text-lg font-light tracking-wider transition-all duration-300 hover:scale-105 shadow-lg"
          >
            VIP MEMBERSHIP
          </Button>
        </div>

        {/* Modern scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Modern floating elements */}
      <div className="absolute top-20 right-20 w-2 h-2 bg-white rounded-full animate-pulse opacity-60"></div>
      <div className="absolute bottom-32 left-20 w-1 h-1 bg-white rounded-full animate-ping opacity-40"></div>
      <div className="absolute top-1/2 right-10 w-1.5 h-1.5 bg-white rounded-full animate-pulse opacity-50"></div>
    </section>
  );
};

export default Hero;
