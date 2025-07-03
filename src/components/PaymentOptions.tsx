
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreditCard, Smartphone, Building, Globe, X } from 'lucide-react';

interface PaymentOptionsProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  currency: string;
  itemDescription: string;
}

const PaymentOptions: React.FC<PaymentOptionsProps> = ({ 
  isOpen, 
  onClose, 
  amount, 
  currency, 
  itemDescription 
}) => {
  const [selectedPayment, setSelectedPayment] = useState<string>('');
  const [paymentPlan, setPaymentPlan] = useState<'full' | 'deposit' | 'installment'>('deposit');
  const [customDeposit, setCustomDeposit] = useState<number>(0);

  const paymentMethods = [
    {
      id: 'paypal',
      name: 'PayPal',
      icon: '💙',
      description: 'Secure worldwide payments',
      currencies: ['USD', 'CAD', 'EUR', 'GBP', 'JPY', 'AUD']
    },
    {
      id: 'applepay',
      name: 'Apple Pay',
      icon: '🍎',
      description: 'Quick & secure for iOS users',
      currencies: ['USD', 'CAD', 'EUR', 'GBP']
    },
    {
      id: 'googlepay',
      name: 'Google Pay',
      icon: '📱',
      description: 'Fast payments with Google',
      currencies: ['USD', 'CAD', 'EUR', 'GBP']
    },
    {
      id: 'banktransfer',
      name: 'Wire Transfer',
      icon: '🏦',
      description: 'Direct bank transfer',
      currencies: ['USD', 'CAD', 'EUR', 'GBP', 'JPY', 'AUD']
    },
    {
      id: 'crypto',
      name: 'Cryptocurrency',
      icon: '₿',
      description: 'Bitcoin, Ethereum, USDC',
      currencies: ['BTC', 'ETH', 'USDC', 'USDT']
    },
    {
      id: 'westernunion',
      name: 'Western Union',
      icon: '💰',
      description: 'Global money transfer',
      currencies: ['USD', 'CAD', 'EUR', 'GBP', 'XOF', 'NGN']
    }
  ];

  const currencies = [
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'GBP', name: 'British Pound', symbol: '£' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
    { code: 'XOF', name: 'West African CFA', symbol: 'CFA' },
    { code: 'NGN', name: 'Nigerian Naira', symbol: '₦' }
  ];

  const getPaymentAmount = () => {
    switch (paymentPlan) {
      case 'full':
        return amount;
      case 'deposit':
        return customDeposit || (amount * 0.2); // 20% default deposit
      case 'installment':
        return amount / 12; // Monthly installments
      default:
        return amount;
    }
  };

  const handlePaymentSelect = (methodId: string) => {
    const paymentAmount = getPaymentAmount();
    const currencySymbol = currencies.find(c => c.code === currency)?.symbol || '$';
    
    let paymentUrl = '';
    let message = '';

    switch (methodId) {
      case 'paypal':
        message = `I want to make a payment via PayPal:
        
Item: ${itemDescription}
Amount: ${currencySymbol}${paymentAmount.toLocaleString()} ${currency}
Payment Type: ${paymentPlan}

Please send me PayPal payment instructions.`;
        break;
        
      case 'banktransfer':
        message = `I want to make a wire transfer payment:
        
Item: ${itemDescription}
Amount: ${currencySymbol}${paymentAmount.toLocaleString()} ${currency}
Payment Type: ${paymentPlan}

Please provide your banking details for wire transfer.`;
        break;
        
      case 'crypto':
        message = `I want to pay with cryptocurrency:
        
Item: ${itemDescription}
Amount: ${currencySymbol}${paymentAmount.toLocaleString()} ${currency}
Payment Type: ${paymentPlan}

Please provide your cryptocurrency wallet addresses (BTC, ETH, USDC).`;
        break;
        
      case 'westernunion':
        message = `I want to pay via Western Union:
        
Item: ${itemDescription}
Amount: ${currencySymbol}${paymentAmount.toLocaleString()} ${currency}
Payment Type: ${paymentPlan}

Please provide Western Union recipient details.`;
        break;
        
      default:
        message = `I want to make a payment via ${paymentMethods.find(m => m.id === methodId)?.name}:
        
Item: ${itemDescription}
Amount: ${currencySymbol}${paymentAmount.toLocaleString()} ${currency}
Payment Type: ${paymentPlan}

Please provide payment instructions.`;
    }

    const whatsappUrl = `https://wa.me/15185077243?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-3">
              <CreditCard className="w-6 h-6 text-black" />
              <h2 className="text-2xl font-light text-black">Payment Options</h2>
            </div>
            <Button onClick={onClose} variant="ghost" className="text-black hover:bg-gray-100">
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Payment Plan Selection */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-black mb-4">Payment Plan</h3>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3 cursor-pointer p-3 border rounded-lg hover:bg-gray-50">
                    <input
                      type="radio"
                      name="paymentPlan"
                      value="deposit"
                      checked={paymentPlan === 'deposit'}
                      onChange={(e) => setPaymentPlan(e.target.value as any)}
                    />
                    <div className="flex-1">
                      <div className="font-medium">Deposit Payment</div>
                      <div className="text-sm text-gray-600">Secure your vehicle with a deposit</div>
                    </div>
                  </label>
                  
                  {paymentPlan === 'deposit' && (
                    <div className="ml-6 space-y-2">
                      <div className="flex items-center space-x-2">
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name="depositType"
                            onChange={() => setCustomDeposit(amount * 0.1)}
                          />
                          <span className="text-sm">10% ({currencies.find(c => c.code === currency)?.symbol}{(amount * 0.1).toLocaleString()})</span>
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name="depositType"
                            onChange={() => setCustomDeposit(amount * 0.2)}
                            defaultChecked
                          />
                          <span className="text-sm">20% ({currencies.find(c => c.code === currency)?.symbol}{(amount * 0.2).toLocaleString()})</span>
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name="depositType"
                            onChange={() => setCustomDeposit(amount * 0.5)}
                          />
                          <span className="text-sm">50% ({currencies.find(c => c.code === currency)?.symbol}{(amount * 0.5).toLocaleString()})</span>
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Input
                          type="number"
                          placeholder="Custom amount"
                          value={customDeposit || ''}
                          onChange={(e) => setCustomDeposit(Number(e.target.value))}
                          className="w-32 text-sm"
                        />
                        <span className="text-sm text-gray-600">Custom deposit</span>
                      </div>
                    </div>
                  )}

                  <label className="flex items-center space-x-3 cursor-pointer p-3 border rounded-lg hover:bg-gray-50">
                    <input
                      type="radio"
                      name="paymentPlan"
                      value="full"
                      checked={paymentPlan === 'full'}
                      onChange={(e) => setPaymentPlan(e.target.value as any)}
                    />
                    <div className="flex-1">
                      <div className="font-medium">Full Payment</div>
                      <div className="text-sm text-gray-600">Pay the complete amount upfront</div>
                    </div>
                  </label>

                  <label className="flex items-center space-x-3 cursor-pointer p-3 border rounded-lg hover:bg-gray-50">
                    <input
                      type="radio"
                      name="paymentPlan"
                      value="installment"
                      checked={paymentPlan === 'installment'}
                      onChange={(e) => setPaymentPlan(e.target.value as any)}
                    />
                    <div className="flex-1">
                      <div className="font-medium">Monthly Installments</div>
                      <div className="text-sm text-gray-600">12 monthly payments of {currencies.find(c => c.code === currency)?.symbol}{(amount / 12).toLocaleString()}</div>
                    </div>
                  </label>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-black mb-2">Payment Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Item:</span>
                    <span>{itemDescription}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Value:</span>
                    <span>{currencies.find(c => c.code === currency)?.symbol}{amount.toLocaleString()} {currency}</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span>Amount Due:</span>
                    <span>{currencies.find(c => c.code === currency)?.symbol}{getPaymentAmount().toLocaleString()} {currency}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-black mb-4">Choose Payment Method</h3>
              <div className="grid gap-3">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => handlePaymentSelect(method.id)}
                    className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors text-left"
                  >
                    <div className="text-2xl">{method.icon}</div>
                    <div className="flex-1">
                      <div className="font-medium text-black">{method.name}</div>
                      <div className="text-sm text-gray-600">{method.description}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        Supports: {method.currencies.join(', ')}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              
              <div className="text-xs text-gray-500 mt-4">
                <p>* All payments are processed securely</p>
                <p>* International payments accepted worldwide</p>
                <p>* Contact us for custom payment arrangements</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentOptions;
