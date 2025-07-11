
import VehicleCard from "./VehicleCard";
import VehicleSearch from "./VehicleSearch";
import { useVehicleSearch } from "@/hooks/useVehicleSearch";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";

const VehicleGrid = () => {
  const { 
    vehicles, 
    loading, 
    filters, 
    updateFilters, 
    resetFilters, 
    filteredCount, 
    totalCount 
  } = useVehicleSearch();

  // Loading skeleton
  if (loading) {
    return (
      <div className="space-y-8">
        <div className="space-y-4">
          <Skeleton className="h-12 w-full" />
          <div className="flex gap-4">
            <Skeleton className="h-10 w-40" />
            <Skeleton className="h-10 w-36" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="space-y-4">
              <Skeleton className="h-64 w-full rounded-lg" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Search and Filters */}
      <VehicleSearch 
        filters={filters}
        onFiltersChange={updateFilters}
        onReset={resetFilters}
      />

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filteredCount} of {totalCount} vehicles
        </p>
      </div>

      {/* Vehicle Grid */}
      {vehicles.length === 0 ? (
        <div className="text-center py-16">
          <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No vehicles found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search criteria or filters
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {vehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      )}
    </div>
  );
};

export default VehicleGrid;
