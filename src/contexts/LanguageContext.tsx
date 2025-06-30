
import React, { createContext, useContext, useState } from 'react';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    'hero.title': 'CLUB B2B PERFORMANCE',
    'hero.subtitle': 'Elite Cars | Global Import & Export | VIP Services',
    'hero.tagline': 'Worldwide Luxury Shipping | From Canada to Africa',
    'services.maritime.title': 'MARITIME FREIGHT',
    'services.maritime.desc': 'Complete container loading, Partial container loading, Special equipment',
    'services.air.title': 'AIR FREIGHT',
    'services.air.desc': 'Expedition, Consolidation, Small package service, Delivery service',
    'contact.title': 'GET IN TOUCH',
    'contact.subtitle': 'Ready to join the exclusive world of luxury automotive excellence?'
  },
  fr: {
    'hero.title': 'CLUB B2B PERFORMANCE',
    'hero.subtitle': 'Voitures Elite | Import & Export Global | Services VIP',
    'hero.tagline': 'Expédition de Luxe Mondiale | Du Canada à l\'Afrique',
    'services.maritime.title': 'FRET MARITIME',
    'services.maritime.desc': 'Chargement complet de conteneur, Chargement partiel, Équipement spécial',
    'services.air.title': 'FRET AÉRIEN',
    'services.air.desc': 'Expédition, Consolidation, Service de petits emballages, Service de livraison',
    'contact.title': 'CONTACTEZ-NOUS',
    'contact.subtitle': 'Prêt à rejoindre le monde exclusif de l\'excellence automobile de luxe?'
  },
  es: {
    'hero.title': 'CLUB B2B PERFORMANCE',
    'hero.subtitle': 'Autos Elite | Importación y Exportación Global | Servicios VIP',
    'hero.tagline': 'Envío de Lujo Mundial | De Canadá a África',
    'services.maritime.title': 'FLETE MARÍTIMO',
    'services.maritime.desc': 'Carga completa de contenedor, Carga parcial, Equipo especial',
    'services.air.title': 'FLETE AÉREO',
    'services.air.desc': 'Expedición, Consolidación, Servicio de paquetes pequeños, Servicio de entrega',
    'contact.title': 'PÓNGASE EN CONTACTO',
    'contact.subtitle': '¿Listo para unirse al mundo exclusivo de la excelencia automotriz de lujo?'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const t = (key: string): string => {
    return translations[language as keyof typeof translations]?.[key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
