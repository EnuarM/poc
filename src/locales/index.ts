import esTranslation from './es/translation.json'
import ptTranslation from './pt/translation.json'

export const resources = {
  es: {
    translation: esTranslation
  },
  pt: {
    translation: ptTranslation
  }
} as const

export type SupportedLanguages = 'es' | 'pt'

export const defaultLanguage: SupportedLanguages = 'es'