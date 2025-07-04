import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Car, 
  Shield, 
  Award, 
  Users, 
  CheckCircle, 
  Star,
  Phone,
  Mail,
  MessageSquare
} from 'lucide-react';
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

const PremiumSalesService = () => {
  const handleContact = () => {
    const message = "I'm interested in your Premium Sales service. Please provide more information.";
    const whatsappUrl = `https://wa.me/14389257679?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleEmailContact = () => {
    const subject = "Premium Sales Service Inquiry";
    const body = "Hello,\n\nI'm interested in learning more about your Premium Sales service and the curated luxury vehicles you offer.\n\nPlease provide detailed information about:\n- Available inventory\n- Pricing and financing options\n- Inspection and certification process\n- Warranty and after-sales support\n\nThank you!";
    const mailtoUrl = `mailto:info@clubb2bperformance.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  };

  const services = [
    {
      title: "Curated Selection",
      description: "Handpicked luxury vehicles from trusted sources worldwide",
      features: ["Pre-inspected vehicles", "Verified history reports", "Quality guarantee", "Authenticity certification"]
    },
    {
      title: "Expert Consultation",
      description: "Personalized guidance from automotive specialists",
      features: ["Market expertise", "Vehicle matching", "Investment advice", "Performance analysis"]
    },
    {
      title: "Comprehensive Inspection",
      description: "Thorough multi-point inspection by certified technicians",
      features: ["Engine diagnostics", "Structural integrity", "Electronics testing", "Cosmetic assessment"]
    },
    {
      title: "Documentation & Warranty",
      description: "Complete paperwork handling and protection coverage",
      features: ["Title transfer", "Registration assistance", "Extended warranty options", "Insurance coordination"]
    }
  ];

  const benefits = [
    "Access to exclusive inventory not available elsewhere",
    "Transparent pricing with no hidden fees",
    "Professional vehicle photography and documentation",
    "Flexible financing and payment options",
    "White-glove delivery service worldwide",
    "24/7 customer support throughout the process"
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <Car className="w-16 h-16 mx-auto mb-6 text-white" />
          <h1 className="text-4xl md:text-6xl font-light mb-6 tracking-wider">
            PREMIUM SALES SERVICE
          </h1>
          <p className="text-xl text-gray-300 font-light mb-8">
            Curated luxury vehicles with uncompromising quality standards
          </p>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-white to-transparent mx-auto"></div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light mb-4 tracking-wider">WHAT WE PROVIDE</h2>
            <p className="text-gray-300">Comprehensive premium sales services tailored to your needs</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="bg-gradient-to-b from-gray-800 to-black border border-gray-700 hover:border-white transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-xl font-light tracking-wider text-white">{service.title}</CardTitle>
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

      {/* Benefits Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light mb-4 tracking-wider">WHY CHOOSE US</h2>
            <p className="text-gray-300">Exclusive benefits that set us apart</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="bg-gradient-to-b from-gray-800 to-black border border-gray-700">
                <CardContent className="p-6 flex items-start">
                  <Star className="w-5 h-5 text-yellow-500 mr-3 flex-shrink-0 mt-1" />
                  <p className="text-white">{benefit}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light mb-4 tracking-wider">OUR PROCESS</h2>
            <p className="text-gray-300">Simple steps to your dream vehicle</p>
          </div>

          <div className="grid md:grid-cols-5 gap-6">
            {[
              { step: 1, title: "Consultation", description: "Discuss your requirements and preferences" },
              { step: 2, title: "Vehicle Sourcing", description: "We find the perfect match from our network" },
              { step: 3, title: "Inspection", description: "Comprehensive quality assessment" },
              { step: 4, title: "Documentation", description: "Handle all paperwork and legalities" },
              { step: 5, title: "Delivery", description: "White-glove delivery to your location" }
            ].map((item, index) => (
              <Card key={index} className="bg-gradient-to-b from-gray-800 to-black border border-gray-700 text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                    {item.step}
                  </div>
                  <h3 className="text-white font-medium mb-2">{item.title}</h3>
                  <p className="text-gray-300 text-sm">{item.description}</p>
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
            READY TO FIND YOUR PERFECT VEHICLE?
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Contact our premium sales team for personalized service
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={handleContact}
              className="bg-white text-black hover:bg-gray-200 px-8 py-4 text-lg"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call Now
            </Button>
            <Button 
              onClick={handleEmailContact}
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg"
            >
              <Mail className="w-5 h-5 mr-2" />
              Email Us
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      <BackToTop />
    </div>
  );
};

export default PremiumSalesService;