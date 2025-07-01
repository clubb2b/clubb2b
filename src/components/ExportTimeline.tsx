
import React from 'react';
import { CheckCircle, Clock, Ship, FileText, Truck, Plane } from 'lucide-react';

const ExportTimeline = () => {
  const timelineSteps = [
    {
      id: 1,
      title: "Initial Consultation",
      description: "Vehicle selection, requirements assessment, and quote preparation",
      duration: "1-2 days",
      icon: <FileText className="w-5 h-5" />,
      status: "completed"
    },
    {
      id: 2,
      title: "Documentation & Legal",
      description: "Export permits, ownership transfer, customs documentation",
      duration: "3-5 days",
      icon: <FileText className="w-5 h-5" />,
      status: "in-progress"
    },
    {
      id: 3,
      title: "Vehicle Preparation",
      description: "Inspection, cleaning, pre-export modifications if needed",
      duration: "2-3 days",
      icon: <CheckCircle className="w-5 h-5" />,
      status: "pending"
    },
    {
      id: 4,
      title: "Transport to Port",
      description: "Secure transport from our facility to departure port",
      duration: "1-2 days",
      icon: <Truck className="w-5 h-5" />,
      status: "pending"
    },
    {
      id: 5,
      title: "Customs Clearance",
      description: "Export customs processing and final documentation",
      duration: "1-3 days",
      icon: <FileText className="w-5 h-5" />,
      status: "pending"
    },
    {
      id: 6,
      title: "International Shipping",
      description: "Ocean freight or air cargo to destination country",
      duration: "7-35 days",
      icon: <Ship className="w-5 h-5" />,
      status: "pending"
    },
    {
      id: 7,
      title: "Destination Customs",
      description: "Import clearance and duty payment in destination country",
      duration: "3-7 days",
      icon: <FileText className="w-5 h-5" />,
      status: "pending"
    },
    {
      id: 8,
      title: "Final Delivery",
      description: "Local transport to your specified address",
      duration: "1-3 days",
      icon: <Truck className="w-5 h-5" />,
      status: "pending"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 border-green-500 text-green-700';
      case 'in-progress':
        return 'bg-blue-100 border-blue-500 text-blue-700';
      case 'pending':
        return 'bg-gray-100 border-gray-300 text-gray-600';
      default:
        return 'bg-gray-100 border-gray-300 text-gray-600';
    }
  };

  const getIconColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600';
      case 'in-progress':
        return 'text-blue-600';
      case 'pending':
        return 'text-gray-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light mb-6 text-black tracking-wider">
            Export Process Timeline
          </h2>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-black to-transparent mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 font-light max-w-3xl mx-auto">
            Our streamlined export process ensures your luxury vehicle reaches its destination safely and efficiently
          </p>
        </div>

        {/* Timeline Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="text-center p-6 bg-white rounded-lg shadow-lg border border-gray-200">
            <Ship className="w-8 h-8 mx-auto mb-3 text-blue-600" />
            <h3 className="text-2xl font-bold text-black">21-35 Days</h3>
            <p className="text-gray-600">Maritime Shipping</p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-lg border border-gray-200">
            <Plane className="w-8 h-8 mx-auto mb-3 text-green-600" />
            <h3 className="text-2xl font-bold text-black">7-14 Days</h3>
            <p className="text-gray-600">Air Freight</p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-lg border border-gray-200">
            <CheckCircle className="w-8 h-8 mx-auto mb-3 text-purple-600" />
            <h3 className="text-2xl font-bold text-black">99.8%</h3>
            <p className="text-gray-600">Success Rate</p>
          </div>
        </div>

        {/* Timeline Steps */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300"></div>
          
          <div className="space-y-8">
            {timelineSteps.map((step, index) => (
              <div key={step.id} className="relative flex items-start">
                {/* Timeline Node */}
                <div className={`relative z-10 flex items-center justify-center w-16 h-16 rounded-full border-4 ${getStatusColor(step.status)}`}>
                  <div className={getIconColor(step.status)}>
                    {step.icon}
                  </div>
                </div>
                
                {/* Content */}
                <div className="ml-8 flex-1">
                  <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-semibold text-black">
                        Step {step.id}: {step.title}
                      </h3>
                      <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                        {step.duration}
                      </span>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                    
                    {/* Status Badge */}
                    <div className="mt-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium capitalize ${
                        step.status === 'completed' ? 'bg-green-100 text-green-800' :
                        step.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {step.status === 'completed' && <CheckCircle className="w-3 h-3 mr-1" />}
                        {step.status === 'in-progress' && <Clock className="w-3 h-3 mr-1" />}
                        {step.status.replace('-', ' ')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-16 bg-black text-white p-8 rounded-lg">
          <h3 className="text-2xl font-light mb-6 text-center">Key Success Factors</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold mb-3">Legal Compliance</h4>
              <ul className="space-y-2 text-gray-300">
                <li>• All Canadian export regulations followed</li>
                <li>• Destination country import requirements met</li>
                <li>• Complete documentation package</li>
                <li>• Insurance coverage throughout transit</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Quality Assurance</h4>
              <ul className="space-y-2 text-gray-300">
                <li>• Professional vehicle preparation</li>
                <li>• Secure transport and handling</li>
                <li>• Real-time tracking and updates</li>
                <li>• Dedicated customer support</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExportTimeline;
