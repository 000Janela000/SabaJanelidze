import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from '@/lib/gsap'
import { useLanguage } from '@/context/LanguageContext'
import { translations, projects } from '@/lib/i18n'
import { TiltCard } from '@/components/TiltCard'
import { useBlurReveal } from '@/hooks/useBlurReveal'
import { ArrowUpRight } from 'lucide-react'

export function SelectedWork() {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useBlurReveal(headingRef)

  useEffect(() => {
    const items = itemRefs.current.filter(Boolean) as HTMLDivElement[]
    if (items.length === 0) return

    const ctx = gsap.context(() => {
      items.forEach((item) => {
        const image = item.querySelector('[data-reveal="image"]')
        const info = item.querySelector('[data-reveal="info"]')
        const number = item.querySelector('[data-reveal="number"]')
        const techPills = item.querySelectorAll('[data-reveal="tech"] span')

        // Number: horizontal parallax on scroll
        if (number) {
          gsap.from(number, {
            opacity: 0,
            x: -30,
            immediateRender: false,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          })
          // Continuous parallax drift
          gsap.to(number, {
            x: 40,
            ease: 'none',
            scrollTrigger: {
              trigger: item,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          })
        }

        // Image: cinematic clip-path wipe (set initial state immediately to avoid flash)
        if (image) {
          gsap.set(image, { clipPath: 'inset(0% 100% 0% 0% round 12px)' })
          gsap.to(image, {
            clipPath: 'inset(0% 0% 0% 0% round 12px)',
            duration: 1.2,
            ease: 'power4.inOut',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          })
        }

        // Info: slide up
        if (info) {
          gsap.from(info, {
            opacity: 0,
            y: 40,
            immediateRender: false,
            duration: 0.8,
            delay: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          })
        }

        // Tech pills: staggered pop-in
        if (techPills.length > 0) {
          gsap.from(techPills, {
            scale: 0,
            opacity: 0,
            immediateRender: false,
            duration: 0.4,
            stagger: 0.08,
            ease: 'back.out(3)',
            scrollTrigger: {
              trigger: item,
              start: 'top 65%',
              toggleActions: 'play none none none',
            },
          })
        }

        // Divider line draw-across
        const divider = item.querySelector('[data-reveal="divider"]')
        if (divider) {
          gsap.from(divider, {
            scaleX: 0,
            transformOrigin: 'left center',
            immediateRender: false,
            duration: 0.8,
            ease: 'power3.inOut',
            scrollTrigger: {
              trigger: divider,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          })
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="work"
      className="pt-20 pb-24"
    >
      <div className="section-container">
        {/* Section heading */}
        <h2
          ref={headingRef}
          className="mb-16 text-3xl font-bold text-text sm:text-4xl md:text-5xl"
        >
          {t(translations.work.heading)}
        </h2>

        {/* Project list — alternating layout */}
        <div className="flex flex-col gap-16 md:gap-32">
          {projects.map((project, index) => {
            const isEven = index % 2 === 0
            return (
              <div
                key={project.slug}
                ref={(el) => { itemRefs.current[index] = el }}
                className="group"
              >
                <div className={`grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-16`}>
                  {/* Project image */}
                  <div
                    className={`md:col-span-7 ${isEven ? 'md:order-1' : 'md:order-2'}`}
                  >
                    <Link
                      to={`/work/${project.slug}`}
                      data-cursor="project"
                      data-cursor-text={t(translations.work.viewProject)}
                      data-cursor-color={project.color}
                      className="block"
                    >
                      <div data-reveal="image">
                        <TiltCard strength={6}>
                          <div className="overflow-hidden rounded-xl border border-border/50">
                            <img
                              src={project.image}
                              alt={project.title}
                              className="aspect-[16/10] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                            />
                          </div>
                        </TiltCard>
                      </div>
                    </Link>
                  </div>

                  {/* Project info */}
                  <div
                    data-reveal="info"
                    className={`flex flex-col md:col-span-5 ${isEven ? 'md:order-2' : 'md:order-1'}`}
                  >
                    {/* Project number */}
                    <span
                      data-reveal="number"
                      className="text-7xl font-bold leading-none text-text-dim/[0.12] md:text-8xl"
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    {/* Category */}
                    <span className="mt-4 text-[11px] font-semibold tracking-[0.2em] text-accent uppercase">
                      {t(project.category)}
                    </span>

                    {/* Title */}
                    <h3 className="mt-3 text-2xl font-bold text-text sm:text-3xl lg:text-4xl">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-4 text-sm leading-relaxed text-text-muted sm:text-base">
                      {t(project.shortDesc)}
                    </p>

                    {/* Tech stack */}
                    <div data-reveal="tech" className="mt-6 flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-border bg-bg-elevated px-3 py-1 text-[11px] font-medium tracking-wide text-text-dim"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* View link */}
                    <Link
                      to={`/work/${project.slug}`}
                      className="mt-8 inline-flex items-center gap-2 self-start text-xs font-semibold tracking-wider text-text-muted uppercase transition-colors hover:text-accent"
                    >
                      {t(translations.work.viewProject)}
                      <ArrowUpRight size={14} />
                    </Link>
                  </div>
                </div>

                {/* Separator */}
                {index < projects.length - 1 && (
                  <div data-reveal="divider" className="mt-8 h-px w-full bg-gradient-to-r from-transparent via-border to-transparent md:mt-12" />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
