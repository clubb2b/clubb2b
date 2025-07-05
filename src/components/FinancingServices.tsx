import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, CreditCard, Shield, Calculator } from "lucide-react";

const FinancingServices = () => {
  const handleFinancingInquiry = () => {
    const message = "I'm interested in financing options for a vehicle purchase. Please provide more information.";
    const whatsappUrl = `https://wa.me/14389257679?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleInsuranceInquiry = () => {
    const message = "I need insurance information for my vehicle. Please help me with coverage options.";
    const whatsappUrl = `https://wa.me/14389257679?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const financingOptions = [
    {
      title: "Traditional Auto Loans",
      features: ["Competitive rates from 4.5% APR", "Terms up to 96 months", "Pre-approval available", "No prepayment penalties"],
      icon: <DollarSign className="w-6 h-6" />
    },
    {
      title: "Lease Programs",
      features: ["Lower monthly payments", "Latest model access", "Flexible end-of-lease options", "Gap insurance included"],
      icon: <CreditCard className="w-6 h-6" />
    },
    {
      title: "Extended Warranties",
      features: ["Comprehensive coverage", "Roadside assistance 24/7", "Transferable warranty", "Deductible options"],
      icon: <Shield className="w-6 h-6" />
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-light mb-6 text-white tracking-wider">
            FINANCING & INSURANCE
          </h2>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-white to-transparent mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 font-light">
            Canadian financing programs and comprehensive insurance solutions
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {financingOptions.map((option, index) => (
            <Card key={index} className="bg-gradient-to-b from-gray-800 to-gray-900 border border-gray-700 hover:border-white transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-center w-12 h-12 bg-white rounded-full mb-4 mx-auto">
                  <div className="text-black">{option.icon}</div>
                </div>
                
                <h3 className="text-xl font-light text-white mb-4 text-center tracking-wide">
                  {option.title}
                </h3>
                
                <div className="space-y-2">
                  {option.features.map((feature, i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <div className="w-1 h-1 bg-white rounded-full flex-shrink-0"></div>
                      <p className="text-gray-300 font-light text-sm">{feature}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg border border-gray-700 p-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-light text-white mb-4 tracking-wide">
                GET PRE-APPROVED TODAY
              </h3>
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3">
                  <Calculator className="w-5 h-5 text-white" />
                  <p className="text-gray-300">Quick online application</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-white" />
                  <p className="text-gray-300">Secure and confidential</p>
                </div>
                <div className="flex items-center space-x-3">
                  <DollarSign className="w-5 h-5 text-white" />
                  <p className="text-gray-300">Competitive Canadian rates</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <Button 
                onClick={handleFinancingInquiry}
                className="w-full bg-white text-black hover:bg-gray-200 px-6 py-3 font-light tracking-wider transition-all duration-300"
              >
                GET FINANCING QUOTE
              </Button>
              <Button 
                onClick={handleInsuranceInquiry}
                className="w-full bg-transparent border border-white text-white hover:bg-white hover:text-black px-6 py-3 font-light tracking-wider transition-all duration-300"
              >
                INSURANCE QUOTE
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinancingServices;