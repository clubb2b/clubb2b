
import BrandLogo from "./BrandLogo";
import { Car } from "lucide-react";

const LuxuryShowroom = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light mb-6 text-white tracking-wider">
            LUXURY SHOWROOM
          </h2>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-white to-transparent mx-auto mb-8"></div>
        </div>

        <div className="relative">
          <div className="aspect-[16/9] rounded-lg overflow-hidden border border-gray-700 bg-gradient-to-br from-gray-800 via-gray-900 to-black flex items-center justify-center">
            <div className="text-center">
              <Car className="w-32 h-32 text-white mx-auto mb-8 opacity-20" />
              <BrandLogo size="large" className="mx-auto mb-8" />
              <h3 className="text-3xl font-light text-white mb-4 tracking-wide">
                Premium Automotive Experience
              </h3>
              <p className="text-gray-300 text-lg font-light max-w-2xl mx-auto">
                Visit our exclusive showroom to experience luxury automotive excellence firsthand
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LuxuryShowroom;
