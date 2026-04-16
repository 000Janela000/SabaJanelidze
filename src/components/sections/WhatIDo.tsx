import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { useLanguage } from '@/hooks/useLanguage'
import { translations } from '@/lib/i18n'
import { TiltCard } from '@/components/TiltCard'
import { useBlurReveal } from '@/hooks/useBlurReveal'
import { Code, Palette, Layers } from 'lucide-react'

const ICONS = [Code, Palette, Layers]

export function WhatIDo() {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useBlurReveal(headingRef)

  useEffect(() => {
    const section = sectionRef.current
    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[]
    if (!section || cards.length === 0) return

    const ctx = gsap.context(() => {
      cards.forEach((card) => {
        const border = card.querySelector('[data-anim="border"]')

        // Only animate the border draw with delay (subtle, professional)
        // Content is already visible — no jarring pop-in
        if (border) {
          gsap.from(border, {
            scaleY: 0,
            transformOrigin: 'top',
            delay: 0.12,
            duration: 0.6,
            ease: 'power3.inOut',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play pause resume pause',
            },
          })
        }
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="services"
      className="py-24"
    >
      <div className="section-container">
        <h2
          ref={headingRef}
          className="mb-12 text-3xl font-bold text-text sm:text-4xl md:text-5xl"
        >
          {t(translations.services.heading)}
        </h2>

        <div className="flex flex-col gap-6">
          {translations.services.items.map((service, index) => {
            const Icon = ICONS[index]
            return (
              <div
                key={index}
                ref={(el) => { cardsRef.current[index] = el }}
              >
                <TiltCard
                  strength={6}
                  className="group/card overflow-hidden rounded-2xl border border-border bg-bg-elevated shadow-lg shadow-black/20 transition-colors duration-300 hover:border-accent/30"
                >
                  <div className="flex">
                    {/* Accent left border */}
                    <div data-anim="border" className="w-1 shrink-0 bg-gradient-to-b from-accent/60 via-accent/20 to-transparent" />

                    <div className="flex flex-1 items-start gap-6 p-10 sm:p-14">
                      <div data-anim="icon" className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-accent/15 bg-accent/8 transition-colors duration-300 group-hover/card:border-accent/30 group-hover/card:bg-accent/12">
                        <Icon size={24} className="text-accent" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-baseline justify-between gap-4">
                          <h3 data-anim="title" className="text-2xl font-semibold text-text sm:text-3xl">
                            {t(service.title)}
                          </h3>
                          <span data-anim="number" aria-hidden="true" className="hidden text-5xl font-bold leading-none text-text-dim/[0.08] sm:block">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                        </div>
                        <p data-anim="desc" className="mt-4 max-w-xl text-base leading-relaxed text-text-muted sm:text-lg">
                          {t(service.description)}
                        </p>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
