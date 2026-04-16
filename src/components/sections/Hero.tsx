import { useEffect, useRef } from 'react'
import { gsap, SplitText, ScrollTrigger } from '@/lib/gsap'
import { useLanguage } from '@/hooks/useLanguage'
import { translations } from '@/lib/i18n'
import { ShaderBackground } from '@/components/ShaderBackground'

interface HeroProps {
  onReady?: (play: () => void) => void
}

export function Hero({ onReady }: HeroProps) {
  const { t } = useLanguage()
  const nameRef = useRef<HTMLHeadingElement>(null)
  const titleRef = useRef<HTMLParagraphElement>(null)
  const taglineRef = useRef<HTMLParagraphElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const onReadyRef = useRef(onReady)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    onReadyRef.current = onReady
  }, [onReady])

  useEffect(() => {
    const name = nameRef.current
    const title = titleRef.current
    const tagline = taglineRef.current
    const scrollEl = scrollRef.current
    const content = contentRef.current
    if (!name || !title || !tagline || !scrollEl || !content) return

    const nameSplit = SplitText.create(name, { type: 'chars', mask: 'chars' })
    const taglineSplit = SplitText.create(tagline, { type: 'words', mask: 'words' })
    // SplitText adds aria-label to preserve text, but aria-label is prohibited on <p>
    tagline.removeAttribute('aria-label')

    gsap.set(nameSplit.chars, { yPercent: 100 })
    gsap.set(title, { opacity: 0, y: 20 })
    gsap.set(taglineSplit.words, { yPercent: 100 })
    gsap.set(scrollEl, { opacity: 0 })

    const tl = gsap.timeline({
      paused: true,
      defaults: { ease: 'power3.out' },
    })

    tl.to(nameSplit.chars, {
      yPercent: 0,
      duration: 0.8,
      stagger: 0.03,
    })
      .to(title, { opacity: 1, y: 0, duration: 0.6 }, '-=0.1')
      .to(taglineSplit.words, { yPercent: 0, duration: 0.6, stagger: 0.05 }, '-=0.15')
      .to(scrollEl, { opacity: 1, duration: 0.8 }, '-=0.2')

    const play = () => tl.play()

    if (onReadyRef.current) {
      onReadyRef.current(play)
    } else {
      gsap.delayedCall(0.3, play)
    }

    // Parallax: hero content fades/shifts as user scrolls and content sections cover it
    const scrollTrigger = ScrollTrigger.create({
      start: 0,
      end: () => window.innerHeight * 0.6,
      scrub: 0.5,
      onUpdate: (self) => {
        const p = self.progress
        gsap.set(content, {
          y: p * -60,
          opacity: 1 - p * 0.8,
          filter: `blur(${p * 8}px)`,
        })
        gsap.set(scrollEl, {
          opacity: Math.max(0, 1 - p * 4),
        })
      },
    })

    return () => {
      tl.kill()
      scrollTrigger.kill()
      nameSplit.revert()
      taglineSplit.revert()
    }
  }, [])

  return (
    <section
      id="hero"
      className="sticky top-0 z-0 flex min-h-screen flex-col items-center justify-center overflow-hidden px-6"
    >
      <ShaderBackground />

      <div ref={contentRef} className="relative z-10 flex flex-col items-center text-center">
        <h1
          ref={nameRef}
          className="hero-name text-5xl leading-[1.1] font-bold tracking-tight text-text sm:text-7xl md:text-8xl lg:text-9xl"
        >
          {t(translations.hero.name)}
        </h1>

        <p
          ref={titleRef}
          className="mt-4 text-sm font-medium tracking-[0.3em] text-text-muted uppercase sm:mt-5 sm:text-base"
        >
          {t(translations.hero.title)}
        </p>

        <p
          ref={taglineRef}
          className="mt-3 max-w-md text-base leading-relaxed text-text-muted sm:mt-4 sm:text-lg md:max-w-lg"
        >
          {t(translations.hero.tagline)}
        </p>
      </div>

      <div
        ref={scrollRef}
        className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="text-[10px] font-medium tracking-[0.3em] text-text-dim uppercase">
          {t(translations.hero.scroll)}
        </span>
        <div className="h-10 w-px bg-gradient-to-b from-text-dim to-transparent" />
      </div>
    </section>
  )
}
