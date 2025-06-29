
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-100 to-white overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: `url('/lovable-uploads/8494dfd3-ce77-4317-b73c-f64c23c29e35.png')`
        }}
      ></div>
      
      {/* Subtle Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-gray-50/60 to-white/90"></div>
      
      <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
        {/* Luxury Logo */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extralight mb-4 tracking-wider">
            <span className="text-gray-800 font-thin">CLUB</span>{" "}
            <span className="text-gray-600 font-light">B2B</span>
          </h1>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-thin text-gray-700 tracking-[0.3em] mb-2">
            PERFORMANCE
          </h2>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent mx-auto mb-8"></div>
        </div>

        {/* Luxury Tagline */}
        <p className="text-lg md:text-xl text-gray-600 mb-4 font-light tracking-wide">
          At CLUB B2B PERFORMANCE, we specialize in the
        </p>
        <p className="text-lg md:text-xl text-gray-600 mb-4 font-light tracking-wide">
          exportation of high-quality automobiles worldwide.
        </p>
        <p className="text-lg md:text-xl text-gray-600 mb-12 font-light tracking-wide">
          With a commitment to excellence, we source, inspect, and...
        </p>

        {/* Refined CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button className="bg-transparent border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white px-8 py-3 text-sm font-light tracking-wider transition-all duration-300 min-w-[200px]">
            VIEW COLLECTION
          </Button>
          <Button className="bg-transparent border-2 border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white px-8 py-3 text-sm font-light tracking-wider transition-all duration-300 min-w-[200px]">
            EXPORT SERVICES
          </Button>
          <Button className="bg-gray-800 text-white hover:bg-gray-900 px-8 py-3 text-sm font-light tracking-wider transition-all duration-300 min-w-[200px]">
            CONTACT US
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
