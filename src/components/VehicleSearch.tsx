import { useState } from "react";
import { Search, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

interface VehicleFilters {
  search: string;
  make: string;
  model: string;
  yearRange: [number, number];
  priceRange: [number, number];
  condition: string;
  transmission: string;
  fuelType: string;
}

interface VehicleSearchProps {
  filters: VehicleFilters;
  onFiltersChange: (filters: VehicleFilters) => void;
  onReset: () => void;
}

const VehicleSearch = ({ filters, onFiltersChange, onReset }: VehicleSearchProps) => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const makeOptions = [
    "Mercedes-Benz", "BMW", "Audi", "Range Rover", "Porsche", "Cadillac", 
    "Bentley", "Rolls-Royce", "Lamborghini", "Ferrari", "McLaren"
  ];

  const conditionOptions = ["New", "Excellent", "Good", "Fair"];
  const transmissionOptions = ["Automatic", "Manual", "CVT"];
  const fuelTypeOptions = ["Gasoline", "Diesel", "Hybrid", "Electric"];

  const updateFilter = (key: keyof VehicleFilters, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.search) count++;
    if (filters.make) count++;
    if (filters.model) count++;
    if (filters.condition) count++;
    if (filters.transmission) count++;
    if (filters.fuelType) count++;
    if (filters.yearRange[0] !== 2000 || filters.yearRange[1] !== 2025) count++;
    if (filters.priceRange[0] !== 0 || filters.priceRange[1] !== 500000) count++;
    return count;
  };

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search vehicles by make, model, or features..."
          value={filters.search}
          onChange={(e) => updateFilter('search', e.target.value)}
          className="pl-10 pr-4 h-12 text-base"
        />
      </div>

      {/* Quick Filters & Advanced Toggle */}
      <div className="flex flex-wrap gap-3 items-center justify-between">
        <div className="flex flex-wrap gap-2">
          <Select value={filters.make} onValueChange={(value) => updateFilter('make', value === 'all' ? '' : value)}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Make" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Makes</SelectItem>
              {makeOptions.map((make) => (
                <SelectItem key={make} value={make}>{make}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filters.condition} onValueChange={(value) => updateFilter('condition', value === 'all' ? '' : value)}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Condition" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Conditions</SelectItem>
              {conditionOptions.map((condition) => (
                <SelectItem key={condition} value={condition.toLowerCase()}>{condition}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          {activeFiltersCount > 0 && (
            <Button variant="outline" onClick={onReset} className="h-9">
              <X className="w-4 h-4 mr-1" />
              Clear ({activeFiltersCount})
            </Button>
          )}
          
          <Sheet open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="h-9">
                <Filter className="w-4 h-4 mr-2" />
                Advanced Filters
                {activeFiltersCount > 0 && (
                  <Badge variant="secondary" className="ml-2 px-1.5 py-0.5 text-xs">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-80">
              <SheetHeader>
                <SheetTitle>Advanced Filters</SheetTitle>
              </SheetHeader>
              
              <div className="space-y-6 mt-6">
                {/* Model */}
                <div className="space-y-2">
                  <Label>Model</Label>
                  <Input
                    placeholder="Enter model name"
                    value={filters.model}
                    onChange={(e) => updateFilter('model', e.target.value)}
                  />
                </div>

                {/* Year Range */}
                <div className="space-y-3">
                  <Label>Year Range</Label>
                  <div className="px-2">
                    <Slider
                      value={filters.yearRange}
                      onValueChange={(value) => updateFilter('yearRange', value as [number, number])}
                      min={2000}
                      max={2025}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground mt-1">
                      <span>{filters.yearRange[0]}</span>
                      <span>{filters.yearRange[1]}</span>
                    </div>
                  </div>
                </div>

                {/* Price Range */}
                <div className="space-y-3">
                  <Label>Price Range (USD)</Label>
                  <div className="px-2">
                    <Slider
                      value={filters.priceRange}
                      onValueChange={(value) => updateFilter('priceRange', value as [number, number])}
                      min={0}
                      max={500000}
                      step={5000}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground mt-1">
                      <span>${filters.priceRange[0].toLocaleString()}</span>
                      <span>${filters.priceRange[1].toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Transmission */}
                <div className="space-y-2">
                  <Label>Transmission</Label>
                  <Select value={filters.transmission} onValueChange={(value) => updateFilter('transmission', value === 'all' ? '' : value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any transmission" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any Transmission</SelectItem>
                      {transmissionOptions.map((transmission) => (
                        <SelectItem key={transmission} value={transmission.toLowerCase()}>{transmission}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Fuel Type */}
                <div className="space-y-2">
                  <Label>Fuel Type</Label>
                  <Select value={filters.fuelType} onValueChange={(value) => updateFilter('fuelType', value === 'all' ? '' : value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any fuel type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any Fuel Type</SelectItem>
                      {fuelTypeOptions.map((fuelType) => (
                        <SelectItem key={fuelType} value={fuelType.toLowerCase()}>{fuelType}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Reset Button */}
                <Button 
                  variant="outline" 
                  onClick={onReset} 
                  className="w-full"
                  disabled={activeFiltersCount === 0}
                >
                  Reset All Filters
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Active Filters Display */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {filters.search && (
            <Badge variant="secondary" className="px-3 py-1">
              Search: "{filters.search}"
              <X 
                className="w-3 h-3 ml-1 cursor-pointer" 
                onClick={() => updateFilter('search', '')}
              />
            </Badge>
          )}
          {filters.make && (
            <Badge variant="secondary" className="px-3 py-1">
              Make: {filters.make}
              <X 
                className="w-3 h-3 ml-1 cursor-pointer" 
                onClick={() => updateFilter('make', '')}
              />
            </Badge>
          )}
          {filters.model && (
            <Badge variant="secondary" className="px-3 py-1">
              Model: {filters.model}
              <X 
                className="w-3 h-3 ml-1 cursor-pointer" 
                onClick={() => updateFilter('model', '')}
              />
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};

export default VehicleSearch;