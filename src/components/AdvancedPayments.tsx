import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, DollarSign, Clock, CheckCircle, AlertCircle, RefreshCw, FileText, Calendar } from 'lucide-react';
import { toast } from 'sonner';

interface Payment {
  id: string;
  amount: number;
  currency: string;
  method: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  date: string;
  orderId: string;
  customerName: string;
  transactionId?: string;
  type: 'payment' | 'refund' | 'installment';
}

interface InstallmentPlan {
  id: string;
  orderId: string;
  totalAmount: number;
  currency: string;
  installments: {
    number: number;
    amount: number;
    dueDate: string;
    status: 'pending' | 'paid' | 'overdue';
    paidDate?: string;
  }[];
}

const AdvancedPayments = () => {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);

  // Mock data - replace with real data from hooks
  const mockPayments: Payment[] = [
    {
      id: '1',
      amount: 5000,
      currency: 'USD',
      method: 'credit_card',
      status: 'completed',
      date: '2024-01-15',
      orderId: 'CB2B-2024-001234',
      customerName: 'John Smith',
      transactionId: 'txn_123456789',
      type: 'payment'
    },
    {
      id: '2',
      amount: 15000,
      currency: 'USD',
      method: 'bank_transfer',
      status: 'pending',
      date: '2024-01-16',
      orderId: 'CB2B-2024-001235',
      customerName: 'Sarah Johnson',
      type: 'payment'
    },
    {
      id: '3',
      amount: 2500,
      currency: 'USD',
      method: 'stripe',
      status: 'failed',
      date: '2024-01-16',
      orderId: 'CB2B-2024-001236',
      customerName: 'Mike Davis',
      type: 'payment'
    }
  ];

  const mockInstallmentPlans: InstallmentPlan[] = [
    {
      id: '1',
      orderId: 'CB2B-2024-001237',
      totalAmount: 75000,
      currency: 'USD',
      installments: [
        { number: 1, amount: 25000, dueDate: '2024-01-20', status: 'paid', paidDate: '2024-01-18' },
        { number: 2, amount: 25000, dueDate: '2024-02-20', status: 'pending' },
        { number: 3, amount: 25000, dueDate: '2024-03-20', status: 'pending' },
      ]
    },
    {
      id: '2',
      orderId: 'CB2B-2024-001238',
      totalAmount: 120000,
      currency: 'USD',
      installments: [
        { number: 1, amount: 30000, dueDate: '2024-01-15', status: 'paid', paidDate: '2024-01-14' },
        { number: 2, amount: 30000, dueDate: '2024-02-15', status: 'overdue' },
        { number: 3, amount: 30000, dueDate: '2024-03-15', status: 'pending' },
        { number: 4, amount: 30000, dueDate: '2024-04-15', status: 'pending' },
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      case 'refunded':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
      case 'paid':
        return <CheckCircle className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'failed':
      case 'overdue':
        return <AlertCircle className="w-4 h-4" />;
      case 'refunded':
        return <RefreshCw className="w-4 h-4" />;
      default:
        return <DollarSign className="w-4 h-4" />;
    }
  };

  const handleProcessRefund = (payment: Payment) => {
    toast.success(`Refund initiated for ${payment.currency} ${payment.amount.toLocaleString()}`);
  };

  const handleRetryPayment = (payment: Payment) => {
    toast.success(`Payment retry initiated for ${payment.orderId}`);
  };

  const handleSendReminder = (installment: any, plan: InstallmentPlan) => {
    const message = `Payment Reminder

Dear Customer,

This is a friendly reminder that your installment payment is due:

Order: ${plan.orderId}
Installment #${installment.number}
Amount: ${plan.currency} ${installment.amount.toLocaleString()}
Due Date: ${new Date(installment.dueDate).toLocaleDateString()}

Please make your payment at your earliest convenience to avoid any service interruptions.

Payment options:
- Online: [Your payment portal URL]
- Wire Transfer: [Bank details]
- Credit Card: [Payment link]

If you have any questions, please contact our finance team.

Best regards,
Club B2B Performance Finance Team`;

    const mailtoUrl = `mailto:customer@example.com?subject=Payment Reminder - ${plan.orderId}&body=${encodeURIComponent(message)}`;
    window.open(mailtoUrl);
    toast.success('Payment reminder sent');
  };

  const handleGenerateInvoice = (payment: Payment) => {
    // Simulate invoice generation
    toast.success(`Invoice generated for ${payment.orderId}`);
  };

  const totalRevenue = mockPayments.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.amount, 0);
  const pendingPayments = mockPayments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0);
  const failedPayments = mockPayments.filter(p => p.status === 'failed').length;

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Advanced Payments</h1>
          <p className="text-gray-600">Comprehensive payment management and processing</p>
        </div>
      </div>

      {/* Payment Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-green-600">
                  ${totalRevenue.toLocaleString()}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Payments</p>
                <p className="text-2xl font-bold text-yellow-600">
                  ${pendingPayments.toLocaleString()}
                </p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Failed Payments</p>
                <p className="text-2xl font-bold text-red-600">{failedPayments}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Payment History</TabsTrigger>
          <TabsTrigger value="installments">Installment Plans</TabsTrigger>
          <TabsTrigger value="gateways">Payment Gateways</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            {mockPayments.map((payment) => (
              <Card key={payment.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-full ${getStatusColor(payment.status)}`}>
                        {getStatusIcon(payment.status)}
                      </div>
                      <div>
                        <p className="font-semibold">{payment.orderId}</p>
                        <p className="text-sm text-gray-600">{payment.customerName}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(payment.date).toLocaleDateString()} • {payment.method.replace('_', ' ')}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold">
                        {payment.currency} {payment.amount.toLocaleString()}
                      </p>
                      <Badge className={getStatusColor(payment.status)}>
                        {payment.status}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-4 pt-4 border-t">
                    {payment.status === 'failed' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRetryPayment(payment)}
                      >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Retry Payment
                      </Button>
                    )}
                    {payment.status === 'completed' && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleProcessRefund(payment)}
                        >
                          Process Refund
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleGenerateInvoice(payment)}
                        >
                          <FileText className="w-4 h-4 mr-2" />
                          Generate Invoice
                        </Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="installments" className="space-y-6">
          <div className="space-y-6">
            {mockInstallmentPlans.map((plan) => (
              <Card key={plan.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Order: {plan.orderId}</span>
                    <span className="text-lg">
                      Total: {plan.currency} {plan.totalAmount.toLocaleString()}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {plan.installments.map((installment) => (
                    <div key={installment.number} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className={`p-2 rounded-full ${getStatusColor(installment.status)}`}>
                          {getStatusIcon(installment.status)}
                        </div>
                        <div>
                          <p className="font-medium">Installment #{installment.number}</p>
                          <p className="text-sm text-gray-600">
                            Due: {new Date(installment.dueDate).toLocaleDateString()}
                          </p>
                          {installment.paidDate && (
                            <p className="text-sm text-green-600">
                              Paid: {new Date(installment.paidDate).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold">
                          {plan.currency} {installment.amount.toLocaleString()}
                        </p>
                        <Badge className={getStatusColor(installment.status)}>
                          {installment.status}
                        </Badge>
                      </div>
                      {(installment.status === 'pending' || installment.status === 'overdue') && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleSendReminder(installment, plan)}
                          className="ml-4"
                        >
                          <Calendar className="w-4 h-4 mr-2" />
                          Send Reminder
                        </Button>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="gateways" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Stripe Integration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Status:</span>
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Processing Fee:</span>
                  <span>2.9% + $0.30</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Settlement:</span>
                  <span>2 business days</span>
                </div>
                <Button className="w-full">Configure Stripe</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  PayPal Integration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Status:</span>
                  <Badge className="bg-yellow-100 text-yellow-800">Pending Setup</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Processing Fee:</span>
                  <span>3.49% + $0.49</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Settlement:</span>
                  <span>1 business day</span>
                </div>
                <Button variant="outline" className="w-full">Setup PayPal</Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Payment Gateway Features</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">Supported Payment Methods</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Credit/Debit Cards (Visa, Mastercard, Amex)</li>
                    <li>• PayPal & Digital Wallets</li>
                    <li>• Bank Transfers (ACH/Wire)</li>
                    <li>• Cryptocurrency (Bitcoin, Ethereum)</li>
                    <li>• International Payment Methods</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">Security Features</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• PCI DSS Compliance</li>
                    <li>• 3D Secure Authentication</li>
                    <li>• Fraud Detection & Prevention</li>
                    <li>• End-to-End Encryption</li>
                    <li>• Real-time Transaction Monitoring</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment Analytics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Total Transactions:</span>
                    <span className="font-semibold">{mockPayments.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Success Rate:</span>
                    <span className="font-semibold text-green-600">
                      {Math.round((mockPayments.filter(p => p.status === 'completed').length / mockPayments.length) * 100)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Average Transaction:</span>
                    <span className="font-semibold">
                      ${Math.round(mockPayments.reduce((sum, p) => sum + p.amount, 0) / mockPayments.length).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Failed Transactions:</span>
                    <span className="font-semibold text-red-600">{failedPayments}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Export Reports</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">
                  Generate detailed payment reports for accounting and analysis
                </p>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="w-4 h-4 mr-2" />
                    Export Transaction History
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="w-4 h-4 mr-2" />
                    Export Installment Report
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="w-4 h-4 mr-2" />
                    Export Revenue Report
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="w-4 h-4 mr-2" />
                    Export Tax Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedPayments;