
import { Button } from "@/components/ui/button";
import { Plane } from "lucide-react";
import BrandLogo from "./BrandLogo";

const AirFreightServices = () => {
  const services = [
    "Expédition",
    "Consolidation",
    "Service de petits emballages",
    "Service de livraison",
    "Affrètement d'avions Cargos",
    "Dédouanement",
    "Suivi des colis",
    "Soutien à l'étranger grâce à nos différents partenaires"
  ];

  const handleInquiry = () => {
    const message = "I'm interested in your Air Freight services. Please provide more information.";
    const whatsappUrl = `https://wa.me/15185077243?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light mb-6 text-white tracking-wider">
            FRET AÉRIEN
          </h2>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-white to-transparent mx-auto mb-8"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-3xl font-light text-white mb-6 tracking-wide">
              Air Transportation Excellence
            </h3>
            <div className="grid grid-cols-1 gap-4 mb-8">
              {services.map((service, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <p className="text-gray-300 font-light">{service}</p>
                </div>
              ))}
            </div>
            <Button 
              onClick={handleInquiry}
              className="bg-white text-black hover:bg-gray-200 px-8 py-3 font-light tracking-wider transition-all duration-300"
            >
              GET AIR FREIGHT QUOTE
            </Button>
          </div>
          
          <div className="relative">
            <div className="aspect-video rounded-lg overflow-hidden border border-gray-700 bg-gradient-to-b from-gray-800 to-gray-900 flex items-center justify-center">
              <div className="text-center">
                <Plane className="w-24 h-24 text-white mx-auto mb-4" />
                <BrandLogo size="medium" className="mx-auto" />
                <p className="text-gray-300 mt-4 font-light">Air Cargo Services</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AirFreightServices;
