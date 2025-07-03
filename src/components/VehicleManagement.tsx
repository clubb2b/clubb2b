
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Car, Edit, Trash2 } from 'lucide-react';
import { useVehicles, useAddVehicle, useUpdateVehicle } from '@/hooks/useVehicles';
import { useToast } from "@/hooks/use-toast";

const VehicleManagement = () => {
  const { data: vehicles, isLoading } = useVehicles();
  const addVehicle = useAddVehicle();
  const updateVehicle = useUpdateVehicle();
  const { toast } = useToast();
  const [isAddingVehicle, setIsAddingVehicle] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: 2024,
    price: 0,
    mileage: 0,
    exterior_color: '',
    interior_color: '',
    transmission: 'automatic',
    fuel_type: 'gasoline',
    engine_details: '',
    description: '',
    condition: 'excellent',
    status: 'available',
    location: 'Canada',
    currency: 'USD'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingVehicle) {
        await updateVehicle.mutateAsync({ id: editingVehicle, ...formData });
        toast({ title: "Vehicle updated successfully!" });
        setEditingVehicle(null);
      } else {
        await addVehicle.mutateAsync(formData);
        toast({ title: "Vehicle added successfully!" });
        setIsAddingVehicle(false);
      }
      
      // Reset form
      setFormData({
        make: '',
        model: '',
        year: 2024,
        price: 0,
        mileage: 0,
        exterior_color: '',
        interior_color: '',
        transmission: 'automatic',
        fuel_type: 'gasoline',
        engine_details: '',
        description: '',
        condition: 'excellent',
        status: 'available',
        location: 'Canada',
        currency: 'USD'
      });
    } catch (error) {
      toast({ 
        title: "Error", 
        description: "Failed to save vehicle. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleEdit = (vehicle: any) => {
    setFormData({
      make: vehicle.make,
      model: vehicle.model,
      year: vehicle.year,
      price: vehicle.price || 0,
      mileage: vehicle.mileage || 0,
      exterior_color: vehicle.exterior_color || '',
      interior_color: vehicle.interior_color || '',
      transmission: vehicle.transmission || 'automatic',
      fuel_type: vehicle.fuel_type || 'gasoline',
      engine_details: vehicle.engine_details || '',
      description: vehicle.description || '',
      condition: vehicle.condition || 'excellent',
      status: vehicle.status || 'available',
      location: vehicle.location || 'Canada',
      currency: vehicle.currency || 'USD'
    });
    setEditingVehicle(vehicle.id);
    setIsAddingVehicle(true);
  };

  if (isLoading) {
    return <div className="p-6">Loading vehicles...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Vehicle Management</h1>
        <Button onClick={() => setIsAddingVehicle(true)} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Vehicle
        </Button>
      </div>

      {isAddingVehicle && (
        <Card>
          <CardHeader>
            <CardTitle>{editingVehicle ? 'Edit Vehicle' : 'Add New Vehicle'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="make">Make</Label>
                <Input
                  id="make"
                  value={formData.make}
                  onChange={(e) => setFormData({ ...formData, make: e.target.value })}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="model">Model</Label>
                <Input
                  id="model"
                  value={formData.model}
                  onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="year">Year</Label>
                <Input
                  id="year"
                  type="number"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                />
              </div>
              
              <div>
                <Label htmlFor="mileage">Mileage</Label>
                <Input
                  id="mileage"
                  type="number"
                  value={formData.mileage}
                  onChange={(e) => setFormData({ ...formData, mileage: parseInt(e.target.value) })}
                />
              </div>
              
              <div>
                <Label htmlFor="exterior_color">Exterior Color</Label>
                <Input
                  id="exterior_color"
                  value={formData.exterior_color}
                  onChange={(e) => setFormData({ ...formData, exterior_color: e.target.value })}
                />
              </div>
              
              <div>
                <Label htmlFor="interior_color">Interior Color</Label>
                <Input
                  id="interior_color"
                  value={formData.interior_color}
                  onChange={(e) => setFormData({ ...formData, interior_color: e.target.value })}
                />
              </div>
              
              <div>
                <Label htmlFor="transmission">Transmission</Label>
                <Select value={formData.transmission} onValueChange={(value) => setFormData({ ...formData, transmission: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="automatic">Automatic</SelectItem>
                    <SelectItem value="manual">Manual</SelectItem>
                    <SelectItem value="cvt">CVT</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="fuel_type">Fuel Type</Label>
                <Select value={formData.fuel_type} onValueChange={(value) => setFormData({ ...formData, fuel_type: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gasoline">Gasoline</SelectItem>
                    <SelectItem value="diesel">Diesel</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                    <SelectItem value="electric">Electric</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="md:col-span-2 lg:col-span-3">
                <Label htmlFor="engine_details">Engine Details</Label>
                <Input
                  id="engine_details"
                  value={formData.engine_details}
                  onChange={(e) => setFormData({ ...formData, engine_details: e.target.value })}
                />
              </div>
              
              <div className="md:col-span-2 lg:col-span-3">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>
              
              <div className="md:col-span-2 lg:col-span-3 flex gap-4">
                <Button type="submit" disabled={addVehicle.isPending || updateVehicle.isPending}>
                  {editingVehicle ? 'Update Vehicle' : 'Add Vehicle'}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    setIsAddingVehicle(false);
                    setEditingVehicle(null);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vehicles?.map((vehicle) => (
          <Card key={vehicle.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Car className="w-5 h-5" />
                  {vehicle.year} {vehicle.make} {vehicle.model}
                </span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(vehicle)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p><strong>Price:</strong> {vehicle.currency} {vehicle.price?.toLocaleString()}</p>
                <p><strong>Mileage:</strong> {vehicle.mileage?.toLocaleString()} km</p>
                <p><strong>Color:</strong> {vehicle.exterior_color}</p>
                <p><strong>Transmission:</strong> {vehicle.transmission}</p>
                <p><strong>Status:</strong> 
                  <span className={`ml-2 px-2 py-1 rounded text-sm ${
                    vehicle.status === 'available' ? 'bg-green-100 text-green-800' :
                    vehicle.status === 'reserved' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {vehicle.status}
                  </span>
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default VehicleManagement;
