import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Car, 
  Calendar, 
  Gauge, 
  Fuel, 
  Palette, 
  MapPin, 
  DollarSign,
  Search,
  Filter,
  Heart,
  Share2,
  Eye,
  Phone,
  MessageSquare,
  Mail
} from 'lucide-react';
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { toast } from '@/hooks/use-toast';

const CarsCollection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMake, setSelectedMake] = useState('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [favorites, setFavorites] = useState<string[]>([]);

  // Real car data with accurate specifications and pricing
  const cars = [
    {
      id: '1',
      make: 'Land Rover',
      model: 'Range Rover Sport P530 HSE',
      year: 2025,
      price: 145000,
      currency: 'CAD',
      mileage: 0,
      fuelType: '4.4L V8 Twin-Turbo',
      transmission: '8-Speed Automatic',
      exteriorColor: 'Santorini Black',
      interiorColor: 'Ebony/Pimento',
      location: 'Toronto, Canada',
      condition: 'New',
      features: ['Terrain Response 2', 'Air Suspension', 'Meridian Signature Sound', 'Pivi Pro Infotainment', 'Adaptive LED Headlights', 'Configurable Ambient Lighting', 'Heated/Cooled Seats', 'Panoramic Roof'],
      description: 'New 2025 Range Rover Sport with 4.4L V8 producing 530hp. Ultimate luxury SUV with advanced off-road capabilities.',
      status: 'available'
    },
    {
      id: '2',
      make: 'Cadillac',
      model: 'Escalade Premium Luxury',
      year: 2024,
      price: 125000,
      currency: 'CAD',
      mileage: 5000,
      fuelType: '6.2L V8',
      transmission: '10-Speed Automatic',
      exteriorColor: 'Shadow Metallic',
      interiorColor: 'Whisper Beige',
      location: 'Vancouver, Canada',
      condition: 'Excellent',
      features: ['Magnetic Ride Control', 'Super Cruise', 'AKG Studio Audio', '38" Curved OLED Display', 'Night Vision', 'Head-Up Display', 'Wireless Charging', 'Hands-Free Liftgate'],
      description: 'Full-size luxury SUV with 6.2L V8 engine producing 420hp. Features cutting-edge technology and premium materials.',
      status: 'available'
    },
    {
      id: '3',
      make: 'BMW',
      model: 'M8 Competition Coupe',
      year: 2024,
      price: 195000,
      currency: 'CAD',
      mileage: 2500,
      fuelType: '4.4L V8 Twin-Turbo',
      transmission: '8-Speed M Steptronic',
      exteriorColor: 'Frozen Dark Grey',
      interiorColor: 'Silverstone/Black',
      location: 'Calgary, Canada',
      condition: 'Like New',
      features: ['M xDrive AWD', 'Carbon Fiber Roof', 'M Carbon Ceramic Brakes', 'Harman Kardon Audio', 'M Seats with Heating', 'Laser Headlights', 'M Competition Package', 'Track Mode'],
      description: 'High-performance coupe with 4.4L twin-turbo V8 producing 617hp. 0-100km/h in 3.2 seconds with M-specific enhancements.',
      status: 'available'
    },
    {
      id: '4',
      make: 'Mercedes-Benz',
      model: 'AMG GT 63 S 4MATIC+',
      year: 2024,
      price: 210000,
      currency: 'CAD',
      mileage: 1800,
      fuelType: '4.0L V8 Biturbo',
      transmission: '9G-DCT AMG SPEEDSHIFT',
      exteriorColor: 'AMG Solarbeam Yellow',
      interiorColor: 'Black Nappa Leather',
      location: 'Montreal, Canada',
      condition: 'Excellent',
      features: ['AMG Performance 4MATIC+', 'AMG Ride Control+', 'Burmester 3D Audio', 'AMG Track Pace', 'Dynamic Select', 'Carbon Fiber Trim', 'Performance Exhaust', 'Race Mode'],
      description: 'Ultimate performance 4-door coupe with 4.0L V8 biturbo producing 630hp. Racing DNA with everyday usability.',
      status: 'available'
    },
    {
      id: '5',
      make: 'Audi',
      model: 'Q8 55 TFSI Prestige',
      year: 2024,
      price: 98000,
      currency: 'CAD',
      mileage: 8500,
      fuelType: '3.0L TFSI V6',
      transmission: '8-Speed Tiptronic',
      exteriorColor: 'Glacier White',
      interiorColor: 'Black Valcona Leather',
      location: 'Ottawa, Canada',
      condition: 'Very Good',
      features: ['Quattro AWD', 'Adaptive Air Suspension', 'Bang & Olufsen 3D Audio', 'Virtual Cockpit Plus', 'Matrix LED Headlights', 'Massage Seats', 'Panoramic Sunroof', 'Driver Assistance Package'],
      description: 'Luxury SUV coupe with 3.0L TFSI V6 producing 335hp. Combines sportiness with sophisticated luxury.',
      status: 'available'
    },
    {
      id: '6',
      make: 'Porsche',
      model: 'Macan GTS',
      year: 2024,
      price: 115000,
      currency: 'CAD',
      mileage: 6200,
      fuelType: '2.9L V6 Twin-Turbo',
      transmission: '7-Speed PDK',
      exteriorColor: 'Carmine Red',
      interiorColor: 'Black Leather with Alcantara',
      location: 'Toronto, Canada',
      condition: 'Excellent',
      features: ['Porsche Traction Management', 'PASM Suspension', 'Sport Chrono Package', 'Bose Audio', 'LED Matrix Headlights', 'Sport Exhaust', 'Heated Seats', 'Apple CarPlay'],
      description: 'Compact luxury SUV with 2.9L twin-turbo V6 producing 380hp. Perfect blend of performance and practicality.',
      status: 'available'
    },
    {
      id: '7',
      make: 'Lexus',
      model: 'LX 600 Ultra Luxury',
      year: 2024,
      price: 140000,
      currency: 'CAD',
      mileage: 4200,
      fuelType: '3.5L V6 Twin-Turbo',
      transmission: '10-Speed Automatic',
      exteriorColor: 'Obsidian',
      interiorColor: 'Parchment Semi-Aniline',
      location: 'Vancouver, Canada',
      condition: 'Like New',
      features: ['Multi-Terrain Select', 'Adaptive Variable Suspension', 'Mark Levinson Audio', 'Climate Concierge', 'Rear Entertainment', 'Power Running Boards', 'Triple LED Headlights', 'Wireless Charging'],
      description: 'Full-size luxury SUV with 3.5L twin-turbo V6 producing 409hp. Ultimate in luxury and off-road capability.',
      status: 'available'
    },
    {
      id: '8',
      make: 'Genesis',
      model: 'GV80 3.5T Prestige',
      year: 2024,
      price: 85000,
      currency: 'CAD',
      mileage: 12000,
      fuelType: '3.5L V6 Twin-Turbo',
      transmission: '8-Speed Automatic',
      exteriorColor: 'Mallorca Blue',
      interiorColor: 'Nappa Leather Bourbon',
      location: 'Calgary, Canada',
      condition: 'Very Good',
      features: ['Genesis Adaptive Control Suspension', 'Lexicon Premium Audio', 'Genesis Connected Services', 'Remote Smart Parking Assist', 'Highway Driving Assist', 'Smart Cruise Control', 'Heated Steering Wheel', 'Ventilated Seats'],
      description: 'Luxury SUV with 3.5L twin-turbo V6 producing 375hp. Korean luxury with exceptional value and features.',
      status: 'available'
    },
    {
      id: '9',
      make: 'Chevrolet',
      model: 'Corvette Stingray 3LT',
      year: 2024,
      price: 95000,
      currency: 'CAD',
      mileage: 3500,
      fuelType: '6.2L V8',
      transmission: '8-Speed Dual-Clutch',
      exteriorColor: 'Torch Red',
      interiorColor: 'Jet Black GT2 Seats',
      location: 'Montreal, Canada',
      condition: 'Excellent',
      features: ['Magnetic Ride Control', 'Performance Exhaust', 'Bose Premium Audio', 'Performance Data Recorder', 'Head-Up Display', 'Wireless Charging', 'Carbon Flash Mirrors', 'Z51 Performance Package'],
      description: 'Mid-engine sports car with 6.2L V8 producing 495hp. American supercar performance at an accessible price.',
      status: 'available'
    },
    {
      id: '10',
      make: 'Toyota',
      model: 'Camry XSE V6',
      year: 2024,
      price: 42000,
      currency: 'CAD',
      mileage: 15000,
      fuelType: '3.5L V6',
      transmission: '8-Speed Automatic',
      exteriorColor: 'Wind Chill Pearl',
      interiorColor: 'Black SofTex',
      location: 'Toronto, Canada',
      condition: 'Good',
      features: ['Sport-Tuned Suspension', 'JBL Premium Audio', 'Toyota Safety Sense 2.0', 'Wireless Apple CarPlay', 'Qi Wireless Charging', 'Dual-Zone Climate Control', 'LED Headlights', 'Smart Key System'],
      description: 'Reliable midsize sedan with 3.5L V6 producing 301hp. Perfect balance of performance, comfort, and value.',
      status: 'available'
    }
  ];

  const makes = ['all', ...Array.from(new Set(cars.map(car => car.make)))];
  const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: '0-100000', label: 'Under $100K' },
    { value: '100000-200000', label: '$100K - $200K' },
    { value: '200000-500000', label: '$200K - $500K' },
    { value: '500000+', label: '$500K+' }
  ];

  const filteredCars = cars.filter(car => {
    const matchesSearch = car.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         car.model.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMake = selectedMake === 'all' || car.make === selectedMake;
    
    let matchesPrice = true;
    if (selectedPriceRange !== 'all') {
      const [min, max] = selectedPriceRange.split('-').map(p => p.replace('+', ''));
      if (max) {
        matchesPrice = car.price >= parseInt(min) && car.price <= parseInt(max);
      } else {
        matchesPrice = car.price >= parseInt(min);
      }
    }
    
    return matchesSearch && matchesMake && matchesPrice;
  });

  const toggleFavorite = (carId: string) => {
    setFavorites(prev => 
      prev.includes(carId) 
        ? prev.filter(id => id !== carId)
        : [...prev, carId]
    );
  };

  const handleContactDealer = (car: any) => {
    const message = `I'm interested in the ${car.year} ${car.make} ${car.model}. Please provide more information.`;
    const whatsappUrl = `https://wa.me/14389257679?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleEmailContact = (car: any) => {
    const subject = `Inquiry about ${car.year} ${car.make} ${car.model}`;
    const body = `Hello,\n\nI'm interested in the ${car.year} ${car.make} ${car.model} listed for ${car.currency} $${car.price.toLocaleString()}.\n\nPlease provide more information about:\n- Vehicle history\n- Inspection reports\n- Shipping options\n- Financing options\n\nThank you!`;
    const mailtoUrl = `mailto:info@clubb2bperformance.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  };

  const handleRequestQuote = (car: any) => {
    const message = `I would like a quote for the ${car.year} ${car.make} ${car.model} (${car.location}).`;
    const whatsappUrl = `https://wa.me/14389257679?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleShare = (car: any) => {
    if (navigator.share) {
      navigator.share({
        title: `${car.year} ${car.make} ${car.model}`,
        text: `Check out this ${car.year} ${car.make} ${car.model} for ${car.currency} $${car.price.toLocaleString()}`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied",
        description: "Car listing link copied to clipboard",
      });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-light mb-6 tracking-wider">
            LUXURY CAR COLLECTION
          </h1>
          <p className="text-xl text-gray-300 font-light mb-8">
            Premium vehicles from around the world
          </p>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-white to-transparent mx-auto"></div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-12 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search make or model..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-black border-gray-700 text-white"
              />
            </div>
            
            <Select value={selectedMake} onValueChange={setSelectedMake}>
              <SelectTrigger className="bg-black border-gray-700 text-white">
                <SelectValue placeholder="Select Make" />
              </SelectTrigger>
              <SelectContent className="bg-black border-gray-700">
                {makes.map((make) => (
                  <SelectItem key={make} value={make} className="text-white">
                    {make === 'all' ? 'All Makes' : make}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedPriceRange} onValueChange={setSelectedPriceRange}>
              <SelectTrigger className="bg-black border-gray-700 text-white">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent className="bg-black border-gray-700">
                {priceRanges.map((range) => (
                  <SelectItem key={range.value} value={range.value} className="text-white">
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex items-center gap-2">
              <Button
                onClick={() => setViewMode('grid')}
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
              >
                Grid
              </Button>
              <Button
                onClick={() => setViewMode('list')}
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
              >
                List
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between mb-8">
            <p className="text-gray-300">
              {filteredCars.length} vehicles found
            </p>
            <div className="flex items-center gap-2 text-gray-300">
              <Filter className="w-4 h-4" />
              <span>Filters applied</span>
            </div>
          </div>
        </div>
      </section>

      {/* Cars Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className={`grid gap-8 ${viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
            {filteredCars.map((car) => (
              <Card key={car.id} className="bg-gradient-to-b from-gray-900 to-black border border-gray-700 overflow-hidden hover:shadow-2xl transition-all duration-500 group">
                <div className="relative bg-gradient-to-b from-gray-800 to-gray-900 p-6 rounded-t-lg">
                  <div className="flex items-center justify-between mb-4">
                    <Badge className="bg-white text-black">
                      {car.condition}
                    </Badge>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => toggleFavorite(car.id)}
                        className="bg-black/70 hover:bg-black/90"
                      >
                        <Heart className={`w-4 h-4 ${favorites.includes(car.id) ? 'fill-red-500 text-red-500' : ''}`} />
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handleShare(car)}
                        className="bg-black/70 hover:bg-black/90"
                      >
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <Car className="w-16 h-16 mx-auto mb-4 text-white" />
                    <h3 className="text-2xl font-light text-white mb-2">
                      {car.year} {car.make} {car.model}
                    </h3>
                  </div>
                  
                  {car.status === 'sold' && (
                    <div className="absolute inset-0 bg-red-600/80 flex items-center justify-center rounded-t-lg">
                      <span className="text-white text-2xl font-bold tracking-wider">SOLD</span>
                    </div>
                  )}
                </div>

                <CardContent className="p-6">
                  <div className="mb-4">
                    <h3 className="text-2xl font-light text-white mb-2">
                      {car.year} {car.make} {car.model}
                    </h3>
                    <p className="text-3xl font-bold text-white mb-2">
                      {car.currency} ${car.price.toLocaleString()}
                    </p>
                    <div className="flex items-center text-gray-400 text-sm">
                      <MapPin className="w-4 h-4 mr-1" />
                      {car.location}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                    <div className="flex items-center text-gray-300">
                      <Calendar className="w-4 h-4 mr-2" />
                      {car.year}
                    </div>
                    <div className="flex items-center text-gray-300">
                      <Gauge className="w-4 h-4 mr-2" />
                      {car.mileage.toLocaleString()} km
                    </div>
                    <div className="flex items-center text-gray-300">
                      <Fuel className="w-4 h-4 mr-2" />
                      {car.fuelType}
                    </div>
                    <div className="flex items-center text-gray-300">
                      <Palette className="w-4 h-4 mr-2" />
                      {car.exteriorColor}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-white font-medium mb-2">Key Features</h4>
                    <div className="flex flex-wrap gap-2">
                      {car.features.slice(0, 3).map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-gray-300 border-gray-700">
                          {feature}
                        </Badge>
                      ))}
                      {car.features.length > 3 && (
                        <Badge variant="outline" className="text-gray-300 border-gray-700">
                          +{car.features.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      onClick={() => handleContactDealer(car)}
                      className="flex-1 bg-white text-black hover:bg-gray-200"
                      disabled={car.status === 'sold'}
                      size="sm"
                    >
                      <Phone className="w-4 h-4 mr-1" />
                      WhatsApp
                    </Button>
                    <Button 
                      onClick={() => handleEmailContact(car)}
                      variant="outline" 
                      className="flex-1 border-white text-white hover:bg-white hover:text-black"
                      disabled={car.status === 'sold'}
                      size="sm"
                    >
                      <Mail className="w-4 h-4 mr-1" />
                      Email
                    </Button>
                    <Button 
                      onClick={() => handleRequestQuote(car)}
                      variant="outline" 
                      className="flex-1 border-white text-white hover:bg-white hover:text-black"
                      disabled={car.status === 'sold'}
                      size="sm"
                    >
                      <MessageSquare className="w-4 h-4 mr-1" />
                      Quote
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredCars.length === 0 && (
            <div className="text-center py-16">
              <Car className="w-16 h-16 mx-auto mb-4 text-gray-600" />
              <h3 className="text-2xl font-light text-gray-400 mb-2">No vehicles found</h3>
              <p className="text-gray-500">Try adjusting your search criteria</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
      <BackToTop />
    </div>
  );
};

export default CarsCollection;