import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import enTranslations from './locales/en/common.json';
import frTranslations from './locales/fr/common.json';
import esTranslations from './locales/es/common.json';
import deTranslations from './locales/de/common.json';
import arTranslations from './locales/ar/common.json';
import zhTranslations from './locales/zh/common.json';
import jaTranslations from './locales/ja/common.json';
import ptTranslations from './locales/pt/common.json';
import ruTranslations from './locales/ru/common.json';
import hiTranslations from './locales/hi/common.json';

const resources = {
  en: { common: enTranslations },
  fr: { common: frTranslations },
  es: { common: esTranslations },
  de: { common: deTranslations },
  ar: { common: arTranslations },
  zh: { common: zhTranslations },
  ja: { common: jaTranslations },
  pt: { common: ptTranslations },
  ru: { common: ruTranslations },
  hi: { common: hiTranslations }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    
    // Language detection options
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },

    interpolation: {
      escapeValue: false,
    },

    // Namespace configuration
    defaultNS: 'common',
    ns: ['common'],

    // React options
    react: {
      useSuspense: false,
    },
  });

export default i18n;