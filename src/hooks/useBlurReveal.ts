import { useEffect, type RefObject } from 'react'
import { gsap, SplitText } from '@/lib/gsap'

/**
 * Splits heading into chars and reveals them with a staggered wave effect.
 * Characters slide up from below with rotation and opacity.
 */
export function useBlurReveal(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current
    if (!el) return

    const split = SplitText.create(el, { type: 'chars', mask: 'chars' })

    // Fix Georgian character clipping — mask containers need extra vertical space
    const maskDivs = el.querySelectorAll<HTMLElement>('[style*="overflow"]')
    maskDivs.forEach((div) => {
      div.style.overflow = 'clip'
      div.style.paddingTop = '0.15em'
      div.style.paddingBottom = '0.15em'
      div.style.marginTop = '-0.15em'
      div.style.marginBottom = '-0.15em'
    })

    gsap.set(split.chars, { yPercent: 110, rotateX: -40 })

    gsap.to(split.chars, {
      yPercent: 0,
      rotateX: 0,
      duration: 0.7,
      stagger: 0.025,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    })

    return () => {
      gsap.killTweensOf(split.chars)
      split.revert()
    }
  }, [ref])
}
