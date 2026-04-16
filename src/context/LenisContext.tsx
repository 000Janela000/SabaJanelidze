import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '@/lib/gsap'

const LenisContext = createContext<Lenis | null>(null)

export function LenisProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    const instance = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    })

    setLenis(instance)

    instance.on('scroll', ScrollTrigger.update)

    const tickHandler = (time: number) => {
      instance.raf(time * 1000)
    }
    gsap.ticker.add(tickHandler)
    gsap.ticker.lagSmoothing(0)

    // Refresh ScrollTrigger after Lenis initializes so scroll calculations are correct
    gsap.delayedCall(0.2, () => ScrollTrigger.refresh())

    return () => {
      gsap.ticker.remove(tickHandler)
      instance.destroy()
      setLenis(null)
    }
  }, [])

  return (
    <LenisContext.Provider value={lenis}>
      {children}
    </LenisContext.Provider>
  )
}

/**
 * Returns the Lenis instance for programmatic scrolling.
 * Use lenis.scrollTo('#target') or lenis.scrollTo(0, { immediate: true })
 * instead of native window.scrollTo or scrollIntoView.
 */
export function useLenisScroll(): Lenis | null {
  return useContext(LenisContext)
}
