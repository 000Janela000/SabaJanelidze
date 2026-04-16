import { createContext } from 'react'
import { type Locale } from '@/lib/i18n'

export interface LanguageContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: <T extends Record<Locale, string>>(obj: T) => string
}

export const LanguageContext = createContext<LanguageContextType | null>(null)
