
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Users, Phone, Mail, MessageSquare, Calendar, TrendingUp, UserPlus } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const CRMDashboard = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('leads');
  
  const [leads] = useState([
    {
      id: '1',
      first_name: 'Sarah',
      last_name: 'Johnson',
      email: 'sarah@email.com',
      phone: '+1-555-0123',
      country: 'Nigeria',
      interest_type: 'vehicle_purchase',
      vehicle_interest: '2024 BMW X7',
      budget_range: '$80,000 - $100,000',
      status: 'qualified',
      conversion_probability: 75,
      source: 'website',
      created_at: '2024-01-15'
    },
    {
      id: '2',
      first_name: 'Michael',
      last_name: 'Chen',
      email: 'michael@email.com',
      phone: '+1-555-0124',
      country: 'Ghana',
      interest_type: 'export_service',
      vehicle_interest: 'Mercedes GLE',
      budget_range: '$60,000 - $80,000',
      status: 'new',
      conversion_probability: 30,
      source: 'referral',
      created_at: '2024-01-14'
    }
  ]);

  const [customers] = useState([
    {
      id: '1',
      first_name: 'David',
      last_name: 'Williams',
      email: 'david@email.com',
      phone: '+1-555-0125',
      company: 'Williams Imports',
      country: 'Senegal',
      customer_type: 'business',
      status: 'vip',
      total_orders: 5,
      total_value: 250000,
      last_order: '2024-01-10'
    }
  ]);

  const [communications] = useState([
    {
      id: '1',
      customer_name: 'Sarah Johnson',
      type: 'whatsapp',
      subject: 'BMW X7 Inquiry Follow-up',
      content: 'Discussed financing options and shipping timeline',
      direction: 'outbound',
      status: 'completed',
      created_at: '2024-01-15'
    },
    {
      id: '2',
      customer_name: 'Michael Chen',
      type: 'email',
      subject: 'Quote Request Confirmation',
      content: 'Sent detailed quote for Mercedes GLE export to Ghana',
      direction: 'outbound',
      status: 'completed',
      created_at: '2024-01-14'
    }
  ]);

  const [newLead, setNewLead] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    country: '',
    interest_type: '',
    vehicle_interest: '',
    budget_range: '',
    source: 'website',
    notes: ''
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'contacted':
        return 'bg-yellow-100 text-yellow-800';
      case 'qualified':
        return 'bg-green-100 text-green-800';
      case 'converted':
        return 'bg-purple-100 text-purple-800';
      case 'lost':
        return 'bg-red-100 text-red-800';
      case 'vip':
        return 'bg-gold-100 text-gold-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddLead = () => {
    console.log('Adding lead:', newLead);
    toast({ title: "Lead added successfully!" });
    setNewLead({
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      country: '',
      interest_type: '',
      vehicle_interest: '',
      budget_range: '',
      source: 'website',
      notes: ''
    });
  };

  const stats = [
    { title: 'Total Leads', value: leads.length.toString(), icon: Users, color: 'text-blue-600' },
    { title: 'Active Customers', value: customers.length.toString(), icon: UserPlus, color: 'text-green-600' },
    { title: 'Conversion Rate', value: '67%', icon: TrendingUp, color: 'text-purple-600' },
    { title: 'This Month Revenue', value: '$125K', icon: TrendingUp, color: 'text-orange-600' }
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">CRM Dashboard</h1>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Tabs */}
      <div className="flex space-x-4 border-b">
        <Button
          variant={activeTab === 'leads' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('leads')}
        >
          Leads
        </Button>
        <Button
          variant={activeTab === 'customers' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('customers')}
        >
          Customers
        </Button>
        <Button
          variant={activeTab === 'communications' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('communications')}
        >
          Communications
        </Button>
        <Button
          variant={activeTab === 'add-lead' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('add-lead')}
        >
          Add Lead
        </Button>
      </div>
      
      {/* Leads Tab */}
      {activeTab === 'leads' && (
        <Card>
          <CardHeader>
            <CardTitle>Leads Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {leads.map((lead) => (
                <div key={lead.id} className="p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold">{lead.first_name} {lead.last_name}</h3>
                      <p className="text-sm text-gray-600">{lead.email} • {lead.phone}</p>
                    </div>
                    <Badge className={getStatusColor(lead.status)}>
                      {lead.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Interest</p>
                      <p>{lead.vehicle_interest}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Budget</p>
                      <p>{lead.budget_range}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Conversion</p>
                      <p>{lead.conversion_probability}%</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-3">
                    <Button variant="outline" size="sm">
                      <Phone className="w-4 h-4 mr-1" />
                      Call
                    </Button>
                    <Button variant="outline" size="sm">
                      <Mail className="w-4 h-4 mr-1" />
                      Email
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageSquare className="w-4 h-4 mr-1" />
                      WhatsApp
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Customers Tab */}
      {activeTab === 'customers' && (
        <Card>
          <CardHeader>
            <CardTitle>Customer Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {customers.map((customer) => (
                <div key={customer.id} className="p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold">{customer.first_name} {customer.last_name}</h3>
                      <p className="text-sm text-gray-600">{customer.email} • {customer.company}</p>
                    </div>
                    <Badge className={getStatusColor(customer.status)}>
                      {customer.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Country</p>
                      <p>{customer.country}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Total Orders</p>
                      <p>{customer.total_orders}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Total Value</p>
                      <p>${customer.total_value.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Last Order</p>
                      <p>{new Date(customer.last_order).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Communications Tab */}
      {activeTab === 'communications' && (
        <Card>
          <CardHeader>
            <CardTitle>Communication History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {communications.map((comm) => (
                <div key={comm.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold">{comm.subject}</h3>
                      <p className="text-sm text-gray-600">{comm.customer_name}</p>
                    </div>
                    <div className="text-right text-sm text-gray-500">
                      <p className="capitalize">{comm.type} • {comm.direction}</p>
                      <p>{new Date(comm.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <p className="text-sm">{comm.content}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Add Lead Tab */}
      {activeTab === 'add-lead' && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Lead</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="first_name">First Name</Label>
                <Input
                  id="first_name"
                  value={newLead.first_name}
                  onChange={(e) => setNewLead({ ...newLead, first_name: e.target.value })}
                />
              </div>
              
              <div>
                <Label htmlFor="last_name">Last Name</Label>
                <Input
                  id="last_name"
                  value={newLead.last_name}
                  onChange={(e) => setNewLead({ ...newLead, last_name: e.target.value })}
                />
              </div>
              
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newLead.email}
                  onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
                />
              </div>
              
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={newLead.phone}
                  onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
                />
              </div>
              
              <div>
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  value={newLead.country}
                  onChange={(e) => setNewLead({ ...newLead, country: e.target.value })}
                />
              </div>
              
              <div>
                <Label htmlFor="interest_type">Interest Type</Label>
                <Select value={newLead.interest_type} onValueChange={(value) => setNewLead({ ...newLead, interest_type: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select interest" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vehicle_purchase">Vehicle Purchase</SelectItem>
                    <SelectItem value="export_service">Export Service</SelectItem>
                    <SelectItem value="vip_rental">VIP Rental</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="vehicle_interest">Vehicle Interest</Label>
                <Input
                  id="vehicle_interest"
                  value={newLead.vehicle_interest}
                  onChange={(e) => setNewLead({ ...newLead, vehicle_interest: e.target.value })}
                />
              </div>
              
              <div>
                <Label htmlFor="budget_range">Budget Range</Label>
                <Input
                  id="budget_range"
                  value={newLead.budget_range}
                  onChange={(e) => setNewLead({ ...newLead, budget_range: e.target.value })}
                />
              </div>
              
              <div className="md:col-span-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={newLead.notes}
                  onChange={(e) => setNewLead({ ...newLead, notes: e.target.value })}
                  rows={3}
                />
              </div>
              
              <div className="md:col-span-2">
                <Button onClick={handleAddLead} className="w-full">
                  Add Lead
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CRMDashboard;
