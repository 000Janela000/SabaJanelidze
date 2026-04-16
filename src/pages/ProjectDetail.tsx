import { useEffect, useRef } from 'react'
import { useParams, Navigate, Link } from 'react-router-dom'
import { gsap, SplitText } from '@/lib/gsap'
import { projects, translations } from '@/lib/i18n'
import { useLanguage } from '@/context/LanguageContext'
import { useLenisScroll } from '@/context/LenisContext'
import { ArrowUpRight, ArrowRight } from 'lucide-react'

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>()
  const { t } = useLanguage()
  const lenis = useLenisScroll()
  const project = projects.find((p: typeof projects[number]) => p.slug === slug)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const pageRef = useRef<HTMLDivElement>(null)

  const projectIndex = projects.findIndex((p: typeof projects[number]) => p.slug === slug)
  const nextProject = projects[(projectIndex + 1) % projects.length]

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true })
    }

    const title = titleRef.current
    const content = contentRef.current
    const page = pageRef.current
    if (!title || !content || !page) return

    const ctx = gsap.context(() => {
      // Page entrance
      gsap.from(page, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power3.out',
      })

      // Title character reveal
      const titleSplit = SplitText.create(title, { type: 'chars', mask: 'chars' })
      gsap.from(titleSplit.chars, {
        yPercent: 100,
        duration: 0.7,
        stagger: 0.02,
        ease: 'power3.out',
        delay: 0.3,
      })

      // Content fade in
      gsap.from(content, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.6,
      })
    })

    return () => ctx.revert()
  }, [slug])

  if (!project) return <Navigate to="/" replace />

  return (
    <div ref={pageRef}>
      {/* Hero area */}
      <section className="pt-28 pb-16">
        <div className="section-container">
          {/* Back link */}
          <Link
            to="/"
            className="mb-10 inline-block text-xs font-medium tracking-wider text-text-muted uppercase transition-colors hover:text-text"
          >
            {t(translations.projectDetail.back)}
          </Link>

          {/* Category */}
          <p className="text-xs font-medium tracking-wider text-text-dim uppercase">
            {t(project.category)}
          </p>

          {/* Title */}
          <h1
            key={slug}
            ref={titleRef}
            className="mt-3 pb-1 text-3xl font-bold text-text leading-[1.15] sm:text-4xl md:text-5xl"
          >
            {project.title}
          </h1>
        </div>
      </section>

      {/* Project image */}
      <section>
        <div className="section-container">
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="w-full rounded-2xl object-cover"
          />
        </div>
      </section>

      {/* Content */}
      <section ref={contentRef} className="py-20">
        <div className="section-container grid gap-16 md:grid-cols-[1fr_280px]">
          {/* Description */}
          <div>
            <h2 className="mb-6 text-sm font-medium tracking-[0.3em] text-text-muted uppercase">
              {t(translations.projectDetail.overview)}
            </h2>
            <p className="text-base leading-relaxed text-text-muted sm:text-lg">
              {t(project.description)}
            </p>
          </div>

          {/* Sidebar: tech + link */}
          <div>
            <h2 className="mb-4 text-sm font-medium tracking-[0.3em] text-text-muted uppercase">
              {t(translations.projectDetail.techStack)}
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-border px-3 py-1 text-xs text-text-muted"
                >
                  {tech}
                </span>
              ))}
            </div>

            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
            >
              {t(translations.projectDetail.visitSite)}
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* Separator */}
      <div className="section-container">
        <div className="h-px w-full bg-border" />
      </div>

      {/* Next project */}
      <section className="py-20">
        <div className="section-container">
          <p className="text-xs font-medium tracking-wider text-text-dim uppercase">
            {t(translations.projectDetail.nextProject)}
          </p>
          <Link
            to={`/work/${nextProject.slug}`}
            className="group mt-4 flex items-center justify-between"
            data-cursor="project"
          >
            <span className="text-3xl font-bold text-text transition-colors group-hover:text-accent sm:text-4xl md:text-5xl">
              {nextProject.title}
            </span>
            <ArrowRight size={32} className="text-text-muted transition-transform group-hover:translate-x-2" />
          </Link>
        </div>
      </section>
    </div>
  )
}
