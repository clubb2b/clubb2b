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
      make: 'BMW',
      model: 'X7 xDrive40i M Sport',
      year: 2024,
      price: 125000,
      currency: 'CAD',
      mileage: 8500,
      fuelType: 'Mild Hybrid',
      transmission: '8-Speed Automatic',
      exteriorColor: 'Alpine White',
      interiorColor: 'Black Merino Leather',
      location: 'Toronto, Canada',
      condition: 'Excellent',
      features: ['xDrive AWD', 'M Sport Package', 'Panoramic Sky Lounge', 'Harman Kardon Audio', 'Adaptive LED Headlights', 'Gesture Control', 'Wireless Charging', '4-Zone Climate Control'],
      images: ['/lovable-uploads/c7257e02-0bee-428c-96ed-aa62be0331a3.png'],
      description: 'Luxury 7-seater SUV with 3.0L turbocharged inline-6 engine producing 375hp. Features BMW Live Cockpit Professional with 12.3" display.',
      status: 'available'
    },
    {
      id: '2',
      make: 'Mercedes-Benz',
      model: 'S-Class S580 4MATIC',
      year: 2023,
      price: 168000,
      currency: 'CAD',
      mileage: 6200,
      fuelType: 'V8 Biturbo',
      transmission: '9G-TRONIC Automatic',
      exteriorColor: 'Obsidian Black Metallic',
      interiorColor: 'Macchiato Beige/Espresso Brown',
      location: 'Vancouver, Canada',
      condition: 'Like New',
      features: ['AIRMATIC Suspension', 'Energizing Massage', 'Burmester 3D Audio', 'Head-Up Display', 'Ambient Lighting 64 Colors', 'Executive Rear Seating', 'Magic Body Control', 'Night Vision Assist'],
      images: ['/lovable-uploads/527d7368-7510-4039-a647-850a6054e780.png'],
      description: 'Flagship luxury sedan with 4.0L V8 biturbo engine delivering 496hp. Ultimate in comfort and technology with MBUX Hyperscreen.',
      status: 'available'
    },
    {
      id: '3',
      make: 'Audi',
      model: 'RS7 Sportback Performance',
      year: 2024,
      price: 195000,
      currency: 'CAD',
      mileage: 3100,
      fuelType: 'TFSI V8 Mild Hybrid',
      transmission: '8-Speed Tiptronic',
      exteriorColor: 'Nardo Grey',
      interiorColor: 'Valcona Red Diamond Quilted',
      location: 'Calgary, Canada',
      condition: 'Excellent',
      features: ['Quattro AWD', 'Sport Differential', 'Carbon Fiber Exterior Package', 'Bang & Olufsen 3D Audio', 'Matrix LED Headlights', 'RS Sport Suspension Plus', 'Launch Control', 'Dynamic Ride Control'],
      images: ['/lovable-uploads/e15c69f6-6d3b-4aa1-b7f2-85292123b295.png'],
      description: 'High-performance gran turismo with 4.0L V8 TFSI engine producing 630hp. 0-100km/h in 3.4 seconds with RS-specific styling.',
      status: 'available'
    },
    {
      id: '4',
      make: 'Porsche',
      model: 'Cayenne Turbo',
      year: 2023,
      price: 210000,
      currency: 'CAD',
      mileage: 9800,
      fuelType: 'Twin-Turbo V8',
      transmission: '8-Speed Tiptronic S',
      exteriorColor: 'Guards Red',
      interiorColor: 'Black with Crayon Stitching',
      location: 'Montreal, Canada',
      condition: 'Excellent',
      features: ['Porsche Traction Management', 'Sport Chrono Package', 'Air Suspension PASM', 'Bose Surround Sound', 'Porsche Dynamic Light System Plus', 'Sport Exhaust System', 'Adaptive Cruise Control', 'Lane Keeping Assist'],
      images: ['/lovable-uploads/1a0d54fe-3d0e-4693-b7dc-73554ed8c7a4.png'],
      description: 'Performance SUV with 4.0L twin-turbo V8 engine delivering 541hp. Iconic Porsche design with racing heritage and luxury comfort.',
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
                <div className="relative">
                  <img 
                    src={car.images[0]}
                    alt={`${car.year} ${car.make} ${car.model}`}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  
                  {car.status === 'sold' && (
                    <div className="absolute inset-0 bg-red-600/80 flex items-center justify-center">
                      <span className="text-white text-2xl font-bold tracking-wider">SOLD</span>
                    </div>
                  )}
                  
                  <div className="absolute top-4 right-4 flex gap-2">
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

                  <div className="absolute bottom-4 left-4">
                    <Badge className="bg-white text-black">
                      {car.condition}
                    </Badge>
                  </div>
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