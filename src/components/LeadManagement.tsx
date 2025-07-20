import { useState } from "react";
import { useLeads, useAddLead, Lead } from "@/hooks/useLeads";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Phone, Mail, Building, MapPin, DollarSign, Clock, Star } from "lucide-react";
import { toast } from "sonner";

const LeadManagement = () => {
  const { data: leads, isLoading } = useLeads();
  const addLead = useAddLead();
  const [isAddingLead, setIsAddingLead] = useState(false);
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
          Add New Lead
        </Button>
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
        <div className="grid gap-6">
          {leads.map((lead: Lead) => (
            <Card key={lead.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {lead.first_name} {lead.last_name}
                      <Badge className={getStatusColor(lead.status || "new")}>
                        {lead.status || "new"}
                      </Badge>
                    </CardTitle>
                    <CardDescription className="flex items-center gap-4 mt-2">
                      {lead.company && (
                        <span className="flex items-center gap-1">
                          <Building className="h-4 w-4" />
                          {lead.company}
                        </span>
                      )}
                      {lead.country && (
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {lead.country}
                        </span>
                      )}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className={`flex items-center gap-1 ${getPriorityColor(lead.conversion_probability || 0)}`}>
                      <Star className="h-4 w-4" />
                      {lead.conversion_probability || 0}% probability
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {new Date(lead.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{lead.email}</span>
                  </div>
                  {lead.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{lead.phone}</span>
                    </div>
                  )}
                  {lead.budget_range && (
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{lead.budget_range.replace(/_/g, ' ')}</span>
                    </div>
                  )}
                  {lead.timeline && (
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{lead.timeline.replace(/_/g, ' ')}</span>
                    </div>
                  )}
                </div>
                
                {(lead.interest_type || lead.vehicle_interest) && (
                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Interest Details</h4>
                    <div className="flex gap-2 flex-wrap">
                      {lead.interest_type && (
                        <Badge variant="secondary">{lead.interest_type.replace(/_/g, ' ')}</Badge>
                      )}
                      {lead.vehicle_interest && (
                        <Badge variant="outline">{lead.vehicle_interest}</Badge>
                      )}
                    </div>
                  </div>
                )}

                {lead.notes && (
                  <div>
                    <h4 className="font-medium mb-2">Notes</h4>
                    <p className="text-sm text-muted-foreground">{lead.notes}</p>
                  </div>
                )}

                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm">
                    Contact
                  </Button>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    Convert
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default LeadManagement;