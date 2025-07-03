
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Car, Edit, Eye, Trash2 } from 'lucide-react';
import { Vehicle } from '@/hooks/useVehicles';

interface VehicleListProps {
  vehicles: Vehicle[];
  onEdit: (vehicle: Vehicle) => void;
  onView: (vehicle: Vehicle) => void;
  onDelete?: (vehicleId: string) => void;
  isLoading?: boolean;
}

const VehicleList: React.FC<VehicleListProps> = ({
  vehicles,
  onEdit,
  onView,
  onDelete,
  isLoading
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'reserved':
        return 'bg-yellow-100 text-yellow-800';
      case 'sold':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'excellent':
        return 'bg-green-100 text-green-800';
      case 'very_good':
        return 'bg-blue-100 text-blue-800';
      case 'good':
        return 'bg-yellow-100 text-yellow-800';
      case 'fair':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (vehicles.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <Car className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No vehicles found</h3>
          <p className="text-gray-500">Add your first vehicle to get started.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {vehicles.map((vehicle) => (
        <Card key={vehicle.id} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Car className="w-5 h-5" />
                {vehicle.year} {vehicle.make} {vehicle.model}
              </span>
              <div className="flex gap-1">
                <Button variant="outline" size="sm" onClick={() => onView(vehicle)}>
                  <Eye className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => onEdit(vehicle)}>
                  <Edit className="w-4 h-4" />
                </Button>
                {onDelete && (
                  <Button variant="outline" size="sm" onClick={() => onDelete(vehicle.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-medium">Price:</span>
                <span className="text-lg font-bold">
                  {vehicle.currency} {vehicle.price?.toLocaleString() || 'N/A'}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span>Mileage:</span>
                <span>{vehicle.mileage?.toLocaleString() || 'N/A'} km</span>
              </div>
              
              {vehicle.exterior_color && (
                <div className="flex justify-between items-center">
                  <span>Color:</span>
                  <span>{vehicle.exterior_color}</span>
                </div>
              )}
              
              <div className="flex justify-between items-center">
                <span>Transmission:</span>
                <span className="capitalize">{vehicle.transmission || 'N/A'}</span>
              </div>
              
              {vehicle.vin && (
                <div className="flex justify-between items-center">
                  <span>VIN:</span>
                  <span className="text-sm font-mono">{vehicle.vin.slice(-8)}</span>
                </div>
              )}
              
              <div className="flex justify-between items-center">
                <span>Status:</span>
                <Badge className={getStatusColor(vehicle.status || 'available')}>
                  {vehicle.status || 'available'}
                </Badge>
              </div>
              
              <div className="flex justify-between items-center">
                <span>Condition:</span>
                <Badge className={getConditionColor(vehicle.condition || 'excellent')}>
                  {vehicle.condition?.replace('_', ' ') || 'excellent'}
                </Badge>
              </div>
              
              {vehicle.features && vehicle.features.length > 0 && (
                <div>
                  <span className="text-sm font-medium">Features:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {vehicle.features.slice(0, 3).map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                    {vehicle.features.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{vehicle.features.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default VehicleList;
