import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { useLanguage } from '@/context/LanguageContext'
import { useLenisScroll } from '@/context/LenisContext'
import { translations } from '@/lib/i18n'

export function Footer() {
  const { t } = useLanguage()
  const lenis = useLenisScroll()
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const footer = footerRef.current
    if (!footer) return

    const ctx = gsap.context(() => {
      gsap.from(footer.children, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footer,
          start: 'top 95%',
          toggleActions: 'play none none none',
        },
      })
    }, footer)

    return () => ctx.revert()
  }, [])

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: false })
    }
  }

  return (
    <footer ref={footerRef} className="border-t border-border py-10">
      <div className="section-container flex items-center justify-between">
        <span className="text-xs text-text-dim">
          {t(translations.footer.copyright)}
        </span>
        <button
          onClick={scrollToTop}
          className="text-xs text-text-dim transition-colors hover:text-text-muted"
          data-cursor="pointer"
        >
          {t(translations.footer.backToTop)} ↑
        </button>
      </div>
    </footer>
  )
}
