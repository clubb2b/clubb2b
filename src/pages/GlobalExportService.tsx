import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Globe, 
  Ship, 
  Plane, 
  Truck, 
  CheckCircle, 
  MapPin,
  Clock,
  Shield,
  Phone,
  Mail
} from 'lucide-react';
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

const GlobalExportService = () => {
  const handleContact = () => {
    const message = "I'm interested in your Global Export service. Please provide more information about worldwide shipping solutions.";
    const whatsappUrl = `https://wa.me/14389257679?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleEmailContact = () => {
    const subject = "Global Export Service Inquiry";
    const body = "Hello,\n\nI'm interested in your Global Export services for vehicle shipping.\n\nPlease provide information about:\n- Shipping destinations available\n- Pricing for different regions\n- Transit times and methods\n- Required documentation\n- Insurance and tracking options\n\nThank you!";
    const mailtoUrl = `mailto:info@clubb2bperformance.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  };

  const destinations = [
    { region: "West Africa", countries: ["Nigeria", "Ghana", "Senegal", "Ivory Coast"], transit: "18-25 days" },
    { region: "East Africa", countries: ["Kenya", "Tanzania", "Uganda", "Ethiopia"], transit: "25-35 days" },
    { region: "Europe", countries: ["Germany", "UK", "Netherlands", "France"], transit: "15-20 days" },
    { region: "Asia", countries: ["Japan", "South Korea", "Dubai", "Singapore"], transit: "20-30 days" },
    { region: "Caribbean", countries: ["Jamaica", "Trinidad", "Barbados", "Dominican Republic"], transit: "12-18 days" },
    { region: "South America", countries: ["Brazil", "Argentina", "Chile", "Colombia"], transit: "20-28 days" }
  ];

  const services = [
    {
      icon: Ship,
      title: "Maritime Shipping",
      description: "Cost-effective ocean freight for most destinations",
      features: ["Container and RoRo options", "Full cargo tracking", "Insurance included", "Door-to-port service"]
    },
    {
      icon: Plane,
      title: "Air Freight",
      description: "Express delivery for urgent shipments",
      features: ["Fastest transit times", "Climate controlled", "Real-time updates", "Airport-to-airport"]
    },
    {
      icon: Truck,
      title: "Overland Transport",
      description: "Regional delivery across North America",
      features: ["Door-to-door service", "GPS tracking", "Secure carriers", "Flexible scheduling"]
    }
  ];

  const benefits = [
    "Worldwide network of trusted shipping partners",
    "Competitive rates with transparent pricing",
    "Expert handling of customs and documentation",
    "Comprehensive insurance coverage options",
    "Real-time shipment tracking and updates",
    "Dedicated customer support in multiple languages"
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <Globe className="w-16 h-16 mx-auto mb-6 text-white" />
          <h1 className="text-4xl md:text-6xl font-light mb-6 tracking-wider">
            GLOBAL EXPORT SERVICE
          </h1>
          <p className="text-xl text-gray-300 font-light mb-8">
            Worldwide shipping solutions connecting Canada to the globe
          </p>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-white to-transparent mx-auto"></div>
        </div>
      </section>

      {/* Destinations */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light mb-4 tracking-wider">SHIPPING DESTINATIONS</h2>
            <p className="text-gray-300">We ship to major ports worldwide</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((dest, index) => (
              <Card key={index} className="bg-gradient-to-b from-gray-800 to-black border border-gray-700 hover:border-white transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-xl font-light tracking-wider text-white flex items-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    {dest.region}
                  </CardTitle>
                  <Badge className="bg-white text-black w-fit">{dest.transit}</Badge>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {dest.countries.map((country, countryIndex) => (
                      <div key={countryIndex} className="flex items-center text-gray-300">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        {country}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Shipping Methods */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light mb-4 tracking-wider">SHIPPING METHODS</h2>
            <p className="text-gray-300">Choose the best option for your needs</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="bg-gradient-to-b from-gray-800 to-black border border-gray-700 hover:border-white transition-all duration-300">
                <CardHeader className="text-center">
                  <service.icon className="w-12 h-12 mx-auto mb-4 text-white" />
                  <CardTitle className="text-xl font-light tracking-wider">{service.title}</CardTitle>
                  <p className="text-gray-300">{service.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-300">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light mb-4 tracking-wider">OUR ADVANTAGES</h2>
            <p className="text-gray-300">Why choose our global export service</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="bg-gradient-to-b from-gray-800 to-black border border-gray-700">
                <CardContent className="p-6 flex items-start">
                  <Shield className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0 mt-1" />
                  <p className="text-white">{benefit}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light mb-4 tracking-wider">EXPORT PROCESS</h2>
            <p className="text-gray-300">Step-by-step shipping workflow</p>
          </div>

          <div className="grid md:grid-cols-6 gap-4">
            {[
              { step: 1, title: "Quote Request", description: "Get instant pricing" },
              { step: 2, title: "Documentation", description: "Prepare export papers" },
              { step: 3, title: "Vehicle Pickup", description: "Collect from location" },
              { step: 4, title: "Port Processing", description: "Customs clearance" },
              { step: 5, title: "Transit", description: "Ship to destination" },
              { step: 6, title: "Delivery", description: "Arrive at port" }
            ].map((item, index) => (
              <Card key={index} className="bg-gradient-to-b from-gray-800 to-black border border-gray-700 text-center">
                <CardContent className="p-4">
                  <div className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-sm">
                    {item.step}
                  </div>
                  <h3 className="text-white font-medium mb-1 text-sm">{item.title}</h3>
                  <p className="text-gray-300 text-xs">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-light mb-6 tracking-wider">
            SHIP WORLDWIDE TODAY
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Connect with our export specialists for competitive rates
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={handleContact}
              className="bg-white text-black hover:bg-gray-200 px-8 py-4 text-lg"
            >
              <Phone className="w-5 h-5 mr-2" />
              Get Quote Now
            </Button>
            <Button 
              onClick={handleEmailContact}
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg"
            >
              <Mail className="w-5 h-5 mr-2" />
              Email Export Team
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      <BackToTop />
    </div>
  );
};

export default GlobalExportService;