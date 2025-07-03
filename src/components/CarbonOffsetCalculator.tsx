import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Leaf, Globe, Calculator, TreePine, Recycle, Award } from "lucide-react";
import { toast } from "sonner";

interface CarbonData {
  shipping: number;
  manufacturing: number;
  operation: number;
  total: number;
}

const CarbonOffsetCalculator = () => {
  const [vehicleType, setVehicleType] = useState<string>('luxury_sedan');
  const [fromCountry, setFromCountry] = useState<string>('CA');
  const [toCountry, setToCountry] = useState<string>('NG');
  const [shippingMethod, setShippingMethod] = useState<string>('ocean');
  const [distance, setDistance] = useState<number>(0);
  const [carbonData, setCarbonData] = useState<CarbonData>({ shipping: 0, manufacturing: 0, operation: 0, total: 0 });
  const [offsetCost, setOffsetCost] = useState<number>(0);

  const vehicleTypes = [
    { value: 'luxury_sedan', label: 'Luxury Sedan', co2Factor: 2.8 },
    { value: 'sports_car', label: 'Sports Car', co2Factor: 4.2 },
    { value: 'suv', label: 'Luxury SUV', co2Factor: 3.5 },
    { value: 'electric', label: 'Electric Vehicle', co2Factor: 1.2 },
    { value: 'hybrid', label: 'Hybrid Vehicle', co2Factor: 2.1 },
    { value: 'supercar', label: 'Supercar', co2Factor: 5.8 }
  ];

  const countries = [
    { code: 'CA', name: 'Canada', distance: 0 },
    { code: 'US', name: 'United States', distance: 800 },
    { code: 'NG', name: 'Nigeria', distance: 8900 },
    { code: 'GH', name: 'Ghana', distance: 8600 },
    { code: 'KE', name: 'Kenya', distance: 12100 },
    { code: 'ZA', name: 'South Africa', distance: 12800 },
    { code: 'GB', name: 'United Kingdom', distance: 5500 },
    { code: 'DE', name: 'Germany', distance: 6200 },
    { code: 'FR', name: 'France', distance: 5800 },
    { code: 'AE', name: 'UAE', distance: 11200 },
    { code: 'AU', name: 'Australia', distance: 17100 },
    { code: 'JP', name: 'Japan', distance: 10300 }
  ];

  const shippingMethods = [
    { value: 'ocean', label: 'Ocean Freight', co2PerKm: 0.015, days: '20-45' },
    { value: 'air', label: 'Air Freight', co2PerKm: 0.8, days: '3-7' },
    { value: 'road', label: 'Road Transport', co2PerKm: 0.12, days: '5-15' },
    { value: 'rail', label: 'Rail Transport', co2PerKm: 0.04, days: '10-25' }
  ];

  const offsetProjects = [
    {
      name: 'Reforestation Project',
      location: 'Amazon Rainforest',
      price: 25,
      icon: <TreePine className="w-5 h-5" />,
      description: 'Plant trees in deforested areas'
    },
    {
      name: 'Renewable Energy',
      location: 'Solar Farms',
      price: 30,
      icon: <Globe className="w-5 h-5" />,
      description: 'Support clean energy projects'
    },
    {
      name: 'Ocean Cleanup',
      location: 'Pacific Ocean',
      price: 35,
      icon: <Recycle className="w-5 h-5" />,
      description: 'Remove plastic from oceans'
    }
  ];

  useEffect(() => {
    calculateCarbon();
  }, [vehicleType, fromCountry, toCountry, shippingMethod]);

  const calculateCarbon = () => {
    const fromCountryData = countries.find(c => c.code === fromCountry);
    const toCountryData = countries.find(c => c.code === toCountry);
    const vehicleData = vehicleTypes.find(v => v.value === vehicleType);
    const shippingData = shippingMethods.find(s => s.value === shippingMethod);

    if (!fromCountryData || !toCountryData || !vehicleData || !shippingData) return;

    const calculatedDistance = Math.abs(toCountryData.distance - fromCountryData.distance);
    setDistance(calculatedDistance);

    // Calculate carbon emissions (in tons CO2)
    const shippingEmissions = calculatedDistance * shippingData.co2PerKm;
    const manufacturingEmissions = vehicleData.co2Factor * 2; // Base manufacturing footprint
    const operationEmissions = vehicleData.co2Factor * 0.5; // First year operation estimate

    const total = shippingEmissions + manufacturingEmissions + operationEmissions;

    setCarbonData({
      shipping: shippingEmissions,
      manufacturing: manufacturingEmissions,
      operation: operationEmissions,
      total: total
    });

    // Calculate offset cost (average $25-35 per ton)
    setOffsetCost(total * 30);
  };

  const purchaseOffset = (project: any) => {
    const message = `I want to purchase carbon offsets for ${carbonData.total.toFixed(2)} tons CO2 through ${project.name}. Total cost: $${offsetCost.toFixed(2)}`;
    const whatsappUrl = `https://wa.me/15185077243?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    toast.success(`Carbon offset purchase initiated for ${project.name}!`);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-light text-white mb-4 tracking-wider">
          CARBON OFFSET CALCULATOR
        </h1>
        <p className="text-gray-300 text-lg">
          Calculate and offset your vehicle's environmental impact
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Calculator */}
        <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="w-5 h-5" />
              Carbon Footprint Calculator
            </CardTitle>
            <CardDescription className="text-gray-400">
              Calculate emissions from manufacturing, shipping, and operation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Vehicle Type */}
            <div className="space-y-2">
              <Label>Vehicle Type</Label>
              <Select value={vehicleType} onValueChange={setVehicleType}>
                <SelectTrigger className="bg-gray-700 border-gray-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  {vehicleTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* From Country */}
            <div className="space-y-2">
              <Label>From</Label>
              <Select value={fromCountry} onValueChange={setFromCountry}>
                <SelectTrigger className="bg-gray-700 border-gray-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  {countries.map((country) => (
                    <SelectItem key={country.code} value={country.code}>
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* To Country */}
            <div className="space-y-2">
              <Label>To</Label>
              <Select value={toCountry} onValueChange={setToCountry}>
                <SelectTrigger className="bg-gray-700 border-gray-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  {countries.map((country) => (
                    <SelectItem key={country.code} value={country.code}>
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Shipping Method */}
            <div className="space-y-2">
              <Label>Shipping Method</Label>
              <Select value={shippingMethod} onValueChange={setShippingMethod}>
                <SelectTrigger className="bg-gray-700 border-gray-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  {shippingMethods.map((method) => (
                    <SelectItem key={method.value} value={method.value}>
                      <div className="flex justify-between items-center w-full">
                        <span>{method.label}</span>
                        <span className="text-xs text-gray-400">{method.days} days</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Results */}
            <div className="bg-gray-700/50 rounded-lg p-4 space-y-3">
              <h4 className="font-medium">Carbon Footprint Breakdown</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Distance:</span>
                  <span>{distance.toLocaleString()} km</span>
                </div>
                <div className="flex justify-between">
                  <span>Manufacturing:</span>
                  <span>{carbonData.manufacturing.toFixed(2)} tons CO2</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>{carbonData.shipping.toFixed(2)} tons CO2</span>
                </div>
                <div className="flex justify-between">
                  <span>First Year Operation:</span>
                  <span>{carbonData.operation.toFixed(2)} tons CO2</span>
                </div>
                <div className="border-t border-gray-600 pt-2">
                  <div className="flex justify-between font-bold">
                    <span>Total Impact:</span>
                    <span className="text-red-400">{carbonData.total.toFixed(2)} tons CO2</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Offset Options */}
        <Card className="bg-gradient-to-br from-green-900 to-green-800 border-green-600 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Leaf className="w-5 h-5" />
              Carbon Offset Solutions
            </CardTitle>
            <CardDescription className="text-green-200">
              Neutralize your environmental impact
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-green-800/50 rounded-lg p-4 text-center">
              <h3 className="text-2xl font-bold">${offsetCost.toFixed(2)}</h3>
              <p className="text-green-200">To offset {carbonData.total.toFixed(2)} tons CO2</p>
            </div>

            <div className="space-y-3">
              {offsetProjects.map((project, index) => (
                <Card key={index} className="bg-green-800/30 border-green-500">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="text-green-400">{project.icon}</div>
                      <div className="flex-1">
                        <h4 className="font-medium">{project.name}</h4>
                        <p className="text-sm text-green-200">{project.location}</p>
                        <p className="text-xs text-green-300 mt-1">{project.description}</p>
                        <div className="flex justify-between items-center mt-3">
                          <Badge variant="outline" className="text-green-400 border-green-400">
                            ${project.price}/ton
                          </Badge>
                          <Button
                            size="sm"
                            onClick={() => purchaseOffset(project)}
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            Select
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="bg-green-800/30 rounded-lg p-4">
              <h4 className="font-medium flex items-center gap-2 mb-2">
                <Award className="w-4 h-4" />
                Carbon Neutral Benefits
              </h4>
              <div className="text-sm space-y-1 text-green-200">
                <div>✓ Verified carbon credits</div>
                <div>✓ Digital certificate</div>
                <div>✓ Tax deductible</div>
                <div>✓ Impact tracking</div>
                <div>✓ Annual reporting</div>
              </div>
            </div>

            <Button 
              className="w-full bg-white text-green-800 hover:bg-green-50"
              size="lg"
            >
              <Leaf className="w-5 h-5 mr-2" />
              Make This Purchase Carbon Neutral
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Environmental Impact */}
      <Card className="bg-gradient-to-br from-blue-900 to-blue-800 border-blue-600 text-white">
        <CardHeader>
          <CardTitle>Environmental Impact Visualization</CardTitle>
          <CardDescription className="text-blue-200">
            Understanding your carbon footprint
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-400">{carbonData.total.toFixed(1)}</div>
              <div className="text-sm text-blue-200">Tons CO2 Equivalent</div>
              <div className="text-xs text-blue-300 mt-1">
                = {Math.round(carbonData.total * 2200)} lbs CO2
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">{Math.round(carbonData.total * 40)}</div>
              <div className="text-sm text-blue-200">Trees Needed</div>
              <div className="text-xs text-blue-300 mt-1">
                To absorb this CO2 over 20 years
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">{Math.round(carbonData.total * 1100)}</div>
              <div className="text-sm text-blue-200">Miles Driven</div>
              <div className="text-xs text-blue-300 mt-1">
                Equivalent to avg car emissions
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CarbonOffsetCalculator;