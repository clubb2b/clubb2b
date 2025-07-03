
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Calendar, Calculator, FileText, CreditCard, MessageCircle, TrendingUp } from 'lucide-react';
import AppointmentBooking from './AppointmentBooking';
import VehicleInspectionReport from './VehicleInspectionReport';
import FinancingOptions from './FinancingOptions';
import { useLanguage } from '@/contexts/LanguageContext';

const AdvancedFeatures = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const { t } = useLanguage();

  const features = [
    {
      id: 'appointment',
      title: t('buttons.book_appointment'),
      description: 'Schedule consultations with our experts',
      icon: <Calendar className="w-6 h-6" />,
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      id: 'calculator',
      title: t('buttons.calculate_price'),
      description: 'Get instant export cost estimates',
      icon: <Calculator className="w-6 h-6" />,
      color: 'bg-green-600 hover:bg-green-700'
    },
    {
      id: 'inspection',
      title: t('buttons.inspection_report'),
      description: 'Professional vehicle inspection reports',
      icon: <FileText className="w-6 h-6" />,
      color: 'bg-purple-600 hover:bg-purple-700'
    },
    {
      id: 'financing',
      title: t('buttons.financing'),
      description: 'Flexible payment solutions',
      icon: <CreditCard className="w-6 h-6" />,
      color: 'bg-orange-600 hover:bg-orange-700'
    }
  ];

  const scrollToCalculator = () => {
    const calculatorElement = document.getElementById('price-calculator');
    if (calculatorElement) {
      calculatorElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light mb-6 text-white tracking-wider">
              Advanced Services
            </h2>
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-white to-transparent mx-auto mb-8"></div>
            <p className="text-xl text-gray-300 font-light max-w-3xl mx-auto">
              Experience next-generation automotive services with AI-powered assistance and seamless digital solutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {features.map((feature) => (
              <div key={feature.id} className="bg-gradient-to-b from-gray-800 to-gray-900 p-6 rounded-lg border border-gray-700 hover:border-white transition-all duration-300 group">
                <div className="text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${feature.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <div className="text-white">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{feature.description}</p>
                  <Button
                    onClick={() => {
                      if (feature.id === 'calculator') {
                        scrollToCalculator();
                      } else {
                        setActiveModal(feature.id);
                      }
                    }}
                    className={`w-full ${feature.color} text-white font-light tracking-wider transition-all duration-300`}
                  >
                    Open {feature.title}
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Features */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-900 to-blue-800 p-6 rounded-lg text-white">
              <MessageCircle className="w-8 h-8 mb-4" />
              <h3 className="text-xl font-semibold mb-2">AI Chat Assistant</h3>
              <p className="text-blue-200 mb-4">24/7 multilingual support with instant responses</p>
              <div className="text-sm text-blue-300">
                <p>• Available in English, French, Spanish</p>
                <p>• Instant pricing and availability</p>
                <p>• Smart appointment scheduling</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-900 to-green-800 p-6 rounded-lg text-white">
              <TrendingUp className="w-8 h-8 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{t('financing.title')}</h3>
              <p className="text-green-200 mb-4">{t('financing.desc')}</p>
              <div className="text-sm text-green-300">
                <p>• Multiple financing partners</p>
                <p>• International buyers welcome</p>
                <p>• Quick pre-approval process</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-900 to-purple-800 p-6 rounded-lg text-white">
              <FileText className="w-8 h-8 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Digital Documentation</h3>
              <p className="text-purple-200 mb-4">Complete paperless export process with real-time tracking</p>
              <div className="text-sm text-purple-300">
                <p>• Electronic signatures</p>
                <p>• Real-time status updates</p>
                <p>• Secure document storage</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modals */}
      <AppointmentBooking 
        isOpen={activeModal === 'appointment'} 
        onClose={() => setActiveModal(null)} 
      />
      <VehicleInspectionReport 
        isOpen={activeModal === 'inspection'} 
        onClose={() => setActiveModal(null)} 
      />
      <FinancingOptions 
        isOpen={activeModal === 'financing'} 
        onClose={() => setActiveModal(null)} 
      />
    </>
  );
};

export default AdvancedFeatures;
