import { useEffect, useRef, useState, useCallback } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { useLanguage } from '@/context/LanguageContext'
import { useLenisScroll } from '@/context/LenisContext'
import { translations, type Locale } from '@/lib/i18n'

function LanguageSwitcher({ locale, setLocale }: { locale: Locale; setLocale: (l: Locale) => void }) {
  const textRef = useRef<HTMLSpanElement>(null)
  const rippleRef = useRef<HTMLDivElement>(null)

  const toggle = useCallback(() => {
    const newLocale = locale === 'ka' ? 'en' : 'ka'

    // Ripple flash
    if (rippleRef.current) {
      gsap.fromTo(rippleRef.current,
        { scale: 0, opacity: 0.6 },
        { scale: 2.5, opacity: 0, duration: 0.6, ease: 'power2.out' }
      )
    }

    // Switch locale immediately — no delay
    setLocale(newLocale)
  }, [locale, setLocale])

  return (
    <button
      onClick={toggle}
      className="group relative flex h-9 w-9 items-center justify-center rounded-full border border-accent/30 bg-accent/5 transition-all duration-300 hover:border-accent/60 hover:bg-accent/10 hover:shadow-[0_0_15px_rgba(79,125,245,0.15)]"
      data-cursor="pointer"
      aria-label={locale === 'ka' ? 'KA — Switch to English' : 'EN — Switch to Georgian'}
    >
      <div
        ref={rippleRef}
        className="pointer-events-none absolute inset-0 rounded-full bg-accent/30"
        style={{ transform: 'scale(0)', opacity: 0 }}
      />
      <span
        ref={textRef}
        className="relative text-[11px] font-bold tracking-widest text-accent"
      >
        {locale.toUpperCase()}
      </span>
    </button>
  )
}

const NAV_LINKS = [
  { key: 'work' as const, href: '#work' },
  { key: 'services' as const, href: '#services' },
  { key: 'about' as const, href: '#about' },
  { key: 'contact' as const, href: '#contact' },
]

export function Nav() {
  const navRef = useRef<HTMLElement>(null)
  const { locale, setLocale, t } = useLanguage()
  const lenis = useLenisScroll()
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const isHome = location.pathname === '/'

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return

    const showAnim = gsap.from(nav, {
      yPercent: -100,
      paused: true,
      duration: 0.3,
      ease: 'power2.inOut',
    }).progress(1)

    const trigger = ScrollTrigger.create({
      start: 'top top',
      end: 'max',
      onUpdate: (self) => {
        if (self.direction === -1) {
          showAnim.play()
        } else {
          showAnim.reverse()
        }
      },
    })

    // Magnetic hover on nav links
    const navLinks = nav.querySelectorAll<HTMLElement>('[data-magnetic]')
    const handleMagneticMove = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLElement
      const rect = target.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      gsap.to(target, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.3,
        ease: 'power2.out',
      })
    }
    const handleMagneticLeave = (e: MouseEvent) => {
      gsap.to(e.currentTarget as HTMLElement, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.4)',
      })
    }
    navLinks.forEach((link) => {
      link.addEventListener('mousemove', handleMagneticMove)
      link.addEventListener('mouseleave', handleMagneticLeave)
    })

    return () => {
      trigger.kill()
      showAnim.kill()
      navLinks.forEach((link) => {
        link.removeEventListener('mousemove', handleMagneticMove)
        link.removeEventListener('mouseleave', handleMagneticLeave)
      })
    }
  }, [])

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!isHome) return
    e.preventDefault()
    if (lenis) {
      lenis.scrollTo(href)
    }
    setMobileOpen(false)
  }

  return (
    <nav
      ref={navRef}
      className="fixed top-0 right-0 left-0 z-[100] border-b border-border/50 bg-bg/80 backdrop-blur-md"
    >
      <div className="section-container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="group flex items-center gap-2"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-accent/25 bg-accent/8 transition-all duration-300 group-hover:border-accent/50 group-hover:bg-accent/15 group-hover:shadow-[0_0_12px_rgba(79,125,245,0.2)]">
            <span className="text-xs font-bold tracking-tight text-accent">SJ</span>
          </div>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          {isHome &&
            NAV_LINKS.map((link) => (
              <a
                key={link.key}
                href={link.href}
                data-magnetic
                onClick={(e) => handleAnchorClick(e, link.href)}
                className="text-xs font-medium tracking-wider text-text-muted uppercase transition-colors hover:text-text"
              >
                {t(translations.nav[link.key])}
              </a>
            ))}

          {!isHome && (
            <Link
              to="/"
              className="text-xs font-medium tracking-wider text-text-muted uppercase transition-colors hover:text-text"
            >
              {locale === 'ka' ? 'მთავარი' : 'Home'}
            </Link>
          )}

          <LanguageSwitcher locale={locale} setLocale={setLocale} />
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <span
            className={`block h-px w-5 bg-text transition-transform duration-300 ${
              mobileOpen ? 'translate-y-[3.5px] rotate-45' : ''
            }`}
          />
          <span
            className={`block h-px w-5 bg-text transition-transform duration-300 ${
              mobileOpen ? '-translate-y-[3.5px] -rotate-45' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-t border-border/50 bg-bg/95 backdrop-blur-md transition-all duration-300 md:hidden ${
          mobileOpen ? 'max-h-64' : 'max-h-0 border-t-transparent'
        }`}
      >
        <div className="flex flex-col gap-1 px-8 py-4">
          {isHome &&
            NAV_LINKS.map((link) => (
              <a
                key={link.key}
                href={link.href}
                onClick={(e) => handleAnchorClick(e, link.href)}
                className="block py-2.5 text-sm font-medium text-text-muted transition-colors hover:text-text"
              >
                {t(translations.nav[link.key])}
              </a>
            ))}

          {!isHome && (
            <Link
              to="/"
              onClick={() => setMobileOpen(false)}
              className="block py-2.5 text-sm font-medium text-text-muted transition-colors hover:text-text"
            >
              {locale === 'ka' ? 'მთავარი' : 'Home'}
            </Link>
          )}

          <div className="mt-3">
            <LanguageSwitcher locale={locale} setLocale={setLocale} />
          </div>
        </div>
      </div>
    </nav>
  )
}
