
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Calculator, Ship, Plane, Shield, FileText, Search } from 'lucide-react';
import { useAddQuote } from '@/hooks/useQuotes';
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';

const EnhancedPriceCalculator = () => {
  const addQuote = useAddQuote();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    vehicle_type: '',
    vehicle_value: 0,
    from_country: 'canada',
    to_country: '',
    shipping_method: 'maritime',
    insurance_included: true,
    expedited_service: false,
  });

  const [quote, setQuote] = useState<any>(null);

  const calculateQuote = () => {
    const baseShippingCost = formData.shipping_method === 'air' ? 8000 : 3500;
    const shippingCost = formData.vehicle_value > 50000 ? baseShippingCost * 1.2 : baseShippingCost;
    
    const customsDuties = formData.vehicle_value * 0.065; // 6.5% average
    const insuranceCost = formData.insurance_included ? formData.vehicle_value * 0.015 : 0; // 1.5%
    const documentationFee = 850;
    const inspectionCost = 450;
    const expeditedFee = formData.expedited_service ? 1200 : 0;
    
    const totalCost = shippingCost + customsDuties + insuranceCost + documentationFee + inspectionCost + expeditedFee;
    
    const estimatedTimeline = formData.shipping_method === 'air' ? 
      (formData.expedited_service ? '3-5 days' : '5-10 days') :
      (formData.expedited_service ? '2-3 weeks' : '4-6 weeks');

    const calculatedQuote = {
      ...formData,
      shipping_cost: shippingCost,
      customs_duties: customsDuties,
      insurance_cost: insuranceCost,
      documentation_fee: documentationFee,
      inspection_cost: inspectionCost,
      total_cost: totalCost,
      estimated_timeline: estimatedTimeline,
      currency: 'USD',
      status: 'draft'
    };

    setQuote(calculatedQuote);
  };

  const saveQuote = async () => {
    if (!quote) return;
    
    try {
      // Save quote to database
      await addQuote.mutateAsync(quote);
      
      // Also create a lead record for follow-up
      const leadData = {
        first_name: formData.customer_name.split(' ')[0] || '',
        last_name: formData.customer_name.split(' ').slice(1).join(' ') || '',
        email: formData.customer_email,
        vehicle_interest: formData.vehicle_type,
        budget_range: `$${formData.vehicle_value.toLocaleString()}`,
        interest_type: 'Vehicle Export',
        source: 'Price Calculator',
        status: 'new',
        notes: `Interested in shipping ${formData.vehicle_type} from ${formData.from_country} to ${formData.to_country}. Vehicle value: $${formData.vehicle_value.toLocaleString()}`,
      };
      
      // Save lead (don't wait for it to block the user experience)
      try {
        const { data: leadInsert, error: leadError } = await supabase
          .from('leads')
          .insert([leadData]);
        
        if (leadError) {
          console.error('Error saving lead:', leadError);
        }
      } catch (leadErr) {
        console.error('Lead save error:', leadErr);
      }
      
      toast({ title: "Quote saved successfully!" });
      
      // Send WhatsApp message with quote
      const message = `Hello! Here's your shipping quote:

Vehicle: ${quote.vehicle_type}
From: ${quote.from_country.toUpperCase()} → To: ${quote.to_country.toUpperCase()}
Method: ${quote.shipping_method === 'air' ? 'Air Freight' : 'Maritime'}

COST BREAKDOWN:
• Shipping: $${quote.shipping_cost.toLocaleString()}
• Customs/Duties: $${quote.customs_duties.toLocaleString()}
• Insurance: $${quote.insurance_cost.toLocaleString()}
• Documentation: $${quote.documentation_fee.toLocaleString()}
• Inspection: $${quote.inspection_cost.toLocaleString()}
${quote.expedited_service ? `• Expedited Service: $1,200` : ''}

TOTAL: $${quote.total_cost.toLocaleString()}
Timeline: ${quote.estimated_timeline}

Would you like to proceed with this quote?`;

      const whatsappUrl = `https://wa.me/15185077243?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
      
    } catch (error) {
      toast({ 
        title: "Error", 
        description: "Failed to save quote. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-6 h-6" />
            Enhanced Shipping Quote Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="customer_name">Your Name</Label>
              <Input
                id="customer_name"
                value={formData.customer_name}
                onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                placeholder="Enter your full name"
              />
            </div>
            
            <div>
              <Label htmlFor="customer_email">Email Address</Label>
              <Input
                id="customer_email"
                type="email"
                value={formData.customer_email}
                onChange={(e) => setFormData({ ...formData, customer_email: e.target.value })}
                placeholder="your@email.com"
              />
            </div>
            
            <div>
              <Label htmlFor="vehicle_type">Vehicle Type</Label>
              <Input
                id="vehicle_type"
                value={formData.vehicle_type}
                onChange={(e) => setFormData({ ...formData, vehicle_type: e.target.value })}
                placeholder="e.g., 2024 BMW X5"
              />
            </div>
            
            <div>
              <Label htmlFor="vehicle_value">Vehicle Value (USD)</Label>
              <Input
                id="vehicle_value"
                type="number"
                value={formData.vehicle_value}
                onChange={(e) => setFormData({ ...formData, vehicle_value: parseFloat(e.target.value) || 0 })}
                placeholder="50000"
              />
            </div>
            
            <div>
              <Label htmlFor="to_country">Destination Country</Label>
              <Select value={formData.to_country} onValueChange={(value) => setFormData({ ...formData, to_country: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select destination" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nigeria">Nigeria</SelectItem>
                  <SelectItem value="ghana">Ghana</SelectItem>
                  <SelectItem value="senegal">Senegal</SelectItem>
                  <SelectItem value="cameroon">Cameroon</SelectItem>
                  <SelectItem value="ivory_coast">Ivory Coast</SelectItem>
                  <SelectItem value="benin">Benin</SelectItem>
                  <SelectItem value="togo">Togo</SelectItem>
                  <SelectItem value="usa">United States</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="germany">Germany</SelectItem>
                  <SelectItem value="france">France</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="shipping_method">Shipping Method</Label>
              <Select value={formData.shipping_method} onValueChange={(value) => setFormData({ ...formData, shipping_method: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="maritime">
                    <div className="flex items-center gap-2">
                      <Ship className="w-4 h-4" />
                      Maritime (4-6 weeks)
                    </div>
                  </SelectItem>
                  <SelectItem value="air">
                    <div className="flex items-center gap-2">
                      <Plane className="w-4 h-4" />
                      Air Freight (5-10 days)
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="insurance"
                checked={formData.insurance_included}
                onCheckedChange={(checked) => setFormData({ ...formData, insurance_included: checked as boolean })}
              />
              <Label htmlFor="insurance" className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Include Insurance Coverage (1.5% of vehicle value)
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="expedited"
                checked={formData.expedited_service}
                onCheckedChange={(checked) => setFormData({ ...formData, expedited_service: checked as boolean })}
              />
              <Label htmlFor="expedited" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Expedited Service (+$1,200)
              </Label>
            </div>
          </div>
          
          <Button onClick={calculateQuote} className="w-full" size="lg">
            <Search className="w-4 h-4 mr-2" />
            Calculate Quote
          </Button>
          
          {quote && (
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-800">Shipping Quote Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Shipping Cost</p>
                    <p className="font-semibold">${quote.shipping_cost.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Customs & Duties</p>
                    <p className="font-semibold">${quote.customs_duties.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Insurance</p>
                    <p className="font-semibold">${quote.insurance_cost.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Documentation</p>
                    <p className="font-semibold">${quote.documentation_fee.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Inspection</p>
                    <p className="font-semibold">${quote.inspection_cost.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Timeline</p>
                    <p className="font-semibold">{quote.estimated_timeline}</p>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <p className="text-lg font-bold">Total Cost:</p>
                    <p className="text-2xl font-bold text-blue-600">${quote.total_cost.toLocaleString()}</p>
                  </div>
                </div>
                
                <Button onClick={saveQuote} className="w-full" size="lg" disabled={addQuote.isPending}>
                  Save Quote & Contact via WhatsApp
                </Button>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedPriceCalculator;
