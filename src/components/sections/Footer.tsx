import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { useLanguage } from '@/context/LanguageContext'
import { useLenisScroll } from '@/context/LenisContext'
import { translations } from '@/lib/i18n'
import { lighthouseScores } from '@/lib/lighthouse'
import { LighthouseScore } from '@/components/LighthouseScore'

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
      <div className="section-container">
        {/* Metrics bar — Build quality showcase */}
        <div className="mb-10 flex flex-col gap-6 border-b border-border pb-10 sm:flex-row sm:items-center sm:justify-between">
          {/* Left: Label block */}
          <div className="flex flex-col gap-1">
            <span className="text-[11px] font-semibold tracking-[0.2em] text-text-dim uppercase">
              Build Quality
            </span>
            <span className="text-[10px] text-text-dim">
              This portfolio · Lighthouse audit
            </span>
            <span className="mt-1 text-[10px] text-text-dim/60">
              React · Three.js · GSAP
            </span>
          </div>

          {/* Right: Score rings */}
          <div className="flex items-end gap-6">
            <LighthouseScore
              score={lighthouseScores.portfolio.performance}
              label="Perf"
              size="lg"
            />
            <LighthouseScore
              score={lighthouseScores.portfolio.accessibility}
              label="A11y"
              size="lg"
            />
            <LighthouseScore
              score={lighthouseScores.portfolio.bestPractices}
              label="Best"
              size="lg"
            />
            <LighthouseScore
              score={lighthouseScores.portfolio.seo}
              label="SEO"
              size="lg"
            />
          </div>
        </div>

        {/* Copyright and back to top */}
        <div className="flex items-center justify-between">
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
      </div>
    </footer>
  )
}
