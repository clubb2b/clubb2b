import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  CheckCircle, 
  Award, 
  Eye, 
  FileText, 
  Wrench,
  Camera,
  ClipboardCheck,
  Phone,
  Mail
} from 'lucide-react';
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

const QualityAssuranceService = () => {
  const handleContact = () => {
    const message = "I'm interested in your Quality Assurance and vehicle inspection services. Please provide more information.";
    const whatsappUrl = `https://wa.me/14389257679?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleEmailContact = () => {
    const subject = "Quality Assurance Service Inquiry";
    const body = "Hello,\n\nI'm interested in your Quality Assurance and comprehensive vehicle inspection services.\n\nPlease provide information about:\n- Inspection process and timeline\n- Types of inspections available\n- Certification and reporting\n- Pricing for different inspection levels\n- Pre-purchase inspection services\n\nThank you!";
    const mailtoUrl = `mailto:info@clubb2bperformance.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  };

  const inspectionTypes = [
    {
      icon: Eye,
      title: "Pre-Purchase Inspection",
      description: "Comprehensive evaluation before you buy",
      features: ["Complete vehicle assessment", "Market value analysis", "Hidden issue detection", "Investment protection"],
      duration: "2-3 hours",
      deliverables: "Detailed report with photos"
    },
    {
      icon: Wrench,
      title: "Mechanical Inspection",
      description: "In-depth technical and mechanical review",
      features: ["Engine diagnostics", "Transmission check", "Brake system analysis", "Suspension evaluation"],
      duration: "3-4 hours",
      deliverables: "Technical assessment report"
    },
    {
      icon: Camera,
      title: "Cosmetic Assessment",
      description: "Detailed exterior and interior condition review",
      features: ["Paint condition analysis", "Interior wear assessment", "Accident damage check", "Modification review"],
      duration: "1-2 hours",
      deliverables: "Visual condition report"
    },
    {
      icon: FileText,
      title: "Documentation Verification",
      description: "Legal and ownership document validation",
      features: ["Title verification", "Service history review", "Recall check", "Lien status confirmation"],
      duration: "1 hour",
      deliverables: "Legal status report"
    }
  ];

  const qualityStandards = [
    {
      category: "Engine & Powertrain",
      checks: ["Compression test", "Oil analysis", "Transmission function", "Cooling system", "Exhaust emissions"]
    },
    {
      category: "Safety Systems",
      checks: ["Brake performance", "Airbag systems", "Lighting systems", "Tire condition", "Steering response"]
    },
    {
      category: "Electrical Systems",
      checks: ["Battery health", "Charging system", "Electronic modules", "Infotainment", "Climate control"]
    },
    {
      category: "Structural Integrity",
      checks: ["Frame inspection", "Panel alignment", "Rust assessment", "Accident history", "Flood damage check"]
    }
  ];

  const certifications = [
    "ASE Certified Technicians",
    "OEM Factory Training",
    "Advanced Diagnostic Equipment",
    "Insurance Industry Standards",
    "Government Inspection License",
    "Quality Management System ISO 9001"
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <Shield className="w-16 h-16 mx-auto mb-6 text-white" />
          <h1 className="text-4xl md:text-6xl font-light mb-6 tracking-wider">
            QUALITY ASSURANCE
          </h1>
          <p className="text-xl text-gray-300 font-light mb-8">
            Comprehensive vehicle inspections with uncompromising standards
          </p>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-white to-transparent mx-auto"></div>
        </div>
      </section>

      {/* Inspection Types */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light mb-4 tracking-wider">INSPECTION SERVICES</h2>
            <p className="text-gray-300">Professional vehicle assessments for every need</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {inspectionTypes.map((inspection, index) => (
              <Card key={index} className="bg-gradient-to-b from-gray-800 to-black border border-gray-700 hover:border-white transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center mb-4">
                    <inspection.icon className="w-8 h-8 text-white mr-3" />
                    <div>
                      <CardTitle className="text-xl font-light tracking-wider text-white">{inspection.title}</CardTitle>
                      <div className="flex gap-4 mt-2">
                        <Badge className="bg-blue-600 text-white">{inspection.duration}</Badge>
                        <Badge className="bg-white text-black">{inspection.deliverables}</Badge>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-300">{inspection.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {inspection.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-300">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Standards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light mb-4 tracking-wider">INSPECTION STANDARDS</h2>
            <p className="text-gray-300">Comprehensive multi-point inspection checklist</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {qualityStandards.map((standard, index) => (
              <Card key={index} className="bg-gradient-to-b from-gray-800 to-black border border-gray-700">
                <CardHeader>
                  <CardTitle className="text-lg font-light tracking-wider text-white">{standard.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {standard.checks.map((check, checkIndex) => (
                      <li key={checkIndex} className="flex items-center text-gray-300 text-sm">
                        <ClipboardCheck className="w-3 h-3 text-blue-500 mr-2 flex-shrink-0" />
                        {check}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light mb-4 tracking-wider">CERTIFICATIONS & CREDENTIALS</h2>
            <p className="text-gray-300">Trusted by industry professionals and institutions</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <Card key={index} className="bg-gradient-to-b from-gray-800 to-black border border-gray-700">
                <CardContent className="p-6 flex items-center">
                  <Award className="w-6 h-6 text-yellow-500 mr-3 flex-shrink-0" />
                  <p className="text-white font-medium">{cert}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light mb-4 tracking-wider">INSPECTION PROCESS</h2>
            <p className="text-gray-300">Professional methodology for accurate results</p>
          </div>

          <div className="grid md:grid-cols-5 gap-6">
            {[
              { step: 1, title: "Schedule", description: "Book your inspection appointment" },
              { step: 2, title: "Preparation", description: "Vehicle pre-inspection setup" },
              { step: 3, title: "Inspection", description: "Comprehensive multi-point check" },
              { step: 4, title: "Analysis", description: "Data review and assessment" },
              { step: 5, title: "Report", description: "Detailed findings delivery" }
            ].map((item, index) => (
              <Card key={index} className="bg-gradient-to-b from-gray-800 to-black border border-gray-700 text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                    {item.step}
                  </div>
                  <h3 className="text-white font-medium mb-2">{item.title}</h3>
                  <p className="text-gray-300 text-sm">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-light mb-6 tracking-wider">
            ENSURE QUALITY & PEACE OF MIND
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Schedule your professional vehicle inspection today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={handleContact}
              className="bg-white text-black hover:bg-gray-200 px-8 py-4 text-lg"
            >
              <Phone className="w-5 h-5 mr-2" />
              Schedule Inspection
            </Button>
            <Button 
              onClick={handleEmailContact}
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg"
            >
              <Mail className="w-5 h-5 mr-2" />
              Request Information
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      <BackToTop />
    </div>
  );
};

export default QualityAssuranceService;