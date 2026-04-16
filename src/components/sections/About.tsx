import { useEffect, useRef } from 'react'
import { gsap, SplitText } from '@/lib/gsap'
import { useLanguage } from '@/context/LanguageContext'
import { translations } from '@/lib/i18n'
import { TechMarquee } from '@/components/TechMarquee'
import { useBlurReveal } from '@/hooks/useBlurReveal'

export function About() {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const photoRef = useRef<HTMLDivElement>(null)
  const bioRef = useRef<HTMLParagraphElement>(null)

  useBlurReveal(headingRef)

  useEffect(() => {
    const section = sectionRef.current
    const photo = photoRef.current
    const bio = bioRef.current
    if (!section || !photo || !bio) return

    const ctx = gsap.context(() => {
      gsap.to(photo, {
        yPercent: -15,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })

      gsap.from(photo, {
        opacity: 0,
        scale: 0.9,
        immediateRender: false,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: photo,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })

      // Scroll-scrubbed text reveal — words glow from dim to bright
      const bioSplit = SplitText.create(bio, { type: 'words' })
      gsap.set(bioSplit.words, { opacity: 0.1, color: 'var(--color-text-dim)', filter: 'blur(2px)' })
      gsap.to(bioSplit.words, {
        opacity: 1,
        color: 'var(--color-text)',
        filter: 'blur(0px)',
        stagger: 0.08,
        ease: 'none',
        scrollTrigger: {
          trigger: bio,
          start: 'top 90%',
          end: 'bottom 60%',
          scrub: 0.8,
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-24"
    >
      <div className="section-container">
        <h2
          ref={headingRef}
          className="mb-12 text-3xl font-bold text-text sm:text-4xl md:text-5xl"
        >
          {t(translations.about.heading)}
        </h2>

        <div className="overflow-hidden rounded-2xl border border-border/50 bg-bg-elevated/50">
          <div className="grid items-center gap-10 p-8 sm:p-12 md:grid-cols-[280px_1fr] md:gap-16 md:p-16">
            {/* Photo */}
            <div ref={photoRef} className="flex justify-center md:justify-start">
              <div className="group/photo relative">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-accent/30 via-accent/10 to-transparent opacity-0 blur-sm transition-opacity duration-500 group-hover/photo:opacity-100" />
                <div className="relative h-52 w-52 overflow-hidden rounded-2xl border-2 border-accent/25 transition-all duration-500 hover:border-accent/50 hover:shadow-[0_0_20px_rgba(79,125,245,0.15)] md:h-64 md:w-64">
                  <img
                    src="/portrait.png"
                    alt="Saba Janelidze"
                    className="h-full w-full object-cover object-top"
                  />
                </div>
              </div>
            </div>

            {/* Bio */}
            <div>
              <p className="text-[11px] font-semibold tracking-[0.2em] text-accent uppercase">
                {t(translations.hero.title)}
              </p>
              <p className="mt-3 text-2xl font-bold text-text sm:text-3xl">
                {t(translations.hero.name)}
              </p>
              <div className="mt-4 h-px w-16 bg-gradient-to-r from-accent/50 to-transparent" />
              <p
                ref={bioRef}
                className="mt-6 max-w-xl text-base leading-relaxed text-text-muted sm:text-lg"
              >
                {t(translations.about.bio)}
              </p>
            </div>
          </div>
        </div>

        {/* Tech stack marquee */}
        <div className="mt-16">
          <TechMarquee />
        </div>
      </div>
    </section>
  )
}
