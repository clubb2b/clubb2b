
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"40\" height=\"40\" viewBox=\"0 0 40 40\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"%23D4AF37\" fill-opacity=\"0.05\"%3E%3Cpath d=\"M0 0h40v40H0z\"/%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        {/* Logo/Shield */}
        <div className="mb-8 flex justify-center">
          <div className="w-20 h-24 border-2 border-yellow-600 bg-gradient-to-b from-yellow-600 to-yellow-700 flex items-center justify-center transform rotate-45 rounded-sm">
            <span className="text-black font-bold text-2xl transform -rotate-45">P</span>
          </div>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent leading-tight">
          CLUB B2B
          <br />
          PERFORMANCE
        </h1>

        {/* Tagline */}
        <p className="text-xl md:text-2xl text-yellow-500 mb-8 font-light tracking-wide">
          DRIVEN BY HUSTLE. POWERED BY TRUST.
        </p>

        {/* Opening Soon Badge */}
        <div className="inline-block bg-gradient-to-r from-yellow-600 to-yellow-700 text-black px-8 py-3 rounded-full font-semibold text-lg mb-12 shadow-2xl">
          OPENING SOON
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button className="bg-transparent border-2 border-yellow-600 text-yellow-500 hover:bg-yellow-600 hover:text-black px-8 py-3 text-lg font-semibold transition-all duration-300">
            VIEW INVENTORY
          </Button>
          <Button className="bg-transparent border-2 border-yellow-600 text-yellow-500 hover:bg-yellow-600 hover:text-black px-8 py-3 text-lg font-semibold transition-all duration-300">
            IMPORT WITH US
          </Button>
          <Button className="bg-gradient-to-r from-yellow-600 to-yellow-700 text-black hover:from-yellow-500 hover:to-yellow-600 px-8 py-3 text-lg font-semibold transition-all duration-300 shadow-lg">
            JOIN THE CLUB
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-yellow-600 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-yellow-600 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
