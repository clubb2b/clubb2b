
import { Button } from "@/components/ui/button";
import { Ship } from "lucide-react";
import BrandLogo from "./BrandLogo";

const MaritimeServices = () => {
  const services = [
    "Complete loading of container",
    "Partial container loading (Grouping)",
    "Special equipment (Flat Rack / Open Top)",
    "Pickup and unloading",
    "Manipulation",
    "Packaging and crating"
  ];

  const handleInquiry = () => {
    const message = "I'm interested in your Maritime Freight services. Please provide more information.";
    const whatsappUrl = `https://wa.me/15185077243?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light mb-6 text-white tracking-wider">
            MARITIME FREIGHT
          </h2>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-white to-transparent mx-auto mb-8"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="relative">
            <div className="aspect-video rounded-lg overflow-hidden border border-gray-700">
              <img 
                src="/lovable-uploads/2aee0832-ae6b-4b1b-9533-f52597f3ccf5.png"
                alt="Maritime freight containers at port"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div>
            <h3 className="text-3xl font-light text-white mb-6 tracking-wide">
              Global Shipping Solutions
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
              GET MARITIME QUOTE
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MaritimeServices;
