import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Package, Truck, MapPin, Clock, CheckCircle, AlertCircle, Bell } from 'lucide-react';
import { useOrders, Order } from '@/hooks/useOrders';
import { format } from 'date-fns';
import { toast } from 'sonner';

const OrderTracking = () => {
  const { data: orders, isLoading } = useOrders();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Filter orders based on search and status
  const filteredOrders = orders?.filter(order => {
    const matchesSearch = !searchTerm || 
      order.order_number.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.order_status === statusFilter;
    
    return matchesSearch && matchesStatus;
  }) || [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'created':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'in_transit':
        return 'bg-orange-100 text-orange-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'created':
        return <Package className="w-4 h-4" />;
      case 'processing':
        return <Clock className="w-4 h-4" />;
      case 'shipped':
        return <Truck className="w-4 h-4" />;
      case 'in_transit':
        return <MapPin className="w-4 h-4" />;
      case 'delivered':
        return <CheckCircle className="w-4 h-4" />;
      case 'cancelled':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  const getTrackingSteps = (status: string) => {
    const steps = [
      { key: 'created', label: 'Order Created', completed: true },
      { key: 'processing', label: 'Processing', completed: false },
      { key: 'shipped', label: 'Shipped', completed: false },
      { key: 'in_transit', label: 'In Transit', completed: false },
      { key: 'delivered', label: 'Delivered', completed: false }
    ];

    const statusOrder = ['created', 'processing', 'shipped', 'in_transit', 'delivered'];
    const currentIndex = statusOrder.indexOf(status);

    return steps.map((step, index) => ({
      ...step,
      completed: index <= currentIndex,
      current: index === currentIndex
    }));
  };

  const handleNotifyCustomer = (order: Order) => {
    const customerName = 'Customer';
    const message = `Hello ${customerName},

Your order ${order.order_number} status has been updated:

Status: ${order.order_status?.replace('_', ' ').toUpperCase()}
${order.estimated_delivery ? `Estimated Delivery: ${format(new Date(order.estimated_delivery), 'MMM dd, yyyy')}` : ''}

Track your order: [Your tracking URL here]

Best regards,
Club B2B Performance Team`;

    const email = 'customer@example.com'; // Replace with actual customer email lookup
    const mailtoUrl = `mailto:${email}?subject=Order Update - ${order.order_number}&body=${encodeURIComponent(message)}`;
    window.open(mailtoUrl);
    toast.success('Email notification opened');
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Order Tracking</h1>
          <p className="text-gray-600">Monitor and manage order status and shipments</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search by order number or customer name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="created">Created</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="shipped">Shipped</SelectItem>
            <SelectItem value="in_transit">In Transit</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Results Summary */}
      <div className="text-sm text-gray-600">
        Showing {filteredOrders.length} of {orders?.length || 0} orders
      </div>

      {/* Orders Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredOrders.map((order) => (
          <Card key={order.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedOrder(order)}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  {getStatusIcon(order.order_status || 'created')}
                  {order.order_number}
                </span>
                <Badge className={getStatusColor(order.order_status || 'created')}>
                  {order.order_status?.replace('_', ' ') || 'created'}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-medium">Customer #{order.customer_id.slice(-8)}</p>
                <p className="text-sm text-gray-600">Order: {order.order_type}</p>
              </div>

              <div className="text-sm">
                <span className="text-gray-500">Vehicle ID:</span>
                <p className="font-medium">{order.vehicle_id?.slice(-8) || 'N/A'}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Total:</span>
                  <p className="font-medium">{order.currency} {order.total_amount.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-gray-500">Payment:</span>
                  <p className="font-medium capitalize">{order.payment_status || 'pending'}</p>
                </div>
              </div>

              {order.estimated_delivery && (
                <div className="text-sm">
                  <span className="text-gray-500">Est. Delivery:</span>
                  <p className="font-medium">{format(new Date(order.estimated_delivery), 'MMM dd, yyyy')}</p>
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNotifyCustomer(order);
                  }}
                  className="flex-1"
                >
                  <Bell className="w-4 h-4 mr-2" />
                  Notify
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
            <p className="text-gray-500">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your search or filters.' 
                : 'Orders will appear here when customers place them.'}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Order Details - {selectedOrder.order_number}</span>
                <Button variant="outline" size="sm" onClick={() => setSelectedOrder(null)}>
                  Close
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Tracking Progress */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Tracking Progress</h3>
                <div className="space-y-4">
                  {getTrackingSteps(selectedOrder.order_status || 'created').map((step, index) => (
                    <div key={step.key} className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        step.completed ? 'bg-green-500 text-white' : 
                        step.current ? 'bg-blue-500 text-white' : 'bg-gray-200'
                      }`}>
                        {step.completed ? <CheckCircle className="w-4 h-4" /> : index + 1}
                      </div>
                      <div className="flex-1">
                        <p className={`font-medium ${step.current ? 'text-blue-600' : step.completed ? 'text-green-600' : 'text-gray-500'}`}>
                          {step.label}
                        </p>
                        {step.current && (
                          <p className="text-sm text-gray-600">Currently in progress</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Customer Information</h4>
                  <div className="space-y-1 text-sm">
                    <p><span className="text-gray-500">Customer ID:</span> {selectedOrder.customer_id}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Order Details</h4>
                  <div className="space-y-1 text-sm">
                    <p><span className="text-gray-500">Total Amount:</span> {selectedOrder.currency} {selectedOrder.total_amount.toLocaleString()}</p>
                    <p><span className="text-gray-500">Payment Status:</span> <span className="capitalize">{selectedOrder.payment_status || 'pending'}</span></p>
                    <p><span className="text-gray-500">Order Type:</span> <span className="capitalize">{selectedOrder.order_type}</span></p>
                    {selectedOrder.estimated_delivery && (
                      <p><span className="text-gray-500">Est. Delivery:</span> {format(new Date(selectedOrder.estimated_delivery), 'MMM dd, yyyy')}</p>
                    )}
                  </div>
                </div>
              </div>

              {selectedOrder.vehicle_id && (
                <div>
                  <h4 className="font-semibold mb-2">Vehicle Information</h4>
                  <div className="space-y-1 text-sm">
                    <p><span className="text-gray-500">Vehicle ID:</span> {selectedOrder.vehicle_id}</p>
                  </div>
                </div>
              )}

              {selectedOrder.shipping_address && (
                <div>
                  <h4 className="font-semibold mb-2">Shipping Information</h4>
                  <div className="space-y-1 text-sm">
                    <p><span className="text-gray-500">Method:</span> <span className="capitalize">{selectedOrder.shipping_method || 'N/A'}</span></p>
                    <p><span className="text-gray-500">Address:</span> {selectedOrder.shipping_address}</p>
                  </div>
                </div>
              )}

              {selectedOrder.notes && (
                <div>
                  <h4 className="font-semibold mb-2">Notes</h4>
                  <p className="text-sm text-gray-600">{selectedOrder.notes}</p>
                </div>
              )}

              <div className="flex gap-2 pt-4 border-t">
                <Button onClick={() => handleNotifyCustomer(selectedOrder)} className="flex-1">
                  <Bell className="w-4 h-4 mr-2" />
                  Send Update to Customer
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default OrderTracking;