import { Button } from "@/components/ui/button";
import { Ship, Plane } from "lucide-react";

const CombinedFreightServices = () => {
  const maritimeServices = [
    "Complete loading of container",
    "Partial container loading (Grouping)",
    "Special equipment (Flat Rack / Open Top)",
    "Pickup and unloading",
    "Manipulation",
    "Packaging and crating"
  ];

  const airServices = [
    "Expedited Shipping",
    "Consolidation Services", 
    "Small Package Services",
    "Delivery Services",
    "Cargo Aircraft Charter",
    "Customs Clearance",
    "Package Tracking",
    "International Support"
  ];

  const handleMaritimeInquiry = () => {
    const message = "I'm interested in your Maritime Freight services. Please provide more information.";
    const whatsappUrl = `https://wa.me/14389257679?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleAirInquiry = () => {
    const message = "I'm interested in your Air Freight services. Please provide more information.";
    const whatsappUrl = `https://wa.me/14389257679?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="py-16 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-light mb-6 text-white tracking-wider">
            GLOBAL FREIGHT SOLUTIONS
          </h2>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-white to-transparent mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 font-light">
            Comprehensive shipping solutions by sea and air
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Maritime Freight */}
          <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg border border-gray-700 overflow-hidden hover:border-white transition-all duration-300">
            <div className="aspect-[4/3] overflow-hidden">
              <img 
                src="/lovable-uploads/2aee0832-ae6b-4b1b-9533-f52597f3ccf5.png"
                alt="Maritime freight containers at port"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            
            <div className="p-6">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <Ship className="w-6 h-6 text-black" />
                </div>
              </div>
              
              <h3 className="text-2xl font-light text-white mb-4 tracking-wide text-center">
                MARITIME FREIGHT
              </h3>
              
              <div className="grid grid-cols-1 gap-2 mb-6">
                {maritimeServices.map((service, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-1.5 h-1.5 bg-white rounded-full flex-shrink-0"></div>
                    <p className="text-gray-300 font-light text-sm">{service}</p>
                  </div>
                ))}
              </div>
              
              <Button 
                onClick={handleMaritimeInquiry}
                className="w-full bg-white text-black hover:bg-gray-200 px-6 py-2 font-light tracking-wider transition-all duration-300"
              >
                GET MARITIME QUOTE
              </Button>
            </div>
          </div>

          {/* Air Freight */}
          <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg border border-gray-700 overflow-hidden hover:border-white transition-all duration-300">
            <div className="aspect-[4/3] overflow-hidden">
              <img 
                src="/lovable-uploads/f1d37320-287c-470f-aa83-b83a5c16c8e5.png"
                alt="Air freight logistics with plane and containers"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            
            <div className="p-6">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <Plane className="w-6 h-6 text-black" />
                </div>
              </div>
              
              <h3 className="text-2xl font-light text-white mb-4 tracking-wide text-center">
                AIR FREIGHT
              </h3>
              
              <div className="grid grid-cols-1 gap-2 mb-6">
                {airServices.map((service, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-1.5 h-1.5 bg-white rounded-full flex-shrink-0"></div>
                    <p className="text-gray-300 font-light text-sm">{service}</p>
                  </div>
                ))}
              </div>
              
              <Button 
                onClick={handleAirInquiry}
                className="w-full bg-white text-black hover:bg-gray-200 px-6 py-2 font-light tracking-wider transition-all duration-300"
              >
                GET AIR FREIGHT QUOTE
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CombinedFreightServices;