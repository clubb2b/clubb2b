
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { FileText, Upload, Download, Eye, CheckCircle, Clock, X } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const DocumentManagement = () => {
  const { toast } = useToast();
  const [documents] = useState([
    {
      id: '1',
      file_name: 'Vehicle Export Permit - BMW X5.pdf',
      document_type: 'export_permit',
      status: 'approved',
      created_at: '2024-01-15',
      customer_name: 'John Doe',
      order_number: 'CB2B-2024-001234'
    },
    {
      id: '2',
      file_name: 'Insurance Certificate - Mercedes C63.pdf',
      document_type: 'insurance',
      status: 'pending',
      created_at: '2024-01-14',
      customer_name: 'Jane Smith',
      order_number: 'CB2B-2024-001235'
    },
    {
      id: '3',
      file_name: 'Bill of Lading - Audi RS7.pdf',
      document_type: 'shipping',
      status: 'signed',
      created_at: '2024-01-13',
      customer_name: 'Mike Johnson',
      order_number: 'CB2B-2024-001236'
    }
  ]);

  const [uploadData, setUploadData] = useState({
    document_type: '',
    customer_email: '',
    order_number: ''
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
      case 'signed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'rejected':
        return <X className="w-4 h-4 text-red-600" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
      case 'signed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Simulate file upload
      toast({ title: `${file.name} uploaded successfully!` });
    }
  };

  const handleDownload = (fileName: string) => {
    toast({ title: `Downloading ${fileName}...` });
  };

  const handleView = (fileName: string) => {
    toast({ title: `Opening ${fileName}...` });
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Document Management</h1>
      
      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Upload Document
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <Label htmlFor="document_type">Document Type</Label>
              <Select value={uploadData.document_type} onValueChange={(value) => setUploadData({ ...uploadData, document_type: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="contract">Contract</SelectItem>
                  <SelectItem value="invoice">Invoice</SelectItem>
                  <SelectItem value="export_permit">Export Permit</SelectItem>
                  <SelectItem value="insurance">Insurance</SelectItem>
                  <SelectItem value="customs">Customs Declaration</SelectItem>
                  <SelectItem value="shipping">Shipping Documents</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="customer_email">Customer Email</Label>
              <Input
                id="customer_email"
                type="email"
                value={uploadData.customer_email}
                onChange={(e) => setUploadData({ ...uploadData, customer_email: e.target.value })}
                placeholder="customer@email.com"
              />
            </div>
            
            <div>
              <Label htmlFor="order_number">Order Number (Optional)</Label>
              <Input
                id="order_number"
                value={uploadData.order_number}
                onChange={(e) => setUploadData({ ...uploadData, order_number: e.target.value })}
                placeholder="CB2B-2024-001234"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="file_upload">Select File</Label>
              <Input
                id="file_upload"
                type="file"
                onChange={handleFileUpload}
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                className="cursor-pointer"
              />
              <p className="text-sm text-gray-500 mt-1">
                Supported formats: PDF, DOC, DOCX, JPG, PNG (Max 10MB)
              </p>
            </div>
            
            <Button className="w-full md:w-auto">
              <Upload className="w-4 h-4 mr-2" />
              Upload Document
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Documents List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {documents.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center gap-4">
                  <FileText className="w-8 h-8 text-blue-600" />
                  <div>
                    <p className="font-medium">{doc.file_name}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span className="capitalize">{doc.document_type.replace('_', ' ')}</span>
                      <span>•</span>
                      <span>{doc.customer_name}</span>
                      <span>•</span>
                      <span>{doc.order_number}</span>
                      <span>•</span>
                      <span>{new Date(doc.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Badge className={getStatusColor(doc.status)}>
                    <span className="flex items-center gap-1">
                      {getStatusIcon(doc.status)}
                      {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                    </span>
                  </Badge>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleView(doc.file_name)}>
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDownload(doc.file_name)}>
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentManagement;
