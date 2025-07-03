
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Filter } from 'lucide-react';
import { useVehicles, useAddVehicle, useUpdateVehicle, Vehicle } from '@/hooks/useVehicles';
import { toast } from 'sonner';
import VehicleForm from './VehicleForm';
import VehicleList from './VehicleList';

const VehicleManagement = () => {
  const { data: vehicles, isLoading } = useVehicles();
  const addVehicle = useAddVehicle();
  const updateVehicle = useUpdateVehicle();
  
  const [isAddingVehicle, setIsAddingVehicle] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [makeFilter, setMakeFilter] = useState('all');

  // Filter vehicles based on search and filters
  const filteredVehicles = vehicles?.filter(vehicle => {
    const matchesSearch = !searchTerm || 
      vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.year.toString().includes(searchTerm);
    
    const matchesStatus = statusFilter === 'all' || vehicle.status === statusFilter;
    const matchesMake = makeFilter === 'all' || vehicle.make === makeFilter;
    
    return matchesSearch && matchesStatus && matchesMake;
  }) || [];

  // Get unique makes for filter
  const uniqueMakes = [...new Set(vehicles?.map(v => v.make) || [])].sort();

  const handleAddVehicle = async (formData: any) => {
    try {
      await addVehicle.mutateAsync(formData);
      toast.success('Vehicle added successfully!');
      setIsAddingVehicle(false);
    } catch (error) {
      console.error('Error adding vehicle:', error);
      toast.error('Failed to add vehicle. Please try again.');
    }
  };

  const handleUpdateVehicle = async (formData: any) => {
    if (!editingVehicle) return;
    
    try {
      await updateVehicle.mutateAsync({ id: editingVehicle.id, ...formData });
      toast.success('Vehicle updated successfully!');
      setEditingVehicle(null);
    } catch (error) {
      console.error('Error updating vehicle:', error);
      toast.error('Failed to update vehicle. Please try again.');
    }
  };

  const handleEdit = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle);
    setIsAddingVehicle(true);
  };

  const handleView = (vehicle: Vehicle) => {
    // For now, just show an alert with vehicle details
    // In a real app, this would open a detailed view modal or navigate to a detail page
    alert(`Vehicle Details:\n${vehicle.year} ${vehicle.make} ${vehicle.model}\nVIN: ${vehicle.vin || 'N/A'}\nPrice: ${vehicle.currency} ${vehicle.price?.toLocaleString() || 'N/A'}`);
  };

  const handleCancel = () => {
    setIsAddingVehicle(false);
    setEditingVehicle(null);
  };

  if (isAddingVehicle) {
    return (
      <div className="p-6">
        <VehicleForm
          initialData={editingVehicle || undefined}
          onSubmit={editingVehicle ? handleUpdateVehicle : handleAddVehicle}
          onCancel={handleCancel}
          isLoading={addVehicle.isPending || updateVehicle.isPending}
          isEditing={!!editingVehicle}
        />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Vehicle Management</h1>
          <p className="text-gray-600">Manage your luxury vehicle inventory</p>
        </div>
        <Button onClick={() => setIsAddingVehicle(true)} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Vehicle
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search by make, model, or year..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="reserved">Reserved</SelectItem>
              <SelectItem value="sold">Sold</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={makeFilter} onValueChange={setMakeFilter}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Makes</SelectItem>
              {uniqueMakes.map(make => (
                <SelectItem key={make} value={make}>{make}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results Summary */}
      <div className="text-sm text-gray-600">
        Showing {filteredVehicles.length} of {vehicles?.length || 0} vehicles
      </div>

      {/* Vehicle List */}
      <VehicleList
        vehicles={filteredVehicles}
        onEdit={handleEdit}
        onView={handleView}
        isLoading={isLoading}
      />
    </div>
  );
};

export default VehicleManagement;
