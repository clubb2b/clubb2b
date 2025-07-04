import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Crown, 
  Star, 
  Clock, 
  Shield, 
  Car,
  Plane,
  Settings,
  Phone,
  Mail,
  CheckCircle
} from 'lucide-react';
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

const VIPService = () => {
  const handleContact = () => {
    const message = "I'm interested in your VIP services. Please provide more information about your premium offerings.";
    const whatsappUrl = `https://wa.me/14389257679?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleEmailContact = () => {
    const subject = "VIP Service Inquiry";
    const body = "Hello,\n\nI'm interested in your VIP services and personalized experience offerings.\n\nPlease provide information about:\n- VIP membership tiers and benefits\n- Exclusive vehicle access\n- Concierge services available\n- Pricing and membership options\n- Priority support features\n\nThank you!";
    const mailtoUrl = `mailto:info@clubb2bperformance.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  };

  const vipTiers = [
    {
      tier: "VIP Gold",
      icon: Star,
      price: "$2,500/year",
      color: "bg-yellow-600",
      benefits: [
        "Priority vehicle access",
        "Dedicated account manager",
        "15% discount on all services",
        "Quarterly vehicle reports",
        "VIP customer support",
        "Exclusive event invitations"
      ]
    },
    {
      tier: "VIP Platinum",
      icon: Crown,
      price: "$5,000/year",
      color: "bg-gray-400",
      benefits: [
        "First access to new inventory",
        "Personal vehicle sourcing",
        "25% discount on all services",
        "Monthly market updates",
        "White-glove delivery",
        "Private viewing appointments",
        "Concierge services",
        "Travel and accommodation assistance"
      ]
    },
    {
      tier: "VIP Diamond",
      icon: Crown,
      price: "$10,000/year",
      color: "bg-blue-600",
      benefits: [
        "Exclusive access to rare vehicles",
        "Custom vehicle sourcing worldwide",
        "35% discount on all services",
        "Weekly market intelligence",
        "Private jet delivery coordination",
        "24/7 concierge services",
        "Investment advisory services",
        "Access to private auctions",
        "Complimentary vehicle storage",
        "Annual vehicle portfolio review"
      ]
    }
  ];

  const exclusiveServices = [
    {
      icon: Car,
      title: "Private Vehicle Sourcing",
      description: "Access to exclusive inventory not available to the public",
      features: ["Rare and limited edition vehicles", "Private collection access", "Auction house connections", "Custom specifications"]
    },
    {
      icon: Settings,
      title: "Concierge Services",
      description: "Personalized assistance for all your automotive needs",
      features: ["Vehicle maintenance coordination", "Insurance and registration", "Transportation arrangements", "Event planning"]
    },
    {
      icon: Plane,
      title: "Global Delivery",
      description: "White-glove delivery service anywhere in the world",
      features: ["Private jet coordination", "Enclosed transport", "Personal delivery team", "Destination services"]
    },
    {
      icon: Shield,
      title: "Investment Protection",
      description: "Safeguard and grow your automotive investments",
      features: ["Market analysis reports", "Portfolio management", "Appreciation tracking", "Exit strategy planning"]
    }
  ];

  const vipPerks = [
    "Skip the line - Priority processing for all requests",
    "Direct access to our executive team",
    "Invitations to exclusive automotive events",
    "Complimentary annual vehicle health checks",
    "Access to our private lounge facilities",
    "Personal shopping assistance for accessories",
    "Preferred rates with partner services",
    "Annual appreciation dinner and networking event"
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <Users className="w-16 h-16 mx-auto mb-6 text-white" />
          <h1 className="text-4xl md:text-6xl font-light mb-6 tracking-wider">
            VIP SERVICE
          </h1>
          <p className="text-xl text-gray-300 font-light mb-8">
            Personalized experience with exclusive privileges and priority access
          </p>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-white to-transparent mx-auto"></div>
        </div>
      </section>

      {/* VIP Membership Tiers */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light mb-4 tracking-wider">MEMBERSHIP TIERS</h2>
            <p className="text-gray-300">Choose the level of service that matches your lifestyle</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {vipTiers.map((tier, index) => (
              <Card key={index} className="bg-gradient-to-b from-gray-800 to-black border border-gray-700 hover:border-white transition-all duration-300 relative overflow-hidden">
                <div className={`absolute top-0 left-0 right-0 h-1 ${tier.color}`}></div>
                <CardHeader className="text-center">
                  <tier.icon className="w-12 h-12 mx-auto mb-4 text-white" />
                  <CardTitle className="text-2xl font-light tracking-wider text-white">{tier.tier}</CardTitle>
                  <Badge className="bg-white text-black text-lg px-4 py-2">{tier.price}</Badge>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {tier.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-start text-gray-300">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    onClick={handleContact}
                    className="w-full mt-6 bg-white text-black hover:bg-gray-200"
                  >
                    Join {tier.tier}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Exclusive Services */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light mb-4 tracking-wider">EXCLUSIVE SERVICES</h2>
            <p className="text-gray-300">Premium services available only to VIP members</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {exclusiveServices.map((service, index) => (
              <Card key={index} className="bg-gradient-to-b from-gray-800 to-black border border-gray-700 hover:border-white transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center mb-4">
                    <service.icon className="w-8 h-8 text-white mr-3" />
                    <CardTitle className="text-xl font-light tracking-wider text-white">{service.title}</CardTitle>
                  </div>
                  <p className="text-gray-300">{service.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-300">
                        <Star className="w-4 h-4 text-yellow-500 mr-2 flex-shrink-0" />
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

      {/* VIP Perks */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light mb-4 tracking-wider">VIP PERKS & PRIVILEGES</h2>
            <p className="text-gray-300">Additional benefits that come with VIP membership</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {vipPerks.map((perk, index) => (
              <Card key={index} className="bg-gradient-to-b from-gray-800 to-black border border-gray-700">
                <CardContent className="p-6 text-center">
                  <Crown className="w-8 h-8 text-yellow-500 mx-auto mb-4" />
                  <p className="text-white text-sm">{perk}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light mb-4 tracking-wider">VIP MEMBER EXPERIENCES</h2>
            <p className="text-gray-300">What our VIP members say about their experience</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Marcus Johnson",
                tier: "VIP Diamond",
                testimonial: "The personalized service is unmatched. They sourced a rare 1967 Shelby GT500 that I had been searching for years.",
                achievement: "Acquired dream classic car"
              },
              {
                name: "Sarah Chen",
                tier: "VIP Platinum", 
                testimonial: "The concierge service handled everything from purchase to delivery to my home in Hong Kong. Completely seamless.",
                achievement: "International delivery success"
              },
              {
                name: "Robert Williams",
                tier: "VIP Gold",
                testimonial: "As a VIP member, I get first access to new inventory. I've built an incredible collection with their expertise.",
                achievement: "Portfolio worth $2M+"
              }
            ].map((story, index) => (
              <Card key={index} className="bg-gradient-to-b from-gray-800 to-black border border-gray-700">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg font-light tracking-wider text-white">{story.name}</CardTitle>
                      <Badge className="bg-yellow-600 text-white mt-1">{story.tier}</Badge>
                    </div>
                    <Users className="w-8 h-8 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4 italic">"{story.testimonial}"</p>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 mr-2" />
                    <span className="text-white text-sm font-medium">{story.achievement}</span>
                  </div>
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
            EXPERIENCE VIP TREATMENT
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Join our exclusive VIP program and elevate your automotive experience
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={handleContact}
              className="bg-white text-black hover:bg-gray-200 px-8 py-4 text-lg"
            >
              <Phone className="w-5 h-5 mr-2" />
              Become VIP Member
            </Button>
            <Button 
              onClick={handleEmailContact}
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg"
            >
              <Mail className="w-5 h-5 mr-2" />
              Learn More
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      <BackToTop />
    </div>
  );
};

export default VIPService;