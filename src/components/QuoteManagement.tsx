import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Eye, DollarSign, Calendar, User } from 'lucide-react';
import { useQuotes, Quote } from '@/hooks/useQuotes';
import { format } from 'date-fns';

const QuoteManagement = () => {
  const { data: quotes, isLoading } = useQuotes();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredQuotes = quotes?.filter(quote => {
    const matchesSearch = !searchTerm || 
      quote.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.customer_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.quote_number.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || quote.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  }) || [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'expired':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const handleViewQuote = (quote: Quote) => {
    const details = `
Quote Details:
Quote #: ${quote.quote_number}
Customer: ${quote.customer_name}
Email: ${quote.customer_email}
Vehicle Type: ${quote.vehicle_type || 'N/A'}
Vehicle Value: ${quote.currency || 'USD'} ${quote.vehicle_value?.toLocaleString() || 'N/A'}
From: ${quote.from_country || 'N/A'}
To: ${quote.to_country}
Shipping Method: ${quote.shipping_method}

Cost Breakdown:
- Shipping: ${quote.currency || 'USD'} ${quote.shipping_cost?.toLocaleString() || 'N/A'}
- Customs & Duties: ${quote.currency || 'USD'} ${quote.customs_duties?.toLocaleString() || 'N/A'}
- Insurance: ${quote.currency || 'USD'} ${quote.insurance_cost?.toLocaleString() || 'N/A'}
- Documentation: ${quote.currency || 'USD'} ${quote.documentation_fee?.toLocaleString() || 'N/A'}
- Inspection: ${quote.currency || 'USD'} ${quote.inspection_cost?.toLocaleString() || 'N/A'}

TOTAL: ${quote.currency || 'USD'} ${quote.total_cost.toLocaleString()}
Timeline: ${quote.estimated_timeline || 'N/A'}
Status: ${quote.status || 'pending'}
Valid Until: ${quote.valid_until ? format(new Date(quote.valid_until), 'MMM dd, yyyy') : 'N/A'}

Notes: ${quote.notes || 'None'}
    `;
    alert(details);
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
          <h1 className="text-3xl font-bold">Quote Management</h1>
          <p className="text-gray-600">Manage shipping quotes and customer requests</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search by customer name, email, or quote number..."
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
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
            <SelectItem value="expired">Expired</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Results Summary */}
      <div className="text-sm text-gray-600">
        Showing {filteredQuotes.length} of {quotes?.length || 0} quotes
      </div>

      {/* Quotes Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredQuotes.map((quote) => (
          <Card key={quote.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  {quote.quote_number}
                </span>
                <Badge className={getStatusColor(quote.status || 'pending')}>
                  {quote.status || 'pending'}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="font-medium">{quote.customer_name}</p>
                  <p className="text-sm text-gray-600">{quote.customer_email}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Route:</span>
                  <p className="font-medium">{quote.from_country || 'Canada'} → {quote.to_country}</p>
                </div>
                <div>
                  <span className="text-gray-500">Method:</span>
                  <p className="font-medium capitalize">{quote.shipping_method}</p>
                </div>
                <div>
                  <span className="text-gray-500">Vehicle Value:</span>
                  <p className="font-medium">{quote.currency || 'USD'} {quote.vehicle_value?.toLocaleString() || 'N/A'}</p>
                </div>
                <div>
                  <span className="text-gray-500">Total Cost:</span>
                  <p className="font-bold text-lg">{quote.currency || 'USD'} {quote.total_cost.toLocaleString()}</p>
                </div>
              </div>

              {quote.estimated_timeline && (
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span>Timeline: {quote.estimated_timeline}</span>
                </div>
              )}

              {quote.valid_until && (
                <div className="text-sm text-gray-600">
                  Valid until: {format(new Date(quote.valid_until), 'MMM dd, yyyy')}
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" onClick={() => handleViewQuote(quote)} className="flex-1">
                  <Eye className="w-4 h-4 mr-2" />
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredQuotes.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <DollarSign className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No quotes found</h3>
            <p className="text-gray-500">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your search or filters.' 
                : 'Quotes will appear here when customers request them.'}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default QuoteManagement;