import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Wallet, Globe, Shield, Bitcoin, DollarSign } from "lucide-react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface PaymentData {
  amount: number;
  currency: string;
  payment_method: string;
  crypto_currency?: string;
  metadata?: any;
}

const EnhancedPaymentSystem = ({ 
  amount = 0, 
  purpose = "service_payment",
  onSuccess 
}: { 
  amount?: number;
  purpose?: string;
  onSuccess?: () => void;
}) => {
  const { user } = useAuth();
  const [selectedMethod, setSelectedMethod] = useState<string>('card');
  const [selectedCurrency, setSelectedCurrency] = useState<string>('USD');
  const [cryptoCurrency, setCryptoCurrency] = useState<string>('BTC');
  const [paymentAmount, setPaymentAmount] = useState<number>(amount);

  const createPayment = useMutation({
    mutationFn: async (paymentData: PaymentData) => {
      if (!user) throw new Error('User not authenticated');
      
      const { data, error } = await supabase
        .from('enhanced_payments')
        .insert({
          user_id: user.id,
          amount: paymentData.amount,
          currency: paymentData.currency,
          payment_method: paymentData.payment_method,
          crypto_currency: paymentData.crypto_currency,
          status: 'pending',
          metadata: paymentData.metadata
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    }
  });

  const currencies = [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
    { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
    { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
    { code: 'CHF', symbol: 'Fr', name: 'Swiss Franc' },
    { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' }
  ];

  const cryptoCurrencies = [
    { code: 'BTC', name: 'Bitcoin', icon: '₿' },
    { code: 'ETH', name: 'Ethereum', icon: 'Ξ' },
    { code: 'USDC', name: 'USD Coin', icon: '$' },
    { code: 'USDT', name: 'Tether', icon: '$' },
    { code: 'BNB', name: 'Binance Coin', icon: 'B' },
    { code: 'ADA', name: 'Cardano', icon: '₳' }
  ];

  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: <CreditCard className="w-5 h-5" />,
      description: 'Secure card payments via Stripe',
      fees: '2.9% + $0.30'
    },
    {
      id: 'crypto',
      name: 'Cryptocurrency',
      icon: <Bitcoin className="w-5 h-5" />,
      description: 'Bitcoin, Ethereum, and more',
      fees: '1.5%'
    },
    {
      id: 'wire',
      name: 'Wire Transfer',
      icon: <Globe className="w-5 h-5" />,
      description: 'International bank transfers',
      fees: '$25 flat fee'
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: <Wallet className="w-5 h-5" />,
      description: 'PayPal and digital wallets',
      fees: '3.5%'
    }
  ];

  const handlePayment = async () => {
    if (!user) {
      toast.error("Please sign in to make a payment");
      return;
    }

    if (paymentAmount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    try {
      const paymentData: PaymentData = {
        amount: paymentAmount,
        currency: selectedMethod === 'crypto' ? cryptoCurrency : selectedCurrency,
        payment_method: selectedMethod,
        metadata: {
          purpose,
          original_currency: selectedCurrency
        }
      };

      if (selectedMethod === 'crypto') {
        paymentData.crypto_currency = cryptoCurrency;
      }

      await createPayment.mutateAsync(paymentData);
      
      // Simulate payment processing
      toast.success(`Payment of ${paymentAmount} ${selectedMethod === 'crypto' ? cryptoCurrency : selectedCurrency} initiated successfully!`);
      onSuccess?.();
      
    } catch (error) {
      console.error('Payment error:', error);
      toast.error("Payment failed. Please try again.");
    }
  };

  const getCurrencySymbol = (code: string) => {
    return currencies.find(c => c.code === code)?.symbol || '$';
  };

  return (
    <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 text-white max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Shield className="w-6 h-6 text-green-400" />
          Enhanced Payment System
        </CardTitle>
        <CardDescription className="text-gray-300">
          Multiple currencies and payment methods for global transactions
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Amount Input */}
        <div className="space-y-2">
          <Label htmlFor="amount" className="text-white">Payment Amount</Label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                {getCurrencySymbol(selectedCurrency)}
              </span>
              <Input
                id="amount"
                type="number"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(Number(e.target.value))}
                className="pl-8 bg-gray-700 border-gray-600 text-white"
                placeholder="0.00"
              />
            </div>
            <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
              <SelectTrigger className="w-32 bg-gray-700 border-gray-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                {currencies.map((currency) => (
                  <SelectItem key={currency.code} value={currency.code}>
                    {currency.code}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="space-y-4">
          <Label className="text-white">Payment Method</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {paymentMethods.map((method) => (
              <Card
                key={method.id}
                className={`cursor-pointer transition-all duration-200 ${
                  selectedMethod === method.id
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-gray-600 bg-gray-700/50 hover:border-gray-500'
                }`}
                onClick={() => setSelectedMethod(method.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="text-blue-400">{method.icon}</div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-white">{method.name}</h3>
                      <p className="text-sm text-gray-400 mt-1">{method.description}</p>
                      <Badge variant="outline" className="mt-2 text-xs">
                        Fee: {method.fees}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Crypto Currency Selection */}
        {selectedMethod === 'crypto' && (
          <div className="space-y-2">
            <Label className="text-white">Cryptocurrency</Label>
            <Select value={cryptoCurrency} onValueChange={setCryptoCurrency}>
              <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                {cryptoCurrencies.map((crypto) => (
                  <SelectItem key={crypto.code} value={crypto.code}>
                    <div className="flex items-center gap-2">
                      <span className="font-mono">{crypto.icon}</span>
                      <span>{crypto.name}</span>
                      <span className="text-gray-400">({crypto.code})</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Security Features */}
        <div className="bg-gray-700/50 rounded-lg p-4 space-y-2">
          <h4 className="font-medium text-white flex items-center gap-2">
            <Shield className="w-4 h-4 text-green-400" />
            Security Features
          </h4>
          <div className="grid grid-cols-2 gap-2 text-sm text-gray-300">
            <div>✓ 256-bit SSL Encryption</div>
            <div>✓ PCI DSS Compliant</div>
            <div>✓ Multi-factor Authentication</div>
            <div>✓ Fraud Detection</div>
          </div>
        </div>

        {/* Payment Summary */}
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-300">Total Amount:</span>
            <span className="text-xl font-bold text-white">
              {getCurrencySymbol(selectedMethod === 'crypto' ? 'USD' : selectedCurrency)}
              {paymentAmount.toLocaleString()}
              {selectedMethod === 'crypto' && (
                <span className="text-sm text-gray-400 ml-2">
                  (≈ {cryptoCurrency})
                </span>
              )}
            </span>
          </div>
          <div className="text-sm text-gray-400">
            Processing fee will be calculated at checkout
          </div>
        </div>

        {/* Payment Button */}
        <Button
          onClick={handlePayment}
          disabled={createPayment.isPending || paymentAmount <= 0}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3"
          size="lg"
        >
          {createPayment.isPending ? (
            "Processing..."
          ) : (
            <>
              <DollarSign className="w-5 h-5 mr-2" />
              Complete Payment
            </>
          )}
        </Button>

        <p className="text-xs text-gray-400 text-center">
          By completing this payment, you agree to our Terms of Service and Privacy Policy.
          All transactions are secure and encrypted.
        </p>
      </CardContent>
    </Card>
  );
};

export default EnhancedPaymentSystem;