import { useState, useCallback, useRef } from 'react'
import { motion, type Transition } from 'framer-motion'
import { Hero } from '@/components/sections/Hero'
import { SelectedWork } from '@/components/sections/SelectedWork'
import { WhatIDo } from '@/components/sections/WhatIDo'
import { About } from '@/components/sections/About'
import { Contact } from '@/components/sections/Contact'
import { Footer } from '@/components/sections/Footer'
import { Preloader } from '@/components/Preloader'

const transition: Transition = { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
const pageTransition = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition,
}

interface HomeProps {
  onPreloaderDone: () => void
}

export default function Home({ onPreloaderDone }: HomeProps) {
  const [preloaderDone, setPreloaderDone] = useState(false)
  const heroPlayRef = useRef<(() => void) | null>(null)
  const preloaderDoneRef = useRef(false)

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

  return (
    <>
      {!preloaderDone && <Preloader onComplete={handlePreloaderComplete} />}

      {/* Hero lives outside motion.div — sticky breaks inside CSS transform parents (iOS Safari) */}
      <Hero onReady={handleHeroReady} />

      <motion.div {...pageTransition} className="relative z-10 bg-bg">
        <div className="pointer-events-none h-12 bg-gradient-to-b from-transparent to-bg" />
        <SelectedWork />
        <WhatIDo />
        <About />
        <Contact />
        <Footer />
      </motion.div>
    </>
  )
}
