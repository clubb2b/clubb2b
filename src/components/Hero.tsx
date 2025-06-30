
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  const handleWhatsAppContact = () => {
    const message = "Hello! I'm interested in your luxury services and would like more information.";
    const whatsappUrl = `https://wa.me/15185077243?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleVIPConcierge = () => {
    const message = "I would like to speak with your VIP Concierge about exclusive services.";
    const whatsappUrl = `https://wa.me/15185077243?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
      {/* Background Image - Cadillac */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{
          backgroundImage: `url('/lovable-uploads/6cc198e0-a2f6-420b-96e2-bd97bc9b39f7.png')`
        }}
      ></div>
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80"></div>
      
      <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
        {/* Luxury Logo */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extralight mb-4 tracking-wider">
            <span className="text-white font-thin">CLUB</span>{" "}
            <span className="text-gray-300 font-light">B2B</span>
          </h1>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-thin text-gray-200 tracking-[0.3em] mb-2">
            PERFORMANCE
          </h2>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-white to-transparent mx-auto mb-8"></div>
        </div>

        {/* Luxury Tagline */}
        <p className="text-lg md:text-xl text-gray-300 mb-4 font-light tracking-wide">
          Elite Cars | Global Import & Export | VIP Services
        </p>
        <p className="text-lg md:text-xl text-gray-300 mb-12 font-light tracking-wide">
          Worldwide Luxury Shipping | From Canada to Africa
        </p>

        {/* Refined CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Link to="/cars-for-sale">
            <Button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black px-8 py-3 text-sm font-light tracking-wider transition-all duration-300 min-w-[200px]">
              VIEW CARS FOR SALE
            </Button>
          </Link>
          <Button 
            onClick={handleWhatsAppContact}
            className="bg-transparent border-2 border-gray-400 text-gray-300 hover:bg-gray-400 hover:text-black px-8 py-3 text-sm font-light tracking-wider transition-all duration-300 min-w-[200px]"
          >
            BOOK VIP RENTAL
          </Button>
          <Button 
            onClick={handleVIPConcierge}
            className="bg-white text-black hover:bg-gray-200 px-8 py-3 text-sm font-light tracking-wider transition-all duration-300 min-w-[200px]"
          >
            CONTACT VP CONCIERGE
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
