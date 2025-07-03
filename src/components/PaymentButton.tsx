
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { CreditCard } from 'lucide-react';
import PaymentOptions from './PaymentOptions';

interface PaymentButtonProps {
  amount: number;
  currency?: string;
  itemDescription: string;
  className?: string;
  children?: React.ReactNode;
}

const PaymentButton: React.FC<PaymentButtonProps> = ({ 
  amount, 
  currency = 'USD', 
  itemDescription, 
  className = '',
  children 
}) => {
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsPaymentOpen(true)}
        className={`${className} flex items-center space-x-2`}
      >
        <CreditCard className="w-4 h-4" />
        <span>{children || 'Make Payment'}</span>
      </Button>

      <PaymentOptions
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        amount={amount}
        currency={currency}
        itemDescription={itemDescription}
      />
    </>
  );
};

export default PaymentButton;
