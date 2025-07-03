import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Users, Phone, Mail, DollarSign, Clock, MessageSquare, User, Edit, Trash2 } from 'lucide-react';
import { useLeads } from '@/hooks/useLeads';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { format } from 'date-fns';

const LeadsDashboard = () => {
  const { data: leads, isLoading, refetch } = useLeads();
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sourceFilter, setSourceFilter] = useState<string>('all');
  const [newNote, setNewNote] = useState('');
  const [editingLead, setEditingLead] = useState<any>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'contacted': return 'bg-yellow-100 text-yellow-800';
      case 'qualified': return 'bg-green-100 text-green-800';
      case 'proposal_sent': return 'bg-purple-100 text-purple-800';
      case 'converted': return 'bg-emerald-100 text-emerald-800';
      case 'lost': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const updateLeadStatus = async (leadId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('leads')
        .update({ 
          status: newStatus,
          last_contact_date: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('id', leadId);

      if (error) throw error;
      
      toast.success('Lead status updated successfully');
      refetch();
    } catch (error) {
      console.error('Error updating lead:', error);
      toast.error('Failed to update lead status');
    }
  };

  const addNote = async (leadId: string) => {
    if (!newNote.trim()) return;

    try {
      const { error } = await supabase
        .from('leads')
        .update({ 
          notes: newNote,
          last_contact_date: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('id', leadId);

      if (error) throw error;
      
      toast.success('Note added successfully');
      setNewNote('');
      refetch();
    } catch (error) {
      console.error('Error adding note:', error);
      toast.error('Failed to add note');
    }
  };

  const deleteLead = async (leadId: string) => {
    if (!confirm('Are you sure you want to delete this lead?')) return;

    try {
      const { error } = await supabase
        .from('leads')
        .delete()
        .eq('id', leadId);

      if (error) throw error;
      
      toast.success('Lead deleted successfully');
      setSelectedLead(null);
      refetch();
    } catch (error) {
      console.error('Error deleting lead:', error);
      toast.error('Failed to delete lead');
    }
  };

  const filteredLeads = leads?.filter(lead => {
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    const matchesSource = sourceFilter === 'all' || lead.source === sourceFilter;
    return matchesStatus && matchesSource;
  }) || [];

  const leadStats = {
    total: leads?.length || 0,
    new: leads?.filter(l => l.status === 'new').length || 0,
    qualified: leads?.filter(l => l.status === 'qualified').length || 0,
    converted: leads?.filter(l => l.status === 'converted').length || 0,
  };

  if (isLoading) {
    return <div className="p-6">Loading leads...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Lead Management</h1>
        <Badge variant="outline" className="text-sm">
          {leadStats.total} Total Leads
        </Badge>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600">Total Leads</p>
                <p className="text-2xl font-bold">{leadStats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-yellow-500" />
              <div>
                <p className="text-sm text-gray-600">New Leads</p>
                <p className="text-2xl font-bold">{leadStats.new}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm text-gray-600">Qualified</p>
                <p className="text-2xl font-bold">{leadStats.qualified}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-emerald-500" />
              <div>
                <p className="text-sm text-gray-600">Converted</p>
                <p className="text-2xl font-bold">{leadStats.converted}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="contacted">Contacted</SelectItem>
            <SelectItem value="qualified">Qualified</SelectItem>
            <SelectItem value="proposal_sent">Proposal Sent</SelectItem>
            <SelectItem value="converted">Converted</SelectItem>
            <SelectItem value="lost">Lost</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sourceFilter} onValueChange={setSourceFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by source" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sources</SelectItem>
            <SelectItem value="Price Calculator">Price Calculator</SelectItem>
            <SelectItem value="Contact Form">Contact Form</SelectItem>
            <SelectItem value="WhatsApp">WhatsApp</SelectItem>
            <SelectItem value="Website">Website</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Leads Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Leads</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredLeads.map((lead) => (
              <div key={lead.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold">{lead.first_name} {lead.last_name}</h3>
                      <Badge className={getStatusColor(lead.status)}>
                        {lead.status?.replace('_', ' ').toUpperCase()}
                      </Badge>
                      {lead.source && (
                        <Badge variant="outline">{lead.source}</Badge>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        {lead.email}
                      </div>
                      {lead.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          {lead.phone}
                        </div>
                      )}
                      {lead.vehicle_interest && (
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          {lead.vehicle_interest}
                        </div>
                      )}
                    </div>

                    {lead.budget_range && (
                      <p className="text-sm text-gray-600 mt-2">
                        <strong>Budget:</strong> {lead.budget_range}
                      </p>
                    )}

                    <p className="text-xs text-gray-500 mt-2">
                      Created: {format(new Date(lead.created_at), 'MMM dd, yyyy')}
                      {lead.last_contact_date && (
                        <span className="ml-4">
                          Last Contact: {format(new Date(lead.last_contact_date), 'MMM dd, yyyy')}
                        </span>
                      )}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedLead(lead)}
                        >
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Lead Details: {lead.first_name} {lead.last_name}</DialogTitle>
                        </DialogHeader>
                        
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label>Status</Label>
                              <Select 
                                value={lead.status} 
                                onValueChange={(value) => updateLeadStatus(lead.id, value)}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="new">New</SelectItem>
                                  <SelectItem value="contacted">Contacted</SelectItem>
                                  <SelectItem value="qualified">Qualified</SelectItem>
                                  <SelectItem value="proposal_sent">Proposal Sent</SelectItem>
                                  <SelectItem value="converted">Converted</SelectItem>
                                  <SelectItem value="lost">Lost</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div>
                              <Label>Budget Range</Label>
                              <p className="p-2 bg-gray-50 rounded">{lead.budget_range || 'Not specified'}</p>
                            </div>
                          </div>

                          {lead.notes && (
                            <div>
                              <Label>Current Notes</Label>
                              <p className="p-3 bg-gray-50 rounded whitespace-pre-wrap">{lead.notes}</p>
                            </div>
                          )}

                          <div>
                            <Label>Add Note</Label>
                            <Textarea
                              value={newNote}
                              onChange={(e) => setNewNote(e.target.value)}
                              placeholder="Add a note about this lead..."
                              className="mt-1"
                            />
                            <Button 
                              onClick={() => addNote(lead.id)}
                              className="mt-2"
                              disabled={!newNote.trim()}
                            >
                              Add Note
                            </Button>
                          </div>

                          <div className="flex gap-2 pt-4 border-t">
                            <Button 
                              onClick={() => window.open(`mailto:${lead.email}`, '_blank')}
                              className="flex-1"
                            >
                              <Mail className="w-4 h-4 mr-2" />
                              Email Lead
                            </Button>
                            {lead.phone && (
                              <Button 
                                onClick={() => window.open(`tel:${lead.phone}`, '_blank')}
                                variant="outline"
                                className="flex-1"
                              >
                                <Phone className="w-4 h-4 mr-2" />
                                Call Lead
                              </Button>
                            )}
                            <Button 
                              onClick={() => deleteLead(lead.id)}
                              variant="destructive"
                              size="sm"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
            ))}

            {filteredLeads.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No leads found matching your filters.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeadsDashboard;