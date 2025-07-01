
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle, AlertCircle, XCircle, FileText, X } from 'lucide-react';

interface VehicleInspectionReportProps {
  isOpen: boolean;
  onClose: () => void;
}

const VehicleInspectionReport: React.FC<VehicleInspectionReportProps> = ({ isOpen, onClose }) => {
  const [vinNumber, setVinNumber] = useState('');
  const [report, setReport] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const generateReport = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockReport = {
        vin: vinNumber,
        year: '2024',
        make: 'Range Rover',
        model: 'Sport',
        mileage: '15,432',
        inspectionDate: new Date().toLocaleDateString(),
        overallCondition: 'Excellent',
        score: 95,
        sections: {
          exterior: { status: 'excellent', score: 98, issues: [] },
          interior: { status: 'excellent', score: 96, issues: ['Minor wear on driver seat'] },
          engine: { status: 'excellent', score: 100, issues: [] },
          transmission: { status: 'good', score: 90, issues: ['Minor fluid change needed'] },
          brakes: { status: 'excellent', score: 95, issues: [] },
          suspension: { status: 'excellent', score: 100, issues: [] },
          electrical: { status: 'good', score: 88, issues: ['One parking sensor requires calibration'] },
          tires: { status: 'excellent', score: 92, issues: ['Front tires 70% tread remaining'] }
        },
        recommendations: [
          'Schedule transmission fluid change within 3 months',
          'Calibrate parking sensor for optimal performance',
          'Continue regular maintenance schedule'
        ],
        marketValue: '$78,500 - $85,000',
        exportReadiness: 'Ready for Export',
        certifications: [
          'Transport Canada Safety Standard',
          'Pre-Export Inspection Certificate',
          'Emissions Test Certificate'
        ]
      };
      
      setReport(mockReport);
      setIsLoading(false);
    }, 2000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'good':
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      case 'poor':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <CheckCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'text-green-600';
      case 'good':
        return 'text-yellow-600';
      case 'poor':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-3">
              <FileText className="w-6 h-6 text-black" />
              <h2 className="text-2xl font-light text-black">Vehicle Inspection Report</h2>
            </div>
            <Button onClick={onClose} variant="ghost" className="text-black hover:bg-gray-100">
              <X className="w-5 h-5" />
            </Button>
          </div>

          {!report && (
            <div className="text-center py-8">
              <div className="max-w-md mx-auto">
                <h3 className="text-lg font-medium mb-4">Get Professional Vehicle Inspection</h3>
                <p className="text-gray-600 mb-6">Enter your VIN number to generate a comprehensive inspection report</p>
                
                <div className="space-y-4">
                  <Input
                    placeholder="Enter VIN Number (17 characters)"
                    value={vinNumber}
                    onChange={(e) => setVinNumber(e.target.value.toUpperCase())}
                    maxLength={17}
                    className="border-gray-300 text-center tracking-wider"
                  />
                  
                  <Button
                    onClick={generateReport}
                    disabled={vinNumber.length !== 17 || isLoading}
                    className="w-full bg-black text-white hover:bg-gray-800"
                  >
                    {isLoading ? 'Generating Report...' : 'Generate Inspection Report'}
                  </Button>
                </div>

                <div className="mt-8 bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Our Inspection Includes:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Complete exterior and interior assessment</li>
                    <li>• Engine and transmission diagnostics</li>
                    <li>• Brake and suspension inspection</li>
                    <li>• Electrical system check</li>
                    <li>• Export readiness certification</li>
                    <li>• Market value assessment</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {report && (
            <div className="space-y-6">
              {/* Header Info */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Vehicle Information</h3>
                    <div className="space-y-2">
                      <p><span className="font-medium">VIN:</span> {report.vin}</p>
                      <p><span className="font-medium">Vehicle:</span> {report.year} {report.make} {report.model}</p>
                      <p><span className="font-medium">Mileage:</span> {report.mileage} km</p>
                      <p><span className="font-medium">Inspection Date:</span> {report.inspectionDate}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Overall Assessment</h3>
                    <div className="space-y-2">
                      <p><span className="font-medium">Condition:</span> <span className="text-green-600">{report.overallCondition}</span></p>
                      <p><span className="font-medium">Score:</span> {report.score}/100</p>
                      <p><span className="font-medium">Market Value:</span> {report.marketValue}</p>
                      <p><span className="font-medium">Export Status:</span> <span className="text-green-600">{report.exportReadiness}</span></p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Inspection Details */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Detailed Inspection Results</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {Object.entries(report.sections).map(([section, data]: [string, any]) => (
                    <div key={section} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(data.status)}
                          <span className="font-medium capitalize">{section.replace('_', ' ')}</span>
                        </div>
                        <span className="text-sm font-medium">{data.score}/100</span>
                      </div>
                      <div className={`text-sm font-medium capitalize mb-2 ${getStatusColor(data.status)}`}>
                        {data.status}
                      </div>
                      {data.issues.length > 0 && (
                        <div className="text-xs text-gray-600">
                          <p className="font-medium">Notes:</p>
                          <ul className="list-disc list-inside">
                            {data.issues.map((issue: string, index: number) => (
                              <li key={index}>{issue}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
                  Recommendations
                </h3>
                <ul className="space-y-1">
                  {report.recommendations.map((rec: string, index: number) => (
                    <li key={index} className="text-sm">• {rec}</li>
                  ))}
                </ul>
              </div>

              {/* Certifications */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  Certifications Included
                </h3>
                <ul className="space-y-1">
                  {report.certifications.map((cert: string, index: number) => (
                    <li key={index} className="text-sm">✓ {cert}</li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <Button 
                  onClick={() => {
                    const message = `Vehicle Inspection Report Request:
VIN: ${report.vin}
Vehicle: ${report.year} ${report.make} ${report.model}

I would like to request a professional inspection report for export purposes. Please provide details on scheduling and pricing.`;
                    const whatsappUrl = `https://wa.me/15185077243?text=${encodeURIComponent(message)}`;
                    window.open(whatsappUrl, '_blank');
                  }}
                  className="bg-black text-white hover:bg-gray-800"
                >
                  Request Professional Inspection
                </Button>
                <Button 
                  onClick={() => window.print()}
                  variant="outline"
                  className="border-gray-300"
                >
                  Print Report
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VehicleInspectionReport;
