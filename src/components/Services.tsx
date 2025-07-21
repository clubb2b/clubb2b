import { Button } from "@/components/ui/button";
import { Car, Globe, Shield, Users, Camera, Video, Plane, Zap } from "lucide-react";
import { useTranslation } from 'react-i18next';

const Services = () => {
  const { t } = useTranslation('common');

  const coreServices = [
    {
      icon: <Car className="w-8 h-8" />,
      title: t('services.premiumSales.title'),
      description: t('services.premiumSales.description'),
      action: () => window.location.href = '/premium-sales'
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: t('services.globalExport.title'),
      description: t('services.globalExport.description'),
      action: () => window.location.href = '/global-export'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: t('services.qualityAssured.title'),
      description: t('services.qualityAssured.description'),
      action: () => window.location.href = '/quality-assurance'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: t('services.vipService.title'),
      description: t('services.vipService.description'),
      action: () => window.location.href = '/vip-service'
    },
    {
      icon: <Camera className="w-8 h-8" />,
      title: t('services.aiPhotography.title'),
      description: t('services.aiPhotography.description'),
      action: () => window.location.href = '/ai-photo-studio'
    }
  ];

  const advancedServices = [
    {
      icon: <Video className="w-8 h-8 text-blue-400" />,
      title: t('services.liveInspection.title'),
      description: t('services.liveInspection.description'),
      action: () => window.location.href = '/video-inspection'
    },
    {
      icon: <Plane className="w-8 h-8 text-green-400" />,
      title: t('services.importExport.title'),
      description: t('services.importExport.description'),
      action: () => window.location.href = '/import-export'
    },
    {
      icon: <Zap className="w-8 h-8 text-purple-400" />,
      title: t('services.advancedTech.title'),
      description: t('services.advancedTech.description'),
      action: () => window.location.href = '/tech-features'
    }
  ];
  return (
    <section id="services" className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light mb-6 text-white tracking-wider">
            {t('services.title')}
          </h2>
          <p className="text-xl text-gray-300 font-light mb-8">
            {t('services.subtitle')}
          </p>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-white to-transparent mx-auto"></div>
        </div>

        {/* Core Services */}
        <div className="mb-16">
          <h3 className="text-2xl font-light text-white text-center mb-8 tracking-wide">
            {t('services.coreServices')}
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {coreServices.map((service, index) => (
              <div key={index} className="group relative overflow-hidden bg-gradient-to-b from-gray-900/50 to-black/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6 hover:border-white/20 transition-all duration-300">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="text-white group-hover:text-blue-400 transition-colors duration-300">
                    {service.icon}
                  </div>
                  <h4 className="text-xl font-light text-white tracking-wide">
                    {service.title}
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {service.description}
                  </p>
                  <Button
                    onClick={service.action}
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300"
                  >
                    {t('services.learnMore')}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Advanced Services */}
        <div>
          <h3 className="text-2xl font-light text-white text-center mb-8 tracking-wide">
            {t('services.advancedSolutions')}
          </h3>
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {advancedServices.map((service, index) => (
              <div key={index} className="bg-gradient-to-b from-gray-800/50 to-gray-900/80 backdrop-blur-sm p-8 rounded-xl border border-gray-700 text-center hover:border-white/30 transition-all duration-300 group">
                <div className="mb-6 group-hover:scale-110 transition-transform duration-300 flex justify-center">
                  {service.icon}
                </div>
                <h4 className="text-xl font-light text-white mb-4 tracking-wide">
                  {service.title}
                </h4>
                <p className="text-gray-300 font-light mb-6 leading-relaxed">
                  {service.description}
                </p>
                <Button 
                  onClick={service.action}
                  className="bg-transparent border-2 border-white/40 text-white hover:bg-white hover:text-black px-8 py-3 font-light tracking-wider transition-all duration-300"
                >
                  {t('services.explore')}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default Services;