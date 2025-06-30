
import { Button } from "@/components/ui/button";
import { Truck, Ship, Plane, Car, Sofa, Smartphone } from "lucide-react";

const ImportExportServices = () => {
  const shippingServices = [
    {
      icon: <Car className="w-8 h-8" />,
      title: "LUXURY VEHICLES",
      description: "Premium cars, trucks, motorcycles, and exotic vehicles worldwide",
      items: ["Sports Cars", "Luxury SUVs", "Classic Cars", "Motorcycles"]
    },
    {
      icon: <Ship className="w-8 h-8" />,
      title: "MARINE VESSELS",
      description: "Boats, yachts, jet skis, and marine equipment shipping",
      items: ["Luxury Yachts", "Speed Boats", "Jet Skis", "Marine Parts"]
    },
    {
      icon: <Plane className="w-8 h-8" />,
      title: "AIRCRAFT",
      description: "Private jets, helicopters, and aviation equipment",
      items: ["Private Jets", "Helicopters", "Aviation Parts", "Drones"]
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "ELECTRONICS",
      description: "High-end electronics and technology equipment",
      items: ["Smartphones", "Gaming Systems", "Audio Equipment", "Smart Home"]
    },
    {
      icon: <Sofa className="w-8 h-8" />,
      title: "LUXURY FURNITURE",
      description: "Designer furniture and home décor worldwide",
      items: ["Designer Sofas", "Art Pieces", "Antiques", "Home Décor"]
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: "COMMERCIAL EQUIPMENT",
      description: "Industrial machinery and commercial equipment",
      items: ["Heavy Machinery", "Construction Equipment", "Industrial Tools", "Medical Equipment"]
    }
  ];

  const handleServiceInquiry = (service: string) => {
    const message = `I'm interested in your ${service} shipping services. Please provide more information.`;
    const whatsappUrl = `https://wa.me/15185077243?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light mb-6 text-white tracking-wider">
            GLOBAL IMPORT & EXPORT
          </h2>
          <p className="text-xl text-gray-300 font-light mb-8">
            Worldwide shipping services for luxury goods and equipment
          </p>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-white to-transparent mx-auto mb-8"></div>
          <p className="text-gray-300 text-lg font-light leading-relaxed max-w-3xl mx-auto">
            CLUB B2B PERFORMANCE offers comprehensive import and export services worldwide. 
            From Canada to Africa and beyond, we handle all your luxury shipping needs with 
            complete documentation, insurance, and white-glove service.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {shippingServices.map((service, index) => (
            <div 
              key={index}
              className="bg-gradient-to-b from-gray-900 to-black border border-gray-700 rounded-lg p-8 hover:shadow-2xl hover:border-white transition-all duration-500 group"
            >
              <div className="text-white mb-6 group-hover:scale-110 transition-transform duration-300 flex justify-center">
                {service.icon}
              </div>
              
              <h3 className="text-xl font-light text-white mb-4 text-center tracking-wide">
                {service.title}
              </h3>
              
              <p className="text-gray-300 text-center mb-6 font-light leading-relaxed">
                {service.description}
              </p>
              
              <div className="space-y-2 mb-6">
                {service.items.map((item, i) => (
                  <p key={i} className="text-gray-400 text-center text-sm">
                    • {item}
                  </p>
                ))}
              </div>
              
              <Button 
                onClick={() => handleServiceInquiry(service.title)}
                className="w-full bg-transparent border border-white text-white hover:bg-white hover:text-black font-light tracking-wider transition-all duration-300"
              >
                GET QUOTE
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="bg-gradient-to-r from-gray-900 to-black border border-gray-700 rounded-lg p-12 mb-8">
            <h3 className="text-3xl font-light text-white mb-6 tracking-wider">
              Complete Logistics Solution
            </h3>
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  📋
                </div>
                <h4 className="text-white font-light mb-2">Documentation</h4>
                <p className="text-gray-300 text-sm">Complete customs and legal paperwork</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  🛡️
                </div>
                <h4 className="text-white font-light mb-2">Insurance</h4>
                <p className="text-gray-300 text-sm">Full coverage protection worldwide</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  🚚
                </div>
                <h4 className="text-white font-light mb-2">Door-to-Door</h4>
                <p className="text-gray-300 text-sm">Complete pickup and delivery service</p>
              </div>
            </div>
            <Button 
              onClick={() => handleServiceInquiry('Complete Logistics Solution')}
              className="bg-white text-black hover:bg-gray-200 px-12 py-4 text-lg font-light tracking-wider transition-all duration-300"
            >
              START YOUR SHIPMENT
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImportExportServices;
