import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import { resources } from '@/locales'

const isServer = typeof window === 'undefined'

if (isServer) {
  i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: 'es',
      fallbackLng: 'es',
      interpolation: {
        escapeValue: false,
      },
      react: {
        useSuspense: false,
      },
      initImmediate: false,
    })
} else {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'es',
      
      detection: {
        order: ['localStorage', 'navigator'],
        caches: ['localStorage'],
      },

      interpolation: {
        escapeValue: false,
      },

      react: {
        useSuspense: false,
      },
    })
}

export default i18n