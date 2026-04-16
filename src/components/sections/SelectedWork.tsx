import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from '@/lib/gsap'
import { useLanguage } from '@/hooks/useLanguage'
import { translations, projects } from '@/lib/i18n'
import { TiltCard } from '@/components/TiltCard'
import { useBlurReveal } from '@/hooks/useBlurReveal'
import { lighthouseScores } from '@/lib/lighthouse'
import { LighthouseScore } from '@/components/LighthouseScore'
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
        const divider = item.querySelector('[data-reveal="divider"]')

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

        // Divider line draw-across
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
            const projectSlug = project.slug as keyof typeof lighthouseScores.projects
            const scores = lighthouseScores.projects[projectSlug]
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
                              loading="lazy"
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
                      aria-hidden="true"
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
                          className="rounded-full border border-border bg-bg-elevated px-3 py-1 text-[11px] font-medium tracking-wide text-text-muted"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Lighthouse scores */}
                    {scores && (
                      <div className="mt-6 flex items-end gap-4">
                        <LighthouseScore score={scores.performance} label="Perf" size="sm" />
                        <LighthouseScore score={scores.accessibility} label="A11y" size="sm" />
                        <LighthouseScore score={scores.seo} label="SEO" size="sm" />
                      </div>
                    )}

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
