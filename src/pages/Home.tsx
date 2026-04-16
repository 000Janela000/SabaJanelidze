import { useState, useCallback, useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'
import { Hero } from '@/components/sections/Hero'
import { SelectedWork } from '@/components/sections/SelectedWork'
import { WhatIDo } from '@/components/sections/WhatIDo'
import { About } from '@/components/sections/About'
import { Contact } from '@/components/sections/Contact'
import { Footer } from '@/components/sections/Footer'
import { Preloader } from '@/components/Preloader'

interface HomeProps {
  onPreloaderDone: () => void
}

export default function Home({ onPreloaderDone }: HomeProps) {
  const [preloaderDone, setPreloaderDone] = useState(false)
  const heroPlayRef = useRef<(() => void) | null>(null)
  const preloaderDoneRef = useRef(false)
  const contentRef = useRef<HTMLDivElement>(null)

  const handleHeroReady = useCallback((play: () => void) => {
    heroPlayRef.current = play
    if (preloaderDoneRef.current) {
      play()
    }
  }, [])

  const handlePreloaderComplete = useCallback(() => {
    preloaderDoneRef.current = true
    setPreloaderDone(true)
    onPreloaderDone()
    if (heroPlayRef.current) {
      heroPlayRef.current()
    }
  }, [onPreloaderDone])

  useEffect(() => {
    const el = contentRef.current
    if (!el) return
    gsap.from(el, { opacity: 0, y: 40, duration: 0.7, ease: 'power3.out', delay: 0.1 })
    // Ensure final state is fully opaque (fixes blur showing through from hero)
    gsap.to(el, { opacity: 1, duration: 0.01, delay: 0.8 })
  }, [])

  return (
    <>
      {!preloaderDone && <Preloader onComplete={handlePreloaderComplete} />}

      {/* Hero lives outside content div — sticky breaks inside CSS transform parents (iOS Safari) */}
      <Hero onReady={handleHeroReady} />

      <div ref={contentRef} className="relative z-10 bg-bg">
        <div className="pointer-events-none h-12 bg-gradient-to-b from-transparent to-bg" />
        <SelectedWork />
        <WhatIDo />
        <About />
        <Contact />
        <Footer />
      </div>
    </>
  )
}
