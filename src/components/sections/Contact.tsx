import { useRef } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { translations } from '@/lib/i18n'
import { useBlurReveal } from '@/hooks/useBlurReveal'
import { ContactForm } from '@/components/ContactForm'
import { ArrowRight } from 'lucide-react'

export function Contact() {
  const { t } = useLanguage()
  const headingRef = useRef<HTMLHeadingElement>(null)

  useBlurReveal(headingRef)

  return (
    <section
      id="contact"
      className="py-24"
    >
      <div className="section-container max-w-3xl">
        <h2
          ref={headingRef}
          className="text-3xl font-bold text-text sm:text-4xl md:text-5xl"
        >
          {t(translations.contact.heading)}
        </h2>

        <p className="mt-4 text-lg text-text-muted">
          {t(translations.contact.subheadline)}
        </p>

        {/* Form */}
        <div className="mt-16">
          <ContactForm />
        </div>

        {/* Secondary CTA */}
        <div className="mt-20 border-t border-border pt-12">
          <p className="text-sm text-text-dim uppercase tracking-[0.15em]">
            {t(translations.contact.secondary.title)}
          </p>
          <p className="mt-3 text-text-muted">
            {t(translations.contact.secondary.text)}
          </p>
          <a
            href="https://sitecraft-puce.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-accent hover:gap-3 transition-all"
          >
            SiteCraft
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  )
}
