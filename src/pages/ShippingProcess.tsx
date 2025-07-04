import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import globalShippingImage from "@/assets/global-shipping-process.jpg";
import { 
  Ship, 
  Plane, 
  Truck, 
  Package, 
  FileText, 
  Shield, 
  MapPin, 
  Clock,
  DollarSign,
  Anchor,
  Globe,
  CheckCircle,
  AlertCircle,
  Phone
} from 'lucide-react';
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import CombinedFreightServices from "@/components/CombinedFreightServices";

const ShippingProcess = () => {
  const [selectedMethod, setSelectedMethod] = useState('maritime');

  const shippingMethods = [
    {
      id: 'maritime',
      name: 'Maritime Shipping',
      icon: Ship,
      duration: '15-35 days',
      cost: 'Most Economical',
      description: 'Ocean freight for vehicles and large equipment',
      advantages: ['Lowest cost per unit', 'Handles oversized cargo', 'Environmentally friendly', 'High capacity'],
      process: [
        'Vehicle preparation and documentation',
        'Container loading at departure port',
        'Ocean transit to destination port',
        'Customs clearance and inspection',
        'Final delivery to destination'
      ],
      documents: ['Bill of Lading', 'Commercial Invoice', 'Export Declaration', 'Marine Insurance', 'Vehicle Title'],
      routes: [
        { from: 'Canada', to: 'West Africa', duration: '18-25 days' },
        { from: 'Canada', to: 'East Africa', duration: '25-35 days' },
        { from: 'Canada', to: 'Europe', duration: '15-20 days' },
        { from: 'Canada', to: 'Asia', duration: '20-30 days' }
      ]
    },
    {
      id: 'air',
      name: 'Air Freight',
      icon: Plane,
      duration: '3-7 days',
      cost: 'Premium Service',
      description: 'Fast air cargo for urgent shipments',
      advantages: ['Fastest delivery', 'Secure handling', 'Real-time tracking', 'Climate controlled'],
      process: [
        'Pre-flight documentation',
        'Cargo preparation and loading',
        'Air transit to destination',
        'Airport customs clearance',
        'Ground transport to final destination'
      ],
      documents: ['Air Waybill', 'Commercial Invoice', 'Export License', 'Insurance Certificate', 'Dangerous Goods Declaration'],
      routes: [
        { from: 'Canada', to: 'West Africa', duration: '1-2 days' },
        { from: 'Canada', to: 'East Africa', duration: '2-3 days' },
        { from: 'Canada', to: 'Europe', duration: '1 day' },
        { from: 'Canada', to: 'Asia', duration: '1-2 days' }
      ]
    },
    {
      id: 'land',
      name: 'Overland Transport',
      icon: Truck,
      duration: '5-15 days',
      cost: 'Regional Shipping',
      description: 'Road transport for North American destinations',
      advantages: ['Door-to-door service', 'Flexible scheduling', 'Cost-effective for nearby regions', 'Real-time GPS tracking'],
      process: [
        'Vehicle pickup and inspection',
        'Secure transport carrier loading',
        'Cross-border customs process',
        'Transit to destination city',
        'Final delivery and handover'
      ],
      documents: ['Transport Contract', 'Border Crossing Permit', 'Insurance Coverage', 'Vehicle Registration', 'Driver Documentation'],
      routes: [
        { from: 'Canada', to: 'USA', duration: '1-3 days' },
        { from: 'Canada', to: 'Mexico', duration: '5-8 days' },
        { from: 'USA', to: 'Canada', duration: '1-3 days' }
      ]
    }
  ];

  const selectedMethodData = shippingMethods.find(method => method.id === selectedMethod);

  const handleGetQuote = (method: string) => {
    const message = `I'm interested in ${method} shipping services. Please provide a detailed quote.`;
    const whatsappUrl = `https://wa.me/14389257679?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const trackingSteps = [
    { step: 1, title: 'Order Confirmed', description: 'Your shipping order has been received and confirmed', status: 'completed' },
    { step: 2, title: 'Documentation Prepared', description: 'All required export/import documents are prepared', status: 'completed' },
    { step: 3, title: 'Cargo Pickup', description: 'Vehicle collected from your location', status: 'completed' },
    { step: 4, title: 'In Transit', description: 'Your cargo is currently in transit', status: 'current' },
    { step: 5, title: 'Customs Clearance', description: 'Processing through destination customs', status: 'pending' },
    { step: 6, title: 'Final Delivery', description: 'Vehicle delivered to destination', status: 'pending' }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section with Shipping Process Image */}
      <section className="relative py-20 bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src={globalShippingImage} 
            alt="Global Shipping Process"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/30"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-light mb-6 tracking-wider">
            GLOBAL SHIPPING PROCESS
          </h1>
          <p className="text-xl text-gray-300 font-light mb-8">
            Maritime • Air • Overland Transport Solutions
          </p>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-white to-transparent mx-auto"></div>
        </div>
      </section>

      {/* Combined Freight Services */}
      <CombinedFreightServices />

      {/* Detailed Process */}
      {selectedMethodData && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-light mb-4 tracking-wider">
                {selectedMethodData.name.toUpperCase()} PROCESS
              </h2>
              <p className="text-gray-300">Detailed breakdown of the shipping process</p>
            </div>

            <Tabs defaultValue="process" className="space-y-8">
              <TabsList className="grid w-full grid-cols-4 bg-gray-900">
                <TabsTrigger value="process" className="text-white data-[state=active]:bg-white data-[state=active]:text-black">
                  Process
                </TabsTrigger>
                <TabsTrigger value="documents" className="text-white data-[state=active]:bg-white data-[state=active]:text-black">
                  Documents
                </TabsTrigger>
                <TabsTrigger value="routes" className="text-white data-[state=active]:bg-white data-[state=active]:text-black">
                  Routes
                </TabsTrigger>
                <TabsTrigger value="advantages" className="text-white data-[state=active]:bg-white data-[state=active]:text-black">
                  Advantages
                </TabsTrigger>
              </TabsList>

              <TabsContent value="process">
                <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
                  {selectedMethodData.process.map((step, index) => (
                    <Card key={index} className="bg-gradient-to-b from-gray-800 to-black border border-gray-700">
                      <CardContent className="p-6 text-center">
                        <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                          {index + 1}
                        </div>
                        <p className="text-white font-medium">{step}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="documents">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {selectedMethodData.documents.map((doc, index) => (
                    <Card key={index} className="bg-gradient-to-b from-gray-800 to-black border border-gray-700">
                      <CardContent className="p-6 flex items-center">
                        <FileText className="w-8 h-8 text-white mr-4" />
                        <div>
                          <p className="text-white font-medium">{doc}</p>
                          <p className="text-gray-400 text-sm">Required document</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="routes">
                <div className="grid md:grid-cols-2 gap-6">
                  {selectedMethodData.routes.map((route, index) => (
                    <Card key={index} className="bg-gradient-to-b from-gray-800 to-black border border-gray-700">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center">
                            <MapPin className="w-5 h-5 text-white mr-2" />
                            <span className="text-white font-medium">{route.from}</span>
                          </div>
                          <div className="text-gray-400">→</div>
                          <div className="flex items-center">
                            <MapPin className="w-5 h-5 text-white mr-2" />
                            <span className="text-white font-medium">{route.to}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-center">
                          <Clock className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="text-gray-300">{route.duration}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="advantages">
                <div className="grid md:grid-cols-2 gap-6">
                  {selectedMethodData.advantages.map((advantage, index) => (
                    <Card key={index} className="bg-gradient-to-b from-gray-800 to-black border border-gray-700">
                      <CardContent className="p-6 flex items-center">
                        <CheckCircle className="w-6 h-6 text-green-500 mr-4" />
                        <p className="text-white">{advantage}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      )}

      {/* Sample Tracking */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light mb-4 tracking-wider">REAL-TIME TRACKING</h2>
            <p className="text-gray-300">Track your shipment every step of the way</p>
          </div>

          <div className="space-y-4">
            {trackingSteps.map((step, index) => (
              <div key={step.step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-6 ${
                  step.status === 'completed' ? 'bg-green-500' :
                  step.status === 'current' ? 'bg-blue-500' :
                  'bg-gray-600'
                }`}>
                  {step.status === 'completed' ? (
                    <CheckCircle className="w-5 h-5 text-white" />
                  ) : step.status === 'current' ? (
                    <AlertCircle className="w-5 h-5 text-white" />
                  ) : (
                    <span className="text-white text-sm">{step.step}</span>
                  )}
                </div>
                
                <div className="flex-1">
                  <div className={`p-4 rounded-lg border ${
                    step.status === 'completed' ? 'bg-green-900/20 border-green-500' :
                    step.status === 'current' ? 'bg-blue-900/20 border-blue-500' :
                    'bg-gray-800 border-gray-700'
                  }`}>
                    <h3 className="text-white font-medium mb-1">{step.title}</h3>
                    <p className="text-gray-300 text-sm">{step.description}</p>
                  </div>
                </div>
                
                {index < trackingSteps.length - 1 && (
                  <div className={`w-px h-8 ml-4 ${
                    step.status === 'completed' ? 'bg-green-500' : 'bg-gray-600'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-light mb-6 tracking-wider">
            READY TO SHIP?
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Get a personalized quote for your shipping needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => handleGetQuote('Custom')}
              className="bg-white text-black hover:bg-gray-200 px-8 py-4 text-lg"
            >
              <Phone className="w-5 h-5 mr-2" />
              Get Custom Quote
            </Button>
            <Button 
              onClick={() => {
                const subject = "Expert Shipping Consultation Request";
                const body = "Hello,\n\nI would like to schedule a consultation with a shipping expert to discuss my vehicle transportation needs.\n\nPlease contact me to arrange a meeting.\n\nThank you!";
                const mailtoUrl = `mailto:info@clubb2bperformance.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                window.location.href = mailtoUrl;
              }}
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg"
            >
              <Globe className="w-5 h-5 mr-2" />
              Contact Expert
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      <BackToTop />
    </div>
  );
};

export default ShippingProcess;