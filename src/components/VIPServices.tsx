
import { Button } from "@/components/ui/button";
import { Crown, Calendar, Phone, MessageCircle } from "lucide-react";

const VIPServices = () => {
  const vipServices = [
    {
      icon: <Crown className="w-8 h-8" />,
      title: "VIP CHAUFFEUR SERVICE",
      description: "Professional drivers with luxury vehicles for executive transport",
      features: ["Executive Drivers", "Luxury Fleet", "Airport Transfers", "Corporate Events"]
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "LUXURY CAR RENTAL",
      description: "Premium vehicle rentals for special occasions and business needs",
      features: ["Exotic Cars", "Weekly/Monthly", "Special Events", "Corporate Rates"]
    },
    {
      icon: <Phone className="w-8 h-8" />,
      title: "CONCIERGE SERVICES",
      description: "24/7 personal assistant services for all your luxury needs",
      features: ["Personal Shopping", "Event Planning", "Travel Arrangements", "Property Services"]
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "VIP MEMBERSHIP",
      description: "Exclusive access to our premium services and priority support",
      features: ["Priority Access", "Exclusive Events", "Member Discounts", "Personal Account Manager"]
    }
  ];

  const handleServiceBooking = (service: string) => {
    const message = `I would like to book your ${service}. Please provide availability and pricing.`;
    const whatsappUrl = `https://wa.me/15185077243?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light mb-6 text-white tracking-wider">
            VIP SERVICES
          </h2>
          <p className="text-xl text-gray-300 font-light mb-8">
            Exclusive services for discerning clients
          </p>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-white to-transparent mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {vipServices.map((service, index) => (
            <div 
              key={index}
              className="bg-gradient-to-b from-gray-800 to-gray-900 border border-gray-700 rounded-lg p-8 hover:shadow-2xl hover:border-white transition-all duration-500 group"
            >
              <div className="text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              
              <h3 className="text-2xl font-light text-white mb-4 tracking-wide">
                {service.title}
              </h3>
              
              <p className="text-gray-300 mb-6 font-light leading-relaxed">
                {service.description}
              </p>
              
              <div className="grid grid-cols-2 gap-3 mb-8">
                {service.features.map((feature, i) => (
                  <div key={i} className="text-gray-400 text-sm">
                    • {feature}
                  </div>
                ))}
              </div>
              
              <Button 
                onClick={() => handleServiceBooking(service.title)}
                className="w-full bg-transparent border border-white text-white hover:bg-white hover:text-black font-light tracking-wider transition-all duration-300"
              >
                BOOK NOW
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VIPServices;
