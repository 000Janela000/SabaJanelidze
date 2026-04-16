import { useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/i18n";
import { useBlurReveal } from "@/hooks/useBlurReveal";
import { ContactForm } from "@/components/ContactForm";
import { Github, Linkedin, ArrowRight } from "lucide-react";

export function Contact() {
  const { t } = useLanguage();
  const headingRef = useRef<HTMLHeadingElement>(null);

  useBlurReveal(headingRef);

  return (
    <section id="contact" className="py-24">
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

        {/* PATH 1: Project Form */}
        <div className="mt-16">
          <ContactForm />
        </div>

        {/* PATH 2: Direct Connection */}
        <div className="mt-20 border-t border-border pt-12">
          <p className="mb-6 text-[11px] font-semibold tracking-[0.2em] text-accent uppercase">
            {t(translations.contact.social.label)}
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <a
              href="https://github.com/000Janela000"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-3 rounded-lg border border-accent/25 bg-accent/5 px-6 py-4 text-accent font-medium transition-all hover:border-accent/50 hover:bg-accent/10"
              data-cursor="pointer"
            >
              <Github size={20} />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/sabajanelidze"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-3 rounded-lg border border-accent/25 bg-accent/5 px-6 py-4 text-accent font-medium transition-all hover:border-accent/50 hover:bg-accent/10"
              data-cursor="pointer"
            >
              <Linkedin size={20} />
              LinkedIn
            </a>
          </div>
        </div>

        {/* PATH 3: SiteCraft */}
        <div className="mt-20 border-t border-border pt-12">
          <p className="mb-4 text-[11px] font-semibold tracking-[0.2em] text-accent uppercase">
            {t(translations.contact.secondary.title)}
          </p>
          <p className="text-text-muted">
            {t(translations.contact.secondary.text)}
          </p>
          <a
            href="https://sitecraft-puce.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 text-accent transition-all hover:gap-3"
            data-cursor="pointer"
          >
            Visit SiteCraft
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
