
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calculator, Ship, Plane, Truck, X } from 'lucide-react';

interface PriceCalculatorProps {
  isOpen: boolean;
  onClose: () => void;
}

const PriceCalculator: React.FC<PriceCalculatorProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    vehicleType: '',
    vehicleValue: '',
    fromCountry: 'canada',
    toCountry: '',
    shippingMethod: 'maritime',
    insurance: true,
    expedited: false
  });

  const [estimate, setEstimate] = useState<any>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    });
  };

  const calculateEstimate = () => {
    const baseRates = {
      maritime: {
        'africa': 2500,
        'europe': 1800,
        'asia': 3200,
        'south-america': 2800,
        'middle-east': 2200
      },
      air: {
        'africa': 8500,
        'europe': 6500,
        'asia': 9500,
        'south-america': 8000,
        'middle-east': 7500
      }
    };

    const vehicleMultipliers = {
      'sedan': 1.0,
      'suv': 1.3,
      'luxury': 1.5,
      'sports': 1.4,
      'truck': 1.6
    };

    const baseRate = baseRates[formData.shippingMethod as keyof typeof baseRates][formData.toCountry as keyof typeof baseRates.maritime] || 2000;
    const vehicleMultiplier = vehicleMultipliers[formData.vehicleType as keyof typeof vehicleMultipliers] || 1.0;
    const vehicleValue = parseFloat(formData.vehicleValue) || 0;

    let shippingCost = baseRate * vehicleMultiplier;
    let customsDuties = vehicleValue * 0.12; // 12% average
    let insurance = formData.insurance ? vehicleValue * 0.015 : 0; // 1.5%
    let documentation = 850;
    let inspectionCost = 450;

    if (formData.expedited) {
      shippingCost *= 1.4;
    }

    const total = shippingCost + customsDuties + insurance + documentation + inspectionCost;

    setEstimate({
      shippingCost,
      customsDuties,
      insurance,
      documentation,
      inspectionCost,
      total,
      timeline: formData.shippingMethod === 'maritime' ? 
        (formData.expedited ? '14-21 days' : '21-35 days') : 
        (formData.expedited ? '3-5 days' : '7-10 days')
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-3">
              <Calculator className="w-6 h-6 text-black" />
              <h2 className="text-2xl font-light text-black">Export Cost Calculator</h2>
            </div>
            <Button onClick={onClose} variant="ghost" className="text-black hover:bg-gray-100">
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Calculator Form */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Type</label>
                <select
                  name="vehicleType"
                  value={formData.vehicleType}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:border-black focus:outline-none"
                  required
                >
                  <option value="">Select Vehicle Type</option>
                  <option value="sedan">Sedan</option>
                  <option value="suv">SUV</option>
                  <option value="luxury">Luxury Car</option>
                  <option value="sports">Sports Car</option>
                  <option value="truck">Truck/Pickup</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Value (USD)</label>
                <Input
                  name="vehicleValue"
                  type="number"
                  placeholder="e.g., 50000"
                  value={formData.vehicleValue}
                  onChange={handleInputChange}
                  className="border-gray-300"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Destination Country</label>
                <select
                  name="toCountry"
                  value={formData.toCountry}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:border-black focus:outline-none"
                  required
                >
                  <option value="">Select Destination</option>
                  <option value="africa">Africa (Various Countries)</option>
                  <option value="europe">Europe</option>
                  <option value="asia">Asia</option>
                  <option value="south-america">South America</option>
                  <option value="middle-east">Middle East</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Shipping Method</label>
                <div className="grid grid-cols-2 gap-3">
                  <label className="flex items-center space-x-2 cursor-pointer p-3 border rounded-lg hover:bg-gray-50">
                    <input
                      type="radio"
                      name="shippingMethod"
                      value="maritime"
                      checked={formData.shippingMethod === 'maritime'}
                      onChange={handleInputChange}
                    />
                    <Ship className="w-4 h-4" />
                    <span className="text-sm">Maritime (Economical)</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer p-3 border rounded-lg hover:bg-gray-50">
                    <input
                      type="radio"
                      name="shippingMethod"
                      value="air"
                      checked={formData.shippingMethod === 'air'}
                      onChange={handleInputChange}
                    />
                    <Plane className="w-4 h-4" />
                    <span className="text-sm">Air Freight (Fast)</span>
                  </label>
                </div>
              </div>

              <div className="space-y-3">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="insurance"
                    checked={formData.insurance}
                    onChange={handleInputChange}
                    className="text-black"
                  />
                  <span className="text-sm">Include Insurance (Recommended)</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="expedited"
                    checked={formData.expedited}
                    onChange={handleInputChange}
                    className="text-black"
                  />
                  <span className="text-sm">Expedited Service (+40% faster)</span>
                </label>
              </div>

              <Button
                onClick={calculateEstimate}
                className="w-full bg-black text-white hover:bg-gray-800 py-3"
                disabled={!formData.vehicleType || !formData.vehicleValue || !formData.toCountry}
              >
                Calculate Estimate
              </Button>
            </div>

            {/* Results */}
            <div className="bg-gray-50 p-6 rounded-lg">
              {estimate ? (
                <div className="space-y-4">
                  <h3 className="text-xl font-medium text-black mb-4">Cost Breakdown</h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-600">Shipping Cost</span>
                      <span className="font-medium">${estimate.shippingCost.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-600">Customs Duties</span>
                      <span className="font-medium">${estimate.customsDuties.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-600">Insurance</span>
                      <span className="font-medium">${estimate.insurance.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-600">Documentation</span>
                      <span className="font-medium">${estimate.documentation.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-600">Inspection</span>
                      <span className="font-medium">${estimate.inspectionCost.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-t-2 border-black">
                      <span className="text-lg font-semibold">Total Estimate</span>
                      <span className="text-lg font-bold">${estimate.total.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Truck className="w-4 h-4" />
                      <span className="font-medium">Estimated Timeline</span>
                    </div>
                    <p className="text-gray-600">{estimate.timeline}</p>
                  </div>

                  <div className="text-xs text-gray-500 mt-4">
                    <p>* This is an estimate. Final costs may vary based on specific requirements, regulations, and current market conditions.</p>
                  </div>

                  <Button 
                    onClick={() => {
                      const message = `I would like a detailed quote for vehicle export. Here are my requirements:

Vehicle Type: ${formData.vehicleType}
Vehicle Value: $${formData.vehicleValue}
From: Canada
To: ${formData.toCountry}
Shipping Method: ${formData.shippingMethod}
Insurance: ${formData.insurance ? 'Yes' : 'No'}
Expedited: ${formData.expedited ? 'Yes' : 'No'}

Estimated Total: $${estimate.total.toLocaleString()}

Please provide a detailed quote with exact pricing and timeline.`;
                      const whatsappUrl = `https://wa.me/15185077243?text=${encodeURIComponent(message)}`;
                      window.open(whatsappUrl, '_blank');
                    }}
                    className="w-full bg-green-600 text-white hover:bg-green-700"
                  >
                    Get Detailed Quote via WhatsApp
                  </Button>
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  <Calculator className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>Fill in the details to calculate your export costs</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceCalculator;
