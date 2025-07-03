
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, MapPin, DollarSign } from 'lucide-react';
import PaymentButton from './PaymentButton';

const PriceCalculator = () => {
  const [formData, setFormData] = useState({
    vehicleValue: '',
    fromCountry: 'canada',
    toCountry: '',
    shippingMethod: 'maritime'
  });

  const [quote, setQuote] = useState<any>(null);

  const calculateQuote = () => {
    const vehicleValue = parseFloat(formData.vehicleValue) || 0;
    const baseShippingCost = formData.shippingMethod === 'air' ? 8000 : 3500;
    const shippingCost = vehicleValue > 50000 ? baseShippingCost * 1.2 : baseShippingCost;
    const customsDuties = vehicleValue * 0.065;
    const insuranceCost = vehicleValue * 0.015;
    const documentationFee = 850;
    const inspectionCost = 450;
    const totalCost = shippingCost + customsDuties + insuranceCost + documentationFee + inspectionCost;

    setQuote({
      shippingCost,
      customsDuties,
      insuranceCost,
      documentationFee,
      inspectionCost,
      totalCost,
      timeline: formData.shippingMethod === 'air' ? '5-10 days' : '4-6 weeks'
    });
  };

  const handleGetQuote = () => {
    const message = `Hello! I'd like to get a detailed shipping quote:

Vehicle Value: $${formData.vehicleValue}
From: ${formData.fromCountry.toUpperCase()} 
To: ${formData.toCountry.toUpperCase()}
Shipping Method: ${formData.shippingMethod === 'air' ? 'Air Freight' : 'Maritime'}

${quote ? `
Estimated Costs:
• Shipping: $${quote.shippingCost.toLocaleString()}
• Customs/Duties: $${quote.customsDuties.toLocaleString()}
• Insurance: $${quote.insuranceCost.toLocaleString()}
• Documentation: $${quote.documentationFee.toLocaleString()}
• Inspection: $${quote.inspectionCost.toLocaleString()}

TOTAL: $${quote.totalCost.toLocaleString()}
Timeline: ${quote.timeline}

Please confirm this quote and provide any additional details.` : 'Please provide a detailed quote for these specifications.'}`;

    const whatsappUrl = `https://wa.me/15185077243?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="price-calculator" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Shipping Cost Calculator</h2>
          <p className="text-xl text-gray-600">Get an instant estimate for your vehicle export</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-6 h-6" />
                Calculate Your Shipping Costs
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="vehicleValue">Vehicle Value (USD)</Label>
                  <Input
                    id="vehicleValue"
                    type="number"
                    placeholder="50000"
                    value={formData.vehicleValue}
                    onChange={(e) => setFormData({ ...formData, vehicleValue: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="toCountry">Destination Country</Label>
                  <Select value={formData.toCountry} onValueChange={(value) => setFormData({ ...formData, toCountry: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select destination" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nigeria">🇳🇬 Nigeria</SelectItem>
                      <SelectItem value="ghana">🇬🇭 Ghana</SelectItem>
                      <SelectItem value="senegal">🇸🇳 Senegal</SelectItem>
                      <SelectItem value="cameroon">🇨🇲 Cameroon</SelectItem>
                      <SelectItem value="ivory_coast">🇨🇮 Ivory Coast</SelectItem>
                      <SelectItem value="benin">🇧🇯 Benin</SelectItem>
                      <SelectItem value="usa">🇺🇸 United States</SelectItem>
                      <SelectItem value="uk">🇬🇧 United Kingdom</SelectItem>
                      <SelectItem value="other">🌍 Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="fromCountry">From Country</Label>
                  <Select value={formData.fromCountry} onValueChange={(value) => setFormData({ ...formData, fromCountry: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="canada">🇨🇦 Canada</SelectItem>
                      <SelectItem value="usa">🇺🇸 United States</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="shippingMethod">Shipping Method</Label>
                  <Select value={formData.shippingMethod} onValueChange={(value) => setFormData({ ...formData, shippingMethod: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="maritime">🚢 Maritime (4-6 weeks)</SelectItem>
                      <SelectItem value="air">✈️ Air Freight (5-10 days)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button onClick={calculateQuote} className="w-full" size="lg">
                <DollarSign className="w-4 h-4 mr-2" />
                Calculate Shipping Cost
              </Button>

              {quote && (
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-6 space-y-4">
                    <h3 className="text-xl font-bold text-blue-800">Estimated Shipping Costs</h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Shipping Cost:</span>
                          <span className="font-semibold">${quote.shippingCost.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Customs & Duties:</span>
                          <span className="font-semibold">${quote.customsDuties.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Insurance:</span>
                          <span className="font-semibold">${quote.insuranceCost.toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Documentation:</span>
                          <span className="font-semibold">${quote.documentationFee.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Inspection:</span>
                          <span className="font-semibold">${quote.inspectionCost.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Timeline:</span>
                          <span className="font-semibold">{quote.timeline}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center text-xl font-bold">
                        <span>Total Estimated Cost:</span>
                        <span className="text-blue-600">${quote.totalCost.toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button onClick={handleGetQuote} className="flex-1" size="lg">
                        <MapPin className="w-4 h-4 mr-2" />
                        Get Detailed Quote
                      </Button>
                      
                      <PaymentButton
                        amount={Math.round(quote.totalCost * 0.1)} // 10% deposit
                        currency="USD"
                        itemDescription="Shipping Service Deposit"
                        className="flex-1"
                      >
                        Pay Deposit (10%)
                      </PaymentButton>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PriceCalculator;
