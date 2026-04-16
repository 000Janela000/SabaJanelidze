import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { useLanguage } from '@/context/LanguageContext'
import { translations } from '@/lib/i18n'
import { MagneticButton } from '@/components/MagneticButton'
import { useBlurReveal } from '@/hooks/useBlurReveal'
import { Mail, Facebook, Github } from 'lucide-react'

export function Contact() {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)

  useBlurReveal(headingRef)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      const content = section.querySelector('[data-reveal="contact-content"]')
      if (content) {
        gsap.from(content, {
          opacity: 0,
          y: 30,
          immediateRender: false,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: content,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        })
      }
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-24"
    >
      <div className="section-container">
        <h2
          ref={headingRef}
          className="text-4xl font-bold text-text sm:text-5xl md:text-6xl lg:text-7xl"
        >
          {t(translations.contact.heading)}
        </h2>

        <div data-reveal="contact-content" className="mt-16">
          <p className="max-w-lg text-lg text-text-muted sm:text-xl">
            {t(translations.contact.subheading)}
          </p>

          <div className="mt-14">
            <MagneticButton
              as="a"
              href="mailto:ssjanelidze@gmail.com"
              className="group inline-flex items-center gap-3 rounded-full border-2 border-accent bg-accent/10 px-10 py-5 text-lg font-semibold text-accent transition-colors hover:bg-accent hover:text-bg sm:text-xl"
            >
              <Mail size={22} />
              {t(translations.contact.cta)}
            </MagneticButton>
          </div>

          <div className="mt-16 flex gap-8">
            <a
              href="https://www.facebook.com/janela01"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 text-base text-text-muted transition-colors hover:text-text"
            >
              <Facebook size={20} />
              Facebook
            </a>
            <a
              href="https://github.com/000Janela000"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 text-base text-text-muted transition-colors hover:text-text"
            >
              <Github size={20} />
              GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
