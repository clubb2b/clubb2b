import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Video, 
  Ship, 
  Cpu, 
  BarChart3, 
  Crown, 
  Calculator 
} from "lucide-react";

const QuickAccessButtons = () => {
  const services = [
    {
      icon: <Video className="w-8 h-8" />,
      title: "Live Video Inspection",
      description: "Real-time vehicle inspection with our experts",
      link: "/video-inspection",
      color: "from-blue-600 to-cyan-600"
    },
    {
      icon: <Ship className="w-8 h-8" />,
      title: "Import & Export Services",
      description: "Global freight solutions for luxury vehicles, marine vessels & aircraft",
      link: "/import-export",
      color: "from-green-600 to-emerald-600"
    },
    {
      icon: <Cpu className="w-8 h-8" />,
      title: "Advanced Technology",
      description: "Next-generation AI and blockchain solutions",
      link: "/tech-features",
      color: "from-purple-600 to-violet-600"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Business Intelligence",
      description: "Analytics dashboard and insights",
      link: "/dashboard",
      color: "from-orange-600 to-red-600"
    },
    {
      icon: <Crown className="w-8 h-8" />,
      title: "VIP Services & Membership",
      description: "Exclusive premium services and membership tiers",
      link: "/vip-membership",
      color: "from-yellow-600 to-amber-600"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light mb-6 text-white tracking-wider">
            OUR SERVICES
          </h2>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-white to-transparent mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 font-light max-w-4xl mx-auto">
            Explore our comprehensive range of premium services
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="bg-gradient-to-b from-gray-800 to-gray-900 border border-gray-700 text-white hover:border-white transition-all duration-300 group hover:scale-105"
            >
              <CardHeader className="text-center">
                <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <div className="text-white">
                    {service.icon}
                  </div>
                </div>
                <CardTitle className="text-xl font-light tracking-wide">
                  {service.title}
                </CardTitle>
                <CardDescription className="text-gray-300">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={() => window.location.href = service.link}
                  className="w-full bg-transparent border border-white text-white hover:bg-white hover:text-black font-light tracking-wider transition-all duration-300"
                >
                  EXPLORE
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickAccessButtons;