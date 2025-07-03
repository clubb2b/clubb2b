import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, Filter, Eye, Phone, Mail, Plus, Calendar, TrendingUp } from 'lucide-react';
import { useLeads, useAddLead, Lead } from '@/hooks/useLeads';
import { format } from 'date-fns';
import { toast } from 'sonner';

const LeadManagement = () => {
  const { data: leads, isLoading } = useLeads();
  const addLead = useAddLead();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddingLead, setIsAddingLead] = useState(false);

  const [newLead, setNewLead] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    company: '',
    country: '',
    vehicle_interest: '',
    budget_range: '',
    timeline: '',
    source: 'website',
    notes: ''
  });

  const filteredLeads = leads?.filter(lead => {
    const matchesSearch = !searchTerm || 
      lead.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lead.company && lead.company.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  }) || [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'contacted':
        return 'bg-yellow-100 text-yellow-800';
      case 'qualified':
        return 'bg-green-100 text-green-800';
      case 'proposal':
        return 'bg-purple-100 text-purple-800';
      case 'converted':
        return 'bg-green-100 text-green-800';
      case 'lost':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddLead = async () => {
    try {
      await addLead.mutateAsync({
        ...newLead,
        status: 'new',
        assigned_to: null,
        conversion_probability: null,
        interest_type: null,
        last_contact_date: null,
        next_follow_up: null
      });
      toast.success('Lead added successfully!');
      setIsAddingLead(false);
      setNewLead({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        company: '',
        country: '',
        vehicle_interest: '',
        budget_range: '',
        timeline: '',
        source: 'website',
        notes: ''
      });
    } catch (error) {
      console.error('Error adding lead:', error);
      toast.error('Failed to add lead. Please try again.');
    }
  };

  const handleViewLead = (lead: Lead) => {
    const details = `
Lead Details:
Name: ${lead.first_name} ${lead.last_name}
Email: ${lead.email}
Phone: ${lead.phone || 'N/A'}
Company: ${lead.company || 'N/A'}
Country: ${lead.country || 'N/A'}

Interest Details:
Vehicle Interest: ${lead.vehicle_interest || 'N/A'}
Budget Range: ${lead.budget_range || 'N/A'}
Timeline: ${lead.timeline || 'N/A'}
Interest Type: ${lead.interest_type || 'N/A'}

Lead Information:
Status: ${lead.status || 'new'}
Source: ${lead.source || 'N/A'}
Conversion Probability: ${lead.conversion_probability || 'N/A'}%
Created: ${format(new Date(lead.created_at), 'MMM dd, yyyy')}
Last Contact: ${lead.last_contact_date ? format(new Date(lead.last_contact_date), 'MMM dd, yyyy') : 'Never'}
Next Follow-up: ${lead.next_follow_up ? format(new Date(lead.next_follow_up), 'MMM dd, yyyy') : 'Not scheduled'}

Notes: ${lead.notes || 'None'}
    `;
    alert(details);
  };

  const handleContactLead = (lead: Lead) => {
    const subject = `Club B2B Performance - Vehicle Export Inquiry`;
    const body = `Hello ${lead.first_name},

Thank you for your interest in our luxury vehicle export services.

${lead.vehicle_interest ? `We see you're interested in: ${lead.vehicle_interest}` : ''}
${lead.budget_range ? `Budget range: ${lead.budget_range}` : ''}

I'd love to discuss your requirements and provide you with a personalized quote.

Best regards,
Club B2B Performance Team`;

    const mailtoUrl = `mailto:${lead.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoUrl);
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
          <h1 className="text-3xl font-bold">Lead Management</h1>
          <p className="text-gray-600">Track and manage potential customers</p>
        </div>
        <Dialog open={isAddingLead} onOpenChange={setIsAddingLead}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Lead
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Lead</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">First Name *</label>
                <Input
                  value={newLead.first_name}
                  onChange={(e) => setNewLead({ ...newLead, first_name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Last Name *</label>
                <Input
                  value={newLead.last_name}
                  onChange={(e) => setNewLead({ ...newLead, last_name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Email *</label>
                <Input
                  type="email"
                  value={newLead.email}
                  onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Phone</label>
                <Input
                  value={newLead.phone}
                  onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Company</label>
                <Input
                  value={newLead.company}
                  onChange={(e) => setNewLead({ ...newLead, company: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Country</label>
                <Input
                  value={newLead.country}
                  onChange={(e) => setNewLead({ ...newLead, country: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Vehicle Interest</label>
                <Input
                  value={newLead.vehicle_interest}
                  onChange={(e) => setNewLead({ ...newLead, vehicle_interest: e.target.value })}
                  placeholder="e.g., BMW X7, Luxury SUV"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Budget Range</label>
                <Select value={newLead.budget_range} onValueChange={(value) => setNewLead({ ...newLead, budget_range: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select budget" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under_50k">Under $50K</SelectItem>
                    <SelectItem value="50k_100k">$50K - $100K</SelectItem>
                    <SelectItem value="100k_200k">$100K - $200K</SelectItem>
                    <SelectItem value="200k_plus">$200K+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Timeline</label>
                <Select value={newLead.timeline} onValueChange={(value) => setNewLead({ ...newLead, timeline: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select timeline" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediate">Immediate</SelectItem>
                    <SelectItem value="1_month">Within 1 Month</SelectItem>
                    <SelectItem value="3_months">Within 3 Months</SelectItem>
                    <SelectItem value="6_months">Within 6 Months</SelectItem>
                    <SelectItem value="exploring">Just Exploring</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Source</label>
                <Select value={newLead.source} onValueChange={(value) => setNewLead({ ...newLead, source: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="website">Website</SelectItem>
                    <SelectItem value="referral">Referral</SelectItem>
                    <SelectItem value="social_media">Social Media</SelectItem>
                    <SelectItem value="google_ads">Google Ads</SelectItem>
                    <SelectItem value="trade_show">Trade Show</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium mb-1 block">Notes</label>
                <Textarea
                  value={newLead.notes}
                  onChange={(e) => setNewLead({ ...newLead, notes: e.target.value })}
                  rows={3}
                  placeholder="Additional notes about this lead..."
                />
              </div>
            </div>
            <div className="flex gap-2 pt-4">
              <Button onClick={handleAddLead} disabled={addLead.isPending} className="flex-1">
                {addLead.isPending ? 'Adding...' : 'Add Lead'}
              </Button>
              <Button variant="outline" onClick={() => setIsAddingLead(false)}>
                Cancel
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search by name, email, or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="contacted">Contacted</SelectItem>
            <SelectItem value="qualified">Qualified</SelectItem>
            <SelectItem value="proposal">Proposal</SelectItem>
            <SelectItem value="converted">Converted</SelectItem>
            <SelectItem value="lost">Lost</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Results Summary */}
      <div className="text-sm text-gray-600">
        Showing {filteredLeads.length} of {leads?.length || 0} leads
      </div>

      {/* Leads Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredLeads.map((lead) => (
          <Card key={lead.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  {lead.first_name} {lead.last_name}
                </span>
                <Badge className={getStatusColor(lead.status || 'new')}>
                  {lead.status || 'new'}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <span>{lead.email}</span>
                </div>
                {lead.phone && (
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span>{lead.phone}</span>
                  </div>
                )}
                {lead.company && (
                  <div className="text-sm">
                    <span className="text-gray-500">Company:</span> {lead.company}
                  </div>
                )}
                {lead.country && (
                  <div className="text-sm">
                    <span className="text-gray-500">Country:</span> {lead.country}
                  </div>
                )}
              </div>

              {(lead.vehicle_interest || lead.budget_range) && (
                <div className="grid grid-cols-1 gap-2 text-sm">
                  {lead.vehicle_interest && (
                    <div>
                      <span className="text-gray-500">Interest:</span> {lead.vehicle_interest}
                    </div>
                  )}
                  {lead.budget_range && (
                    <div>
                      <span className="text-gray-500">Budget:</span> {lead.budget_range.replace('_', ' ')}
                    </div>
                  )}
                </div>
              )}

              <div className="text-sm text-gray-600">
                <Calendar className="w-4 h-4 inline mr-1" />
                Created: {format(new Date(lead.created_at), 'MMM dd, yyyy')}
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" onClick={() => handleViewLead(lead)}>
                  <Eye className="w-4 h-4 mr-2" />
                  View
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleContactLead(lead)}>
                  <Mail className="w-4 h-4 mr-2" />
                  Contact
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredLeads.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <TrendingUp className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No leads found</h3>
            <p className="text-gray-500">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your search or filters.' 
                : 'Leads will appear here when customers inquire about your services.'}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LeadManagement;