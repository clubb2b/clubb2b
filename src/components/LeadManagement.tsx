import { useState } from "react";
import { useLeads, useAddLead, useUpdateLead, useDeleteLead, Lead } from "@/hooks/useLeads";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar, Phone, Mail, Building, MapPin, DollarSign, Clock, Star, Users, MessageSquare, Edit, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

const LeadManagement = () => {
  const { data: leads, isLoading } = useLeads();
  const addLead = useAddLead();
  const updateLead = useUpdateLead();
  const deleteLead = useDeleteLead();
  const [isAddingLead, setIsAddingLead] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sourceFilter, setSourceFilter] = useState<string>('all');
  const [newNote, setNewNote] = useState('');
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    company: "",
    country: "",
    interest_type: "",
    vehicle_interest: "",
    budget_range: "",
    timeline: "",
    source: "",
    notes: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addLead.mutateAsync({
        ...formData,
        status: "new",
        conversion_probability: 0,
        assigned_to: "",
        last_contact_date: null,
        next_follow_up: null
      });
      toast.success("Lead added successfully");
      setIsAddingLead(false);
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        company: "",
        country: "",
        interest_type: "",
        vehicle_interest: "",
        budget_range: "",
        timeline: "",
        source: "",
        notes: ""
      });
    } catch (error) {
      toast.error("Failed to add lead");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new": return "bg-blue-500";
      case "contacted": return "bg-yellow-500";
      case "qualified": return "bg-green-500";
      case "converted": return "bg-purple-500";
      case "lost": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getPriorityColor = (probability: number) => {
    if (probability >= 80) return "text-green-600";
    if (probability >= 50) return "text-yellow-600";
    if (probability >= 20) return "text-orange-600";
    return "text-red-600";
  };

  const updateLeadStatus = async (leadId: string, newStatus: string) => {
    try {
      await updateLead.mutateAsync({
        id: leadId,
        updates: {
          status: newStatus,
          last_contact_date: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      });
      toast.success('Lead status updated successfully');
    } catch (error) {
      toast.error('Failed to update lead status');
    }
  };

  const addNote = async (leadId: string) => {
    if (!newNote.trim()) return;
    
    try {
      const lead = leads?.find(l => l.id === leadId);
      const existingNotes = lead?.notes || '';
      const updatedNotes = existingNotes 
        ? `${existingNotes}\n\n[${format(new Date(), 'MMM dd, yyyy HH:mm')}] ${newNote}`
        : `[${format(new Date(), 'MMM dd, yyyy HH:mm')}] ${newNote}`;
        
      await updateLead.mutateAsync({
        id: leadId,
        updates: {
          notes: updatedNotes,
          last_contact_date: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      });
      
      toast.success('Note added successfully');
      setNewNote('');
    } catch (error) {
      toast.error('Failed to add note');
    }
  };

  const updateConversionProbability = async (leadId: string, probability: number) => {
    try {
      await updateLead.mutateAsync({
        id: leadId,
        updates: { conversion_probability: probability }
      });
      toast.success('Conversion probability updated');
    } catch (error) {
      toast.error('Failed to update probability');
    }
  };

  const handleDeleteLead = async (leadId: string) => {
    if (!confirm('Are you sure you want to delete this lead?')) return;
    
    try {
      await deleteLead.mutateAsync(leadId);
      toast.success('Lead deleted successfully');
      setSelectedLead(null);
    } catch (error) {
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

  if (isAddingLead) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Add New Lead</h2>
          <Button 
            variant="outline" 
            onClick={() => setIsAddingLead(false)}
          >
            Back to Leads
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Lead Information</CardTitle>
            <CardDescription>
              Enter the details for the new business lead
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="first_name">First Name *</Label>
                  <Input
                    id="first_name"
                    value={formData.first_name}
                    onChange={(e) => setFormData({...formData, first_name: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="last_name">Last Name *</Label>
                  <Input
                    id="last_name"
                    value={formData.last_name}
                    onChange={(e) => setFormData({...formData, last_name: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    value={formData.country}
                    onChange={(e) => setFormData({...formData, country: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="interest_type">Interest Type</Label>
                  <Select value={formData.interest_type} onValueChange={(value) => setFormData({...formData, interest_type: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select interest type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="import">Vehicle Import</SelectItem>
                      <SelectItem value="export">Vehicle Export</SelectItem>
                      <SelectItem value="purchase">Vehicle Purchase</SelectItem>
                      <SelectItem value="rental">Vehicle Rental</SelectItem>
                      <SelectItem value="vip_service">VIP Service</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="budget_range">Budget Range</Label>
                  <Select value={formData.budget_range} onValueChange={(value) => setFormData({...formData, budget_range: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under_25k">Under $25,000</SelectItem>
                      <SelectItem value="25k_50k">$25,000 - $50,000</SelectItem>
                      <SelectItem value="50k_100k">$50,000 - $100,000</SelectItem>
                      <SelectItem value="100k_250k">$100,000 - $250,000</SelectItem>
                      <SelectItem value="over_250k">Over $250,000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="timeline">Timeline</Label>
                  <Select value={formData.timeline} onValueChange={(value) => setFormData({...formData, timeline: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select timeline" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Immediate (1-30 days)</SelectItem>
                      <SelectItem value="short_term">Short term (1-3 months)</SelectItem>
                      <SelectItem value="medium_term">Medium term (3-6 months)</SelectItem>
                      <SelectItem value="long_term">Long term (6+ months)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="source">Lead Source</Label>
                  <Select value={formData.source} onValueChange={(value) => setFormData({...formData, source: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="website">Website</SelectItem>
                      <SelectItem value="referral">Referral</SelectItem>
                      <SelectItem value="social_media">Social Media</SelectItem>
                      <SelectItem value="trade_show">Trade Show</SelectItem>
                      <SelectItem value="phone_inquiry">Phone Inquiry</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="vehicle_interest">Vehicle Interest</Label>
                <Input
                  id="vehicle_interest"
                  value={formData.vehicle_interest}
                  onChange={(e) => setFormData({...formData, vehicle_interest: e.target.value})}
                  placeholder="e.g., Luxury SUV, Sports Car, Electric Vehicle"
                />
              </div>

              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  placeholder="Additional information about the lead"
                  rows={4}
                />
              </div>

              <div className="flex gap-4">
                <Button type="submit" disabled={addLead.isPending}>
                  {addLead.isPending ? "Adding Lead..." : "Add Lead"}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsAddingLead(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold">Lead Management</h2>
          <p className="text-muted-foreground">Manage and track your import/export business leads</p>
        </div>
        <Button onClick={() => setIsAddingLead(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add New Lead
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Total Leads</p>
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
                <p className="text-sm text-muted-foreground">New Leads</p>
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
                <p className="text-sm text-muted-foreground">Qualified</p>
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
                <p className="text-sm text-muted-foreground">Converted</p>
                <p className="text-2xl font-bold">{leadStats.converted}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="contacted">Contacted</SelectItem>
            <SelectItem value="qualified">Qualified</SelectItem>
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
            <SelectItem value="website">Website</SelectItem>
            <SelectItem value="referral">Referral</SelectItem>
            <SelectItem value="social_media">Social Media</SelectItem>
            <SelectItem value="trade_show">Trade Show</SelectItem>
            <SelectItem value="phone_inquiry">Phone Inquiry</SelectItem>
            <SelectItem value="email">Email</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="text-center py-8">Loading leads...</div>
      ) : !leads || leads.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8">
            <h3 className="text-lg font-medium mb-2">No leads yet</h3>
            <p className="text-muted-foreground mb-4">Start building your customer base by adding your first lead</p>
            <Button onClick={() => setIsAddingLead(true)}>
              Add Your First Lead
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredLeads.map((lead: Lead) => (
            <Card key={lead.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-semibold">{lead.first_name} {lead.last_name}</h3>
                      <Badge className={getStatusColor(lead.status || "new")}>
                        {(lead.status || "new").replace('_', ' ').toUpperCase()}
                      </Badge>
                      {lead.source && (
                        <Badge variant="outline">{lead.source}</Badge>
                      )}
                      <div className={`flex items-center gap-1 ${getPriorityColor(lead.conversion_probability || 0)}`}>
                        <Star className="h-4 w-4" />
                        {lead.conversion_probability || 0}%
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-4">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <span>{lead.email}</span>
                      </div>
                      {lead.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-muted-foreground" />
                          <span>{lead.phone}</span>
                        </div>
                      )}
                      {lead.company && (
                        <div className="flex items-center gap-2">
                          <Building className="w-4 h-4 text-muted-foreground" />
                          <span>{lead.company}</span>
                        </div>
                      )}
                    </div>

                    {(lead.interest_type || lead.budget_range || lead.timeline) && (
                      <div className="flex gap-2 flex-wrap mb-3">
                        {lead.interest_type && (
                          <Badge variant="secondary">{lead.interest_type.replace(/_/g, ' ')}</Badge>
                        )}
                        {lead.budget_range && (
                          <Badge variant="outline">Budget: {lead.budget_range.replace(/_/g, ' ')}</Badge>
                        )}
                        {lead.timeline && (
                          <Badge variant="outline">Timeline: {lead.timeline.replace(/_/g, ' ')}</Badge>
                        )}
                      </div>
                    )}

                    <p className="text-xs text-muted-foreground">
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
                                value={lead.status || "new"} 
                                onValueChange={(value) => updateLeadStatus(lead.id, value)}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="new">New</SelectItem>
                                  <SelectItem value="contacted">Contacted</SelectItem>
                                  <SelectItem value="qualified">Qualified</SelectItem>
                                  <SelectItem value="converted">Converted</SelectItem>
                                  <SelectItem value="lost">Lost</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div>
                              <Label>Conversion Probability (%)</Label>
                              <Input
                                type="number"
                                min="0"
                                max="100"
                                value={lead.conversion_probability || 0}
                                onChange={(e) => updateConversionProbability(lead.id, parseInt(e.target.value) || 0)}
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label>Budget Range</Label>
                              <p className="p-2 bg-muted rounded">{lead.budget_range?.replace(/_/g, ' ') || 'Not specified'}</p>
                            </div>
                            <div>
                              <Label>Timeline</Label>
                              <p className="p-2 bg-muted rounded">{lead.timeline?.replace(/_/g, ' ') || 'Not specified'}</p>
                            </div>
                          </div>

                          {lead.notes && (
                            <div>
                              <Label>Current Notes</Label>
                              <div className="p-3 bg-muted rounded whitespace-pre-wrap text-sm max-h-32 overflow-y-auto">
                                {lead.notes}
                              </div>
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
                              onClick={() => handleDeleteLead(lead.id)}
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
              </CardContent>
            </Card>
          ))}

          {filteredLeads.length === 0 && (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-muted-foreground">No leads found matching your filters.</p>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default LeadManagement;