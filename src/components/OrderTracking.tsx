
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Truck, Package, CheckCircle, Clock, MapPin } from 'lucide-react';
import { useOrders } from '@/hooks/useOrders';

const OrderTracking = () => {
  const { data: orders, isLoading } = useOrders();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'created':
        return <Clock className="w-4 h-4" />;
      case 'confirmed':
        return <CheckCircle className="w-4 h-4" />;
      case 'processing':
        return <Package className="w-4 h-4" />;
      case 'shipped':
        return <Truck className="w-4 h-4" />;
      case 'delivered':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'created':
        return 'bg-gray-100 text-gray-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return <div className="p-6">Loading orders...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Order Tracking</h1>
      
      <div className="grid gap-6">
        {orders?.map((order: any) => (
          <Card key={order.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {getStatusIcon(order.order_status)}
                    Order #{order.order_number}
                  </CardTitle>
                  <p className="text-sm text-gray-600 mt-1">
                    {order.customers?.first_name} {order.customers?.last_name} • {order.customers?.email}
                  </p>
                </div>
                <Badge className={getStatusColor(order.order_status)}>
                  {order.order_status?.charAt(0).toUpperCase() + order.order_status?.slice(1)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Vehicle</p>
                  <p className="text-sm">
                    {order.vehicles ? 
                      `${order.vehicles.year} ${order.vehicles.make} ${order.vehicles.model}` : 
                      'Service Order'
                    }
                  </p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500">Order Type</p>
                  <p className="text-sm capitalize">{order.order_type?.replace('_', ' ')}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Amount</p>
                  <p className="text-sm font-bold">{order.currency} {order.total_amount?.toLocaleString()}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500">Payment Status</p>
                  <Badge variant={order.payment_status === 'paid' ? 'default' : 'secondary'}>
                    {order.payment_status}
                  </Badge>
                </div>
                
                {order.shipping_address && (
                  <div className="md:col-span-2">
                    <p className="text-sm font-medium text-gray-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      Shipping Address
                    </p>
                    <p className="text-sm">{order.shipping_address}</p>
                  </div>
                )}
                
                {order.estimated_delivery && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Estimated Delivery</p>
                    <p className="text-sm">{new Date(order.estimated_delivery).toLocaleDateString()}</p>
                  </div>
                )}
                
                <div>
                  <p className="text-sm font-medium text-gray-500">Order Date</p>
                  <p className="text-sm">{new Date(order.created_at).toLocaleDateString()}</p>
                </div>
              </div>
              
              {order.notes && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-500">Notes</p>
                  <p className="text-sm mt-1">{order.notes}</p>
                </div>
              )}
              
              {order.order_payments && order.order_payments.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-500 mb-2">Payment History</p>
                  <div className="space-y-2">
                    {order.order_payments.map((payment: any) => (
                      <div key={payment.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <div>
                          <p className="text-sm">{payment.payment_type} - {payment.payment_method}</p>
                          <p className="text-xs text-gray-500">
                            {payment.payment_date ? new Date(payment.payment_date).toLocaleDateString() : 'Pending'}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{payment.currency} {payment.amount}</p>
                          <Badge variant={payment.status === 'completed' ? 'default' : 'secondary'} className="text-xs">
                            {payment.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
        
        {(!orders || orders.length === 0) && (
          <Card>
            <CardContent className="text-center py-8">
              <Package className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">No orders found</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default OrderTracking;
