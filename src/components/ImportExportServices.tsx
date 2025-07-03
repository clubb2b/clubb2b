
import { Button } from "@/components/ui/button";
import { Truck, Ship, Plane, Car, Sofa, Smartphone } from "lucide-react";

const ImportExportServices = () => {
  const shippingServices = [
    {
      icon: <Car className="w-8 h-8" />,
      title: "LUXURY VEHICLES",
      description: "Premium cars, trucks, motorcycles, and exotic vehicles worldwide",
      items: ["Sports Cars", "Luxury SUVs", "Classic Cars", "Motorcycles"],
      image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80"
    },
    {
      icon: <Ship className="w-8 h-8" />,
      title: "MARINE VESSELS",
      description: "Boats, yachts, jet skis, and marine equipment shipping",
      items: ["Luxury Yachts", "Speed Boats", "Jet Skis", "Marine Parts"],
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80"
    },
    {
      icon: <Plane className="w-8 h-8" />,
      title: "AIRCRAFT",
      description: "Private jets, helicopters, and aviation equipment",
      items: ["Private Jets", "Helicopters", "Aviation Parts", "Drones"],
      image: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&w=1200&q=80"
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "ELECTRONICS",
      description: "High-end electronics and technology equipment",
      items: ["Smartphones", "Gaming Systems", "Audio Equipment", "Smart Home"],
      image: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?auto=format&fit=crop&w=1200&q=80"
    },
    {
      icon: <Sofa className="w-8 h-8" />,
      title: "LUXURY FURNITURE",
      description: "Designer furniture and home décor worldwide",
      items: ["Designer Sofas", "Art Pieces", "Antiques", "Home Décor"],
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80"
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: "COMMERCIAL EQUIPMENT",
      description: "Industrial machinery and commercial equipment",
      items: ["Heavy Machinery", "Construction Equipment", "Industrial Tools", "Medical Equipment"],
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80"
    }
  ];

  const canadianLegalSteps = [
    "Export Permit (if required)",
    "Commercial Invoice",
    "Bill of Lading/Airway Bill",
    "Certificate of Origin",
    "Export Declaration (B13A)",
    "CITES Permit (if applicable)",
    "Dangerous Goods Declaration",
    "Marine Insurance Certificate",
    "Export Control List Compliance",
    "Customs Bond (if required)"
  ];

  const handleServiceInquiry = (service: string) => {
    const message = `I'm interested in your ${service} shipping services. Please provide more information.`;
    const whatsappUrl = `https://wa.me/15185077243?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="import-export" className="py-20 bg-gradient-to-b from-black to-gray-900">
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
              className="bg-gradient-to-b from-gray-900 to-black border border-gray-700 rounded-lg overflow-hidden hover:shadow-2xl hover:border-white transition-all duration-500 group"
            >
              <div className="aspect-video overflow-hidden">
                <img 
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              
              <div className="p-6">
                <div className="text-white mb-4 flex justify-center">
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
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="bg-gradient-to-r from-gray-900 to-black border border-gray-700 rounded-lg p-12 mb-8">
            <h3 className="text-3xl font-light text-white mb-6 tracking-wider">
              Complete Logistics Solution
            </h3>
            
            <div className="grid md:grid-cols-2 gap-12 mb-8">
              <div>
                <h4 className="text-xl font-light text-white mb-6 tracking-wide">Service Features</h4>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                      📋
                    </div>
                    <h5 className="text-white font-light mb-2">Documentation</h5>
                    <p className="text-gray-300 text-sm">Complete customs and legal paperwork</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                      🛡️
                    </div>
                    <h5 className="text-white font-light mb-2">Insurance</h5>
                    <p className="text-gray-300 text-sm">Full coverage protection worldwide</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                      🚚
                    </div>
                    <h5 className="text-white font-light mb-2">Door-to-Door</h5>
                    <p className="text-gray-300 text-sm">Complete pickup and delivery service</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-xl font-light text-white mb-6 tracking-wide">Canadian Export Requirements</h4>
                <div className="grid grid-cols-1 gap-2 text-left">
                  {canadianLegalSteps.map((step, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-white rounded-full flex-shrink-0"></div>
                      <p className="text-gray-300 text-sm font-light">{step}</p>
                    </div>
                  ))}
                </div>
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
