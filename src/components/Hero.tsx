
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
        style={{
          backgroundImage: `url('/lovable-uploads/6cc198e0-a2f6-420b-96e2-bd97bc9b39f7.png')`
        }}
      ></div>
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80"></div>
      
      <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
        {/* Luxury Logo */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-light mb-4 tracking-wider">
            <span className="text-white font-thin">CLUB</span>{" "}
            <span className="text-yellow-400 font-light">B2B</span>
          </h1>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-thin text-yellow-400 tracking-[0.3em] mb-2">
            PERFORMANCE
          </h2>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent mx-auto mb-8"></div>
        </div>

        {/* Luxury Tagline */}
        <p className="text-lg md:text-xl text-gray-300 mb-4 font-light tracking-wide">
          Elite Cars | Global Import | VIP Rental Service
        </p>
        <p className="text-lg md:text-xl text-gray-300 mb-12 font-light tracking-wide">
          From Canada to Africa
        </p>

        {/* Refined CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button className="bg-transparent border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black px-8 py-3 text-sm font-light tracking-wider transition-all duration-300 min-w-[200px]">
            VIEW CARS FOR SALE
          </Button>
          <Button className="bg-transparent border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black px-8 py-3 text-sm font-light tracking-wider transition-all duration-300 min-w-[200px]">
            BOOK A RENTAL
          </Button>
          <Button className="bg-yellow-400 text-black hover:bg-yellow-500 px-8 py-3 text-sm font-light tracking-wider transition-all duration-300 min-w-[200px]">
            CONTACT VP CONCIERGE
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border border-yellow-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-yellow-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
