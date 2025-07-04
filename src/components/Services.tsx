
import { Button } from "@/components/ui/button";
import { Car, Globe, Shield, Users } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: <Car className="w-8 h-8" />,
      title: "Premium Sales",
      description: "Curated luxury vehicles",
      action: () => window.location.href = '/premium-sales'
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Export",
      description: "Worldwide shipping solutions",
      action: () => window.location.href = '/global-export'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Quality Assured",
      description: "Comprehensive inspections",
      action: () => window.location.href = '/quality-assurance'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "VIP Service",
      description: "Personalized experience",
      action: () => window.location.href = '/vip-service'
    }
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light mb-6 text-white tracking-wider">
            OUR SERVICES
          </h2>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-white to-transparent mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              onClick={service.action}
              className="bg-gradient-to-b from-gray-800 to-gray-900 p-8 rounded-lg border border-gray-700 text-center hover:border-white transition-all duration-300 group cursor-pointer hover:scale-105"
            >
              <div className="text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-light text-white mb-4 tracking-wide">{service.title}</h3>
              <p className="text-gray-300 font-light mb-4">{service.description}</p>
              <Button 
                className="bg-transparent border border-white text-white hover:bg-white hover:text-black font-light tracking-wider transition-all duration-300"
                size="sm"
              >
                LEARN MORE
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
