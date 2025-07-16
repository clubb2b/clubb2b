import { Button } from "@/components/ui/button";
import { Car, Globe, Shield, Users, Camera } from "lucide-react";
const Services = () => {
  const services = [{
    icon: <Car className="w-8 h-8" />,
    title: "Premium Sales",
    description: "Curated luxury vehicles",
    action: () => window.location.href = '/premium-sales'
  }, {
    icon: <Globe className="w-8 h-8" />,
    title: "Global Export",
    description: "Worldwide shipping solutions",
    action: () => window.location.href = '/global-export'
  }, {
    icon: <Shield className="w-8 h-8" />,
    title: "Quality Assured",
    description: "Comprehensive inspections",
    action: () => window.location.href = '/quality-assurance'
  }, {
    icon: <Users className="w-8 h-8" />,
    title: "VIP Service",
    description: "Personalized experience",
    action: () => window.location.href = '/vip-service'
  }, {
    icon: <Camera className="w-8 h-8" />,
    title: "AI Photography",
    description: "Professional photo optimization",
    action: () => window.location.href = '/ai-photo-studio'
  }];
  return <section id="services" className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light mb-6 text-white tracking-wider">
            OUR SERVICES
          </h2>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-white to-transparent mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
          {services.map((service, index) => (
            <div key={index} className="group relative overflow-hidden bg-gradient-to-b from-gray-900/50 to-black/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6 hover:border-white/20 transition-all duration-300">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="text-white group-hover:text-blue-400 transition-colors duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-light text-white tracking-wide">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {service.description}
                </p>
                <Button
                  onClick={service.action}
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300"
                >
                  Learn More
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>;
};
export default Services;