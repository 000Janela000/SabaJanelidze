import { useState, useEffect, useMemo, useCallback, type ReactNode } from 'react'
import { type Locale } from '@/lib/i18n'
import { LanguageContext } from '@/lib/language-context'

async function detectLocaleByIP(signal: AbortSignal): Promise<Locale> {
  try {
    const res = await fetch('https://ipapi.co/json/', { signal })
    const data = await res.json()
    return data.country_code === 'GE' ? 'ka' : 'en'
  } catch {
    return 'en'
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window === 'undefined') return 'en'
    const saved = localStorage.getItem('locale')
    if (saved === 'ka' || saved === 'en') return saved
    return 'en'
  })

  useEffect(() => {
    const saved = localStorage.getItem('locale')
    if (saved) return

    const controller = new AbortController()
    detectLocaleByIP(controller.signal).then((detected) => {
      if (!controller.signal.aborted) {
        setLocaleState(detected)
      }
    })
    return () => controller.abort()
  }, [])

  useEffect(() => {
    document.documentElement.lang = locale
    document.documentElement.classList.toggle('ka', locale === 'ka')
  }, [locale])

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem('locale', newLocale)
  }, [])

  const t = useCallback(<T extends Record<Locale, string>>(obj: T): string => obj[locale], [locale])

  const value = useMemo(() => ({ locale, setLocale, t }), [locale, setLocale, t])

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}
