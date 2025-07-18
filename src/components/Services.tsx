import { Button } from "@/components/ui/button";
import { Car, Globe, Shield, Users, Camera, FileText, Calculator, Truck } from "lucide-react";

const Services = () => {
  const mainServices = [{
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

  const advancedServices = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Insurance & Protection",
      description: "Comprehensive coverage for your vehicle during transport",
      action: () => {
        const message = "I'm interested in Insurance & Protection. Please provide more information.";
        const whatsappUrl = `https://wa.me/15185077243?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
      }
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Documentation Services",
      description: "Complete paperwork handling for international shipping",
      action: () => {
        const message = "I'm interested in Documentation Services. Please provide more information.";
        const whatsappUrl = `https://wa.me/15185077243?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
      }
    },
    {
      icon: <Calculator className="w-8 h-8" />,
      title: "Price Calculator",
      description: "Get instant shipping estimates for your destination",
      action: () => {
        const element = document.getElementById('price-calculator');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Tracking System",
      description: "Real-time updates on your vehicle's journey",
      action: () => {
        const message = "I'm interested in Tracking System. Please provide more information.";
        const whatsappUrl = `https://wa.me/15185077243?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
      }
    }
  ];
  return (
    <section id="services" className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light mb-6 text-white tracking-wider">
            OUR SERVICES
          </h2>
          <p className="text-xl text-gray-300 font-light mb-8">
            Complete automotive solutions for luxury vehicle enthusiasts
          </p>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-white to-transparent mx-auto"></div>
        </div>

        {/* Main Services */}
        <div className="mb-16">
          <h3 className="text-2xl font-light text-white text-center mb-8 tracking-wide">Core Services</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {mainServices.map((service, index) => (
              <div key={index} className="group relative overflow-hidden bg-gradient-to-b from-gray-900/50 to-black/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6 hover:border-white/20 transition-all duration-300">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="text-white group-hover:text-blue-400 transition-colors duration-300">
                    {service.icon}
                  </div>
                  <h4 className="text-xl font-light text-white tracking-wide">
                    {service.title}
                  </h4>
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

        {/* Advanced Services */}
        <div>
          <h3 className="text-2xl font-light text-white text-center mb-8 tracking-wide">Advanced Solutions</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advancedServices.map((service, index) => (
              <div key={index} className="bg-gradient-to-b from-gray-800 to-gray-900 p-8 rounded-lg border border-gray-700 text-center hover:border-white transition-all duration-300 group">
                <div className="text-white mb-6 group-hover:scale-110 transition-transform duration-300 flex justify-center">
                  {service.icon}
                </div>
                <h4 className="text-xl font-light text-white mb-4 tracking-wide">
                  {service.title}
                </h4>
                <p className="text-gray-300 font-light mb-6 leading-relaxed">
                  {service.description}
                </p>
                <Button 
                  onClick={service.action}
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black px-6 py-2 font-light tracking-wider transition-all duration-300"
                >
                  Get Started
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default Services;