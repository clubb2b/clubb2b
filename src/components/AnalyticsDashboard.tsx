import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, DollarSign, Globe, Car, CreditCard, Activity, Target } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

const AnalyticsDashboard = () => {
  // Fetch analytics data
  const { data: analyticsData } = useQuery({
    queryKey: ['analytics-dashboard'],
    queryFn: async () => {
      const [
        vehiclesResult,
        ordersResult,
        customersResult,
        membershipsResult,
        eventsResult
      ] = await Promise.all([
        supabase.from('vehicles').select('*'),
        supabase.from('orders').select('*'),
        supabase.from('customers').select('*'),
        supabase.from('vip_memberships').select('*'),
        supabase.from('analytics_events').select('*').limit(1000)
      ]);

      return {
        vehicles: vehiclesResult.data || [],
        orders: ordersResult.data || [],
        customers: customersResult.data || [],
        memberships: membershipsResult.data || [],
        events: eventsResult.data || []
      };
    }
  });

  // Calculate metrics
  const totalRevenue = analyticsData?.orders.reduce((sum, order) => sum + (order.total_amount || 0), 0) || 0;
  const totalCustomers = analyticsData?.customers.length || 0;
  const totalVehicles = analyticsData?.vehicles.length || 0;
  const activeMembers = analyticsData?.memberships.filter(m => m.status === 'active').length || 0;

  // Sample data for charts
  const revenueData = [
    { month: 'Jan', revenue: 45000, orders: 12 },
    { month: 'Feb', revenue: 52000, orders: 15 },
    { month: 'Mar', revenue: 48000, orders: 13 },
    { month: 'Apr', revenue: 61000, orders: 18 },
    { month: 'May', revenue: 72000, orders: 22 },
    { month: 'Jun', revenue: 85000, orders: 28 }
  ];

  const membershipData = [
    { name: 'Basic', value: 45, color: '#8B5CF6' },
    { name: 'Premium', value: 25, color: '#3B82F6' },
    { name: 'VIP', value: 20, color: '#10B981' },
    { name: 'Ultra VIP', value: 7, color: '#F59E0B' },
    { name: 'Platinum', value: 3, color: '#EF4444' }
  ];

  const serviceData = [
    { service: 'Vehicle Sales', revenue: 450000, count: 45 },
    { service: 'Import/Export', revenue: 320000, count: 28 },
    { service: 'VIP Rentals', revenue: 180000, count: 62 },
    { service: 'Concierge', revenue: 95000, count: 34 }
  ];

  return (
    <div className="p-6 bg-gradient-to-b from-gray-900 to-black min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-light text-white mb-4 tracking-wider">
            BUSINESS INTELLIGENCE DASHBOARD
          </h1>
          <p className="text-gray-300 text-lg">
            Real-time insights into your luxury automotive empire
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-green-400">+12.5% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
              <Users className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCustomers.toLocaleString()}</div>
              <p className="text-xs text-blue-400">+8.2% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Vehicle Inventory</CardTitle>
              <Car className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalVehicles}</div>
              <p className="text-xs text-purple-400">+15 new arrivals</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">VIP Members</CardTitle>
              <Target className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeMembers}</div>
              <p className="text-xs text-yellow-400">+3 upgrades this week</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Trend */}
          <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Revenue Trend
              </CardTitle>
              <CardDescription className="text-gray-400">
                Monthly revenue and order count
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', color: '#F3F4F6' }}
                  />
                  <Line type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={2} />
                  <Line type="monotone" dataKey="orders" stroke="#10B981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Membership Distribution */}
          <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Membership Distribution
              </CardTitle>
              <CardDescription className="text-gray-400">
                VIP membership tier breakdown
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={membershipData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {membershipData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Service Performance */}
        <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Service Performance
            </CardTitle>
            <CardDescription className="text-gray-400">
              Revenue by service category
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={serviceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="service" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', color: '#F3F4F6' }}
                />
                <Bar dataKey="revenue" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-purple-900 to-purple-800 border-purple-600 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Global Reach
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Active Countries</span>
                  <Badge variant="secondary">45+</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Export Orders</span>
                  <Badge variant="secondary">1,247</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Import Partners</span>
                  <Badge variant="secondary">89</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-900 to-green-800 border-green-600 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Methods
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Credit Cards</span>
                  <Badge variant="secondary">67%</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Crypto Payments</span>
                  <Badge variant="secondary">23%</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Wire Transfers</span>
                  <Badge variant="secondary">10%</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900 to-blue-800 border-blue-600 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Growth Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Customer Retention</span>
                  <Badge variant="secondary">94%</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Avg Order Value</span>
                  <Badge variant="secondary">$47K</Badge>
                </div>
                <div className="flex justify-between">
                  <span>VIP Conversion</span>
                  <Badge variant="secondary">12%</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;