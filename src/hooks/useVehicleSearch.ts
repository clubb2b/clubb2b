import { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number | null;
  condition: string | null;
  transmission: string | null;
  fuel_type: string | null;
  exterior_color: string | null;
  interior_color: string | null;
  mileage: number | null;
  description: string | null;
  features: string[] | null;
  status: string | null;
  location: string | null;
  currency: string | null;
  images?: Array<{
    id: string;
    image_url: string;
    caption: string | null;
    is_primary: boolean | null;
    display_order: number | null;
  }>;
}

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

const defaultFilters: VehicleFilters = {
  search: '',
  make: '',
  model: '',
  yearRange: [2000, 2025],
  priceRange: [0, 500000],
  condition: '',
  transmission: '',
  fuelType: '',
};

export const useVehicleSearch = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<VehicleFilters>(defaultFilters);

  // Fetch vehicles from database
  const fetchVehicles = async () => {
    try {
      setLoading(true);
      
      const { data: vehiclesData, error: vehiclesError } = await supabase
        .from('vehicles')
        .select(`
          *,
          images:vehicle_images(
            id,
            image_url,
            caption,
            is_primary,
            display_order
          )
        `)
        .eq('status', 'available')
        .order('created_at', { ascending: false });

      if (vehiclesError) {
        console.error('Error fetching vehicles:', vehiclesError);
        toast.error('Failed to load vehicles');
        return;
      }

      // Sort images by display_order
      const vehiclesWithSortedImages = vehiclesData?.map(vehicle => ({
        ...vehicle,
        images: vehicle.images?.sort((a: any, b: any) => {
          if (a.is_primary && !b.is_primary) return -1;
          if (!a.is_primary && b.is_primary) return 1;
          return (a.display_order || 0) - (b.display_order || 0);
        })
      })) || [];

      setVehicles(vehiclesWithSortedImages);
    } catch (error) {
      console.error('Unexpected error fetching vehicles:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  // Filter vehicles based on search criteria
  const filteredVehicles = useMemo(() => {
    return vehicles.filter(vehicle => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const searchableText = [
          vehicle.make,
          vehicle.model,
          vehicle.description,
          ...(vehicle.features || [])
        ].join(' ').toLowerCase();
        
        if (!searchableText.includes(searchLower)) {
          return false;
        }
      }

      // Make filter
      if (filters.make && vehicle.make !== filters.make) {
        return false;
      }

      // Model filter
      if (filters.model) {
        const modelLower = filters.model.toLowerCase();
        if (!vehicle.model.toLowerCase().includes(modelLower)) {
          return false;
        }
      }

      // Year range filter
      if (vehicle.year < filters.yearRange[0] || vehicle.year > filters.yearRange[1]) {
        return false;
      }

      // Price range filter
      if (vehicle.price !== null) {
        if (vehicle.price < filters.priceRange[0] || vehicle.price > filters.priceRange[1]) {
          return false;
        }
      }

      // Condition filter
      if (filters.condition && vehicle.condition?.toLowerCase() !== filters.condition.toLowerCase()) {
        return false;
      }

      // Transmission filter
      if (filters.transmission && vehicle.transmission?.toLowerCase() !== filters.transmission.toLowerCase()) {
        return false;
      }

      // Fuel type filter
      if (filters.fuelType && vehicle.fuel_type?.toLowerCase() !== filters.fuelType.toLowerCase()) {
        return false;
      }

      return true;
    });
  }, [vehicles, filters]);

  const updateFilters = (newFilters: VehicleFilters) => {
    setFilters(newFilters);
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  return {
    vehicles: filteredVehicles,
    loading,
    filters,
    updateFilters,
    resetFilters,
    refetch: fetchVehicles,
    totalCount: vehicles.length,
    filteredCount: filteredVehicles.length,
  };
};