
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Car, 
  Users, 
  Package, 
  FileText, 
  BarChart3, 
  Settings,
  DollarSign,
  TrendingUp,
  Camera
} from 'lucide-react';
import VehicleManagement from './VehicleManagement';
import QuoteManagement from './QuoteManagement';
import LeadsDashboard from './LeadsDashboard';
import OrderTracking from './OrderTracking';
import AdvancedPayments from './AdvancedPayments';
import NativeFeaturesDemo from './NativeFeaturesDemo';
import EnhancedPriceCalculator from './EnhancedPriceCalculator';
import DocumentManagement from './DocumentManagement';
import CRMDashboard from './CRMDashboard';
import RoleManagement from './RoleManagement';
import AIPhotoStudio from './AIPhotoStudio';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    {
      title: 'Total Vehicles',
      value: '24',
      change: '+12%',
      icon: Car,
      color: 'text-blue-600'
    },
    {
      title: 'Active Orders',
      value: '18',
      change: '+8%',
      icon: Package,
      color: 'text-green-600'
    },
    {
      title: 'Total Customers',
      value: '156',
      change: '+23%',
      icon: Users,
      color: 'text-purple-600'
    },
    {
      title: 'Monthly Revenue',
      value: '$285K',
      change: '+15%',
      icon: DollarSign,
      color: 'text-orange-600'
    }
  ];

  const recentActivity = [
    {
      id: '1',
      type: 'order',
      message: 'New order received from Sarah Johnson',
      time: '2 hours ago',
      status: 'new'
    },
    {
      id: '2',
      type: 'payment',
      message: 'Payment confirmed for Order #CB2B-2024-001234',
      time: '4 hours ago',
      status: 'completed'
    },
    {
      id: '3',
      type: 'vehicle',
      message: '2024 BMW X7 marked as sold',
      time: '6 hours ago',
      status: 'updated'
    },
    {
      id: '4',
      type: 'quote',
      message: 'New quote request from Michael Chen',
      time: '1 day ago',
      status: 'pending'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your business.</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-10">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="vehicles" className="flex items-center gap-2">
              <Car className="w-4 h-4" />
              Vehicles
            </TabsTrigger>
            <TabsTrigger value="quotes" className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Quotes
            </TabsTrigger>
            <TabsTrigger value="leads" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Leads
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="payments" className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Payments
            </TabsTrigger>
            <TabsTrigger value="mobile" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Mobile
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Users
            </TabsTrigger>
            <TabsTrigger value="ai-photo" className="flex items-center gap-2">
              <Camera className="w-4 h-4" />
              AI Photo
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Documents
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">{stat.title}</p>
                        <p className="text-2xl font-bold">{stat.value}</p>
                        <p className="text-sm text-green-600 flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          {stat.change}
                        </p>
                      </div>
                      <stat.icon className={`w-8 h-8 ${stat.color}`} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{activity.message}</p>
                          <p className="text-sm text-gray-500">{activity.time}</p>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          activity.status === 'new' ? 'bg-blue-100 text-blue-800' :
                          activity.status === 'completed' ? 'bg-green-100 text-green-800' :
                          activity.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {activity.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" onClick={() => setActiveTab('vehicles')}>
                    <Car className="w-4 h-4 mr-2" />
                    Add New Vehicle
                  </Button>
                  <Button className="w-full justify-start" variant="outline" onClick={() => setActiveTab('leads')}>
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Add New Lead
                  </Button>
                  <Button className="w-full justify-start" variant="outline" onClick={() => setActiveTab('documents')}>
                    <FileText className="w-4 h-4 mr-2" />
                    Upload Document
                  </Button>
                  <Button className="w-full justify-start" variant="outline" onClick={() => setActiveTab('calculator')}>
                    <Settings className="w-4 h-4 mr-2" />
                    Generate Quote
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="vehicles">
            <VehicleManagement />
          </TabsContent>

          <TabsContent value="quotes">
            <QuoteManagement />
          </TabsContent>

          <TabsContent value="leads">
            <LeadsDashboard />
          </TabsContent>

          <TabsContent value="orders">
            <OrderTracking />
          </TabsContent>

          <TabsContent value="payments">
            <AdvancedPayments />
          </TabsContent>

          <TabsContent value="mobile">
            <NativeFeaturesDemo />
          </TabsContent>

          <TabsContent value="users">
            <RoleManagement />
          </TabsContent>

          <TabsContent value="ai-photo">
            <AIPhotoStudio />
          </TabsContent>

          <TabsContent value="documents">
            <DocumentManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
