
import { Button } from "@/components/ui/button";
import { useTranslation } from 'react-i18next';
import { Search, Phone, MapPin, Mail } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Hero = () => {
  const { t } = useTranslation('common');

  const handleImportExport = () => {
    window.location.href = '/import-export';
  };

  const handleViewCars = () => {
    window.location.href = '/cars-collection';
  };

  const handleBookVIP = () => {
    const message = "I'm interested in VIP rental services. Please provide more information.";
    const whatsappUrl = `https://wa.me/15185077243?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header Bar */}
      <div className="bg-gray-900 text-gray-300 py-2 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>LUXURY CAR EXPORTS - WORLDWIDE SHIPPING</span>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <span>SERVICE +1-518-507-7243</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <span>SALES +1-518-507-7243</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span>CONTACT</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="bg-white text-black py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <h1 className="text-3xl font-bold tracking-wider">CLUB B2B</h1>
            <span className="text-sm font-light">LUXURY IMPORTS</span>
          </div>
          <nav className="flex items-center space-x-8 font-medium">
            <button onClick={handleViewCars} className="hover:text-gray-600 transition-colors">NEW</button>
            <button onClick={handleViewCars} className="hover:text-gray-600 transition-colors">PRE-OWNED</button>
            <button onClick={() => window.location.href = '/vip-membership'} className="hover:text-gray-600 transition-colors">VIP MEMBERSHIP</button>
            <button onClick={handleImportExport} className="hover:text-gray-600 transition-colors">IMPORT & EXPORT</button>
            <button onClick={handleBookVIP} className="hover:text-gray-600 transition-colors">RENTAL</button>
            <button onClick={() => window.location.href = '/about'} className="hover:text-gray-600 transition-colors">ABOUT</button>
          </nav>
          <div className="flex items-center space-x-2">
            <Phone className="h-5 w-5" />
            <span className="font-bold">SALES +1-518-507-7243</span>
          </div>
        </div>
      </div>

      {/* Luxury Brand Logos */}
      <div className="bg-black py-12">
        <div className="max-w-7xl mx-auto flex justify-center items-center space-x-16 opacity-90">
          <div className="text-white text-2xl font-bold tracking-[0.3em] hover:text-yellow-400 transition-colors cursor-pointer">
            LAND ROVER
          </div>
          <div className="text-white text-2xl font-bold tracking-[0.3em] hover:text-yellow-400 transition-colors cursor-pointer">
            BENTLEY
          </div>
          <div className="text-white text-2xl font-bold tracking-[0.3em] hover:text-yellow-400 transition-colors cursor-pointer">
            ASTON MARTIN
          </div>
          <div className="text-white text-2xl font-bold tracking-[0.3em] hover:text-yellow-400 transition-colors cursor-pointer">
            ROLLS-ROYCE
          </div>
          <div className="text-white text-2xl font-bold tracking-[0.3em] hover:text-yellow-400 transition-colors cursor-pointer">
            MASERATI
          </div>
          <div className="text-white text-2xl font-bold tracking-[0.3em] hover:text-yellow-400 transition-colors cursor-pointer">
            JAGUAR
          </div>
        </div>
      </div>

      {/* Hero Section with Inventory Search */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1606016159991-d17d8c5f7e9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80')"
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="mb-8">
            <h2 className="text-lg text-gray-300 mb-4 tracking-wider">Inventory Search</h2>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 text-white tracking-wide">
              216 Vehicles Available
            </h1>
            
            <div className="flex justify-center space-x-6 mb-12 text-gray-300">
              <span className="border-b-2 border-white pb-2 text-white tracking-wide">Basic Search</span>
              <span className="text-gray-400">|</span>
              <span className="hover:text-white cursor-pointer tracking-wide transition-colors">Advanced Search</span>
              <span className="text-gray-400">|</span>
              <span className="hover:text-white cursor-pointer tracking-wide transition-colors">Search By Stock</span>
            </div>
          </div>

          {/* Search Form */}
          <div className="bg-black/40 backdrop-blur-md p-8 rounded-2xl border border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Select>
                <SelectTrigger className="bg-white/95 text-black h-12 text-lg font-medium">
                  <SelectValue placeholder="New" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="pre-owned">Pre-Owned</SelectItem>
                </SelectContent>
              </Select>
              
              <Select>
                <SelectTrigger className="bg-white/95 text-black h-12 text-lg font-medium">
                  <SelectValue placeholder="Any Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                  <SelectItem value="2021">2021</SelectItem>
                </SelectContent>
              </Select>
              
              <Select>
                <SelectTrigger className="bg-white/95 text-black h-12 text-lg font-medium">
                  <SelectValue placeholder="Any Make" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bentley">Bentley</SelectItem>
                  <SelectItem value="rolls-royce">Rolls-Royce</SelectItem>
                  <SelectItem value="maserati">Maserati</SelectItem>
                  <SelectItem value="jaguar">Jaguar</SelectItem>
                  <SelectItem value="aston-martin">Aston Martin</SelectItem>
                  <SelectItem value="land-rover">Land Rover</SelectItem>
                </SelectContent>
              </Select>
              
              <Select>
                <SelectTrigger className="bg-white/95 text-black h-12 text-lg font-medium">
                  <SelectValue placeholder="Any Model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="continental">Continental</SelectItem>
                  <SelectItem value="ghost">Ghost</SelectItem>
                  <SelectItem value="ghibli">Ghibli</SelectItem>
                  <SelectItem value="f-type">F-Type</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button 
              onClick={handleViewCars}
              className="w-64 h-14 bg-transparent border-2 border-white text-white font-bold text-lg tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-300 hover:scale-105"
            >
              SEARCH
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
