
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreditCard, Calculator, DollarSign, X, TrendingUp } from 'lucide-react';

interface FinancingOptionsProps {
  isOpen: boolean;
  onClose: () => void;
}

const FinancingOptions: React.FC<FinancingOptionsProps> = ({ isOpen, onClose }) => {
  const [loanAmount, setLoanAmount] = useState('');
  const [downPayment, setDownPayment] = useState('');
  const [loanTerm, setLoanTerm] = useState('60');
  const [creditScore, setCreditScore] = useState('excellent');
  const [calculation, setCalculation] = useState<any>(null);

  const calculateFinancing = () => {
    const principal = parseFloat(loanAmount) - parseFloat(downPayment || '0');
    const term = parseInt(loanTerm);
    
    // Interest rates based on credit score
    const rates = {
      excellent: 0.045, // 4.5%
      good: 0.065,      // 6.5%
      fair: 0.085,      // 8.5%
      poor: 0.125       // 12.5%
    };
    
    const rate = rates[creditScore as keyof typeof rates];
    const monthlyRate = rate / 12;
    const numPayments = term;
    
    const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                          (Math.pow(1 + monthlyRate, numPayments) - 1);
    
    const totalPayment = monthlyPayment * numPayments;
    const totalInterest = totalPayment - principal;
    
    setCalculation({
      monthlyPayment: monthlyPayment.toFixed(2),
      totalPayment: totalPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      interestRate: (rate * 100).toFixed(1),
      principal: principal.toFixed(2)
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-3">
              <CreditCard className="w-6 h-6 text-black" />
              <h2 className="text-2xl font-light text-black">Financing Options</h2>
            </div>
            <Button onClick={onClose} variant="ghost" className="text-black hover:bg-gray-100">
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Financing Calculator */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Loan Calculator</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Price (USD)</label>
                    <Input
                      type="number"
                      placeholder="e.g., 75000"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(e.target.value)}
                      className="border-gray-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Down Payment (USD)</label>
                    <Input
                      type="number"
                      placeholder="e.g., 15000"
                      value={downPayment}
                      onChange={(e) => setDownPayment(e.target.value)}
                      className="border-gray-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Loan Term (Months)</label>
                    <select
                      value={loanTerm}
                      onChange={(e) => setLoanTerm(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-md focus:border-black focus:outline-none"
                    >
                      <option value="36">36 months (3 years)</option>
                      <option value="48">48 months (4 years)</option>
                      <option value="60">60 months (5 years)</option>
                      <option value="72">72 months (6 years)</option>
                      <option value="84">84 months (7 years)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Credit Score Range</label>
                    <select
                      value={creditScore}
                      onChange={(e) => setCreditScore(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-md focus:border-black focus:outline-none"
                    >
                      <option value="excellent">Excellent (750+)</option>
                      <option value="good">Good (700-749)</option>
                      <option value="fair">Fair (650-699)</option>
                      <option value="poor">Poor (Below 650)</option>
                    </select>
                  </div>

                  <Button
                    onClick={calculateFinancing}
                    className="w-full bg-black text-white hover:bg-gray-800"
                    disabled={!loanAmount}
                  >
                    <Calculator className="w-4 h-4 mr-2" />
                    Calculate Payment
                  </Button>
                </div>
              </div>

              {/* Financing Partners */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Our Financing Partners</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">TD</span>
                    </div>
                    <div>
                      <p className="font-medium">TD Auto Finance</p>
                      <p className="text-sm text-gray-600">Competitive rates from 4.5%</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">RBC</span>
                    </div>
                    <div>
                      <p className="font-medium">RBC Royal Bank</p>
                      <p className="text-sm text-gray-600">Flexible terms up to 84 months</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">BMO</span>
                    </div>
                    <div>
                      <p className="font-medium">BMO Harris Bank</p>
                      <p className="text-sm text-gray-600">Pre-approval in 24 hours</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Results & Options */}
            <div className="space-y-6">
              {calculation && (
                <div className="bg-gradient-to-br from-black to-gray-800 text-white p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <DollarSign className="w-5 h-5 mr-2" />
                    Payment Calculation
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Loan Amount:</span>
                      <span className="font-semibold">${parseFloat(calculation.principal).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Interest Rate:</span>
                      <span className="font-semibold">{calculation.interestRate}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Loan Term:</span>
                      <span className="font-semibold">{loanTerm} months</span>
                    </div>
                    <div className="border-t border-gray-600 pt-3">
                      <div className="flex justify-between items-center text-lg">
                        <span>Monthly Payment:</span>
                        <span className="font-bold">${parseFloat(calculation.monthlyPayment).toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-300">
                      <p>Total Interest: ${parseFloat(calculation.totalInterest).toLocaleString()}</p>
                      <p>Total Amount: ${parseFloat(calculation.totalPayment).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Financing Options */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Available Financing Options</h3>
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                      <h4 className="font-medium">Traditional Auto Loan</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">Standard financing with competitive rates</p>
                    <ul className="text-xs text-gray-500 space-y-1">
                      <li>• Rates starting from 4.5% APR</li>
                      <li>• Terms up to 84 months</li>
                      <li>• No prepayment penalties</li>
                    </ul>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <CreditCard className="w-5 h-5 text-blue-600" />
                      <h4 className="font-medium">Lease-to-Own Program</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">Lower monthly payments with buyout option</p>
                    <ul className="text-xs text-gray-500 space-y-1">
                      <li>• Lower monthly payments</li>
                      <li>• Option to purchase at lease end</li>
                      <li>• Flexible terms</li>
                    </ul>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <DollarSign className="w-5 h-5 text-purple-600" />
                      <h4 className="font-medium">International Financing</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">Special programs for international buyers</p>
                    <ul className="text-xs text-gray-500 space-y-1">
                      <li>• Multi-currency options</li>
                      <li>• Flexible documentation</li>
                      <li>• Export-friendly terms</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Button 
                onClick={() => {
                  const message = `Financing Inquiry:
Vehicle Price: $${loanAmount}
Down Payment: $${downPayment || '0'}
Preferred Term: ${loanTerm} months
Credit Score: ${creditScore}
${calculation ? `Estimated Payment: $${calculation.monthlyPayment}/month` : ''}

I would like to discuss financing options for a luxury vehicle purchase. Please contact me with available programs and requirements.`;
                  const whatsappUrl = `https://wa.me/15185077243?text=${encodeURIComponent(message)}`;
                  window.open(whatsappUrl, '_blank');
                }}
                className="w-full bg-green-600 text-white hover:bg-green-700"
              >
                Apply for Financing
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancingOptions;
