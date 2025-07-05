
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
    'contact.subtitle': 'Ready to join the exclusive world of luxury automotive excellence?',
    'nav.home': 'Home',
    'nav.inventory': 'Inventory',
    'nav.services': 'Services',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'buttons.book_appointment': 'Book Appointment',
    'buttons.calculate_price': 'Calculate Price',
    'buttons.inspection_report': 'Inspection Report',
    'buttons.financing': 'Financing Options',
    'chat.welcome': 'Hello! How can I help you with our luxury automotive services today?',
    'financing.title': 'Financing Available',
    'financing.desc': 'Flexible payment options with competitive rates starting from 4.5% APR',
    'collection.title': 'LUXURY CAR COLLECTION',
    'collection.subtitle': 'Premium vehicles from around the world',
    'freight.title': 'GLOBAL FREIGHT SOLUTIONS',
    'freight.subtitle': 'Comprehensive shipping solutions by sea and air',
    'footer.follow': 'Follow Us',
    'footer.whatsapp': 'WhatsApp',
    'footer.email': 'Email',
    'footer.phone': 'Phone',
    'footer.domain': 'Website'
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
    'contact.subtitle': 'Prêt à rejoindre le monde exclusif de l\'excellence automobile de luxe?',
    'nav.home': 'Accueil',
    'nav.inventory': 'Inventaire',
    'nav.services': 'Services',
    'nav.about': 'À Propos',
    'nav.contact': 'Contact',
    'buttons.book_appointment': 'Prendre RDV',
    'buttons.calculate_price': 'Calculer Prix',
    'buttons.inspection_report': 'Rapport Inspection',
    'buttons.financing': 'Options Financement',
    'chat.welcome': 'Bonjour! Comment puis-je vous aider avec nos services automobiles de luxe?',
    'financing.title': 'Financement Disponible',
    'financing.desc': 'Options de paiement flexibles avec des taux compétitifs à partir de 4,5% TAP',
    'collection.title': 'COLLECTION DE VOITURES DE LUXE',
    'collection.subtitle': 'Véhicules premium du monde entier',
    'freight.title': 'SOLUTIONS DE FRET MONDIAL',
    'freight.subtitle': 'Solutions d\'expédition complètes par mer et par air',
    'footer.follow': 'Suivez-nous',
    'footer.whatsapp': 'WhatsApp',
    'footer.email': 'Courriel',
    'footer.phone': 'Téléphone',
    'footer.domain': 'Site Web'
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
    'contact.subtitle': '¿Listo para unirse al mundo exclusivo de la excelencia automotriz de lujo?',
    'nav.home': 'Inicio',
    'nav.inventory': 'Inventario',
    'nav.services': 'Servicios',
    'nav.about': 'Acerca de',
    'nav.contact': 'Contacto',
    'buttons.book_appointment': 'Reservar Cita',
    'buttons.calculate_price': 'Calcular Precio',
    'buttons.inspection_report': 'Reporte Inspección',
    'buttons.financing': 'Opciones Financiamiento',
    'chat.welcome': '¡Hola! ¿Cómo puedo ayudarte con nuestros servicios automotrices de lujo?',
    'financing.title': 'Financiamiento Disponible',
    'financing.desc': 'Opciones de pago flexibles con tasas competitivas desde 4.5% APR'
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
