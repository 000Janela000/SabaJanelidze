import { useEffect, type ReactNode } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { setLenisInstance } from '@/lib/lenis-store'

export function LenisProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const instance = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    })

    setLenisInstance(instance)

    instance.on('scroll', ScrollTrigger.update)

    const tickHandler = (time: number) => {
      instance.raf(time * 1000)
    }
    gsap.ticker.add(tickHandler)
    gsap.ticker.lagSmoothing(0)

    gsap.delayedCall(0.2, () => ScrollTrigger.refresh())

    return () => {
      gsap.ticker.remove(tickHandler)
      instance.destroy()
      setLenisInstance(null)
    }
  }, [])

  return <>{children}</>
}
