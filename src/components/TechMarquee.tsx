import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

const TECH_STACK = [
  'React', 'TypeScript', 'Next.js', 'Node.js', 'Python',
  'Tailwind CSS', 'PostgreSQL', 'Three.js', 'GSAP', 'Vite', 'Git', 'Vercel',
]

// Double the list for seamless loop
const ITEMS = [...TECH_STACK, ...TECH_STACK]

/**
 * Infinite horizontal marquee that responds to scroll velocity.
 * Scrolls at a base speed, accelerates when the user scrolls faster.
 * Uses CSS transforms for GPU compositing.
 */
export function TechMarquee() {
  const trackRef = useRef<HTMLDivElement>(null)
  const tweenRef = useRef<gsap.core.Tween | null>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const totalWidth = track.scrollWidth / 2
    if (totalWidth === 0) return // guard: track not yet laid out

    const tween = gsap.to(track, {
      x: -totalWidth,
      duration: 30,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x: number) => x % totalWidth),
      },
    })

    tweenRef.current = tween

    // Speed up on scroll using ScrollTrigger velocity
    const speedUp = gsap.to(tween, {
      timeScale: 3,
      duration: 0.3,
      ease: 'power2.out',
      paused: true,
    })

    const slowDown = gsap.to(tween, {
      timeScale: 1,
      duration: 1,
      ease: 'power3.out',
      paused: true,
    })

    let scrollTimeout: ReturnType<typeof setTimeout>

    const handleScroll = () => {
      speedUp.restart()
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        slowDown.restart()
      }, 150)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(scrollTimeout)
      tween.kill()
      speedUp.kill()
      slowDown.kill()
    }
  }, [])

  return (
    <div className="overflow-hidden">
      <div
        ref={trackRef}
        className="flex w-max gap-12"
      >
        {ITEMS.map((tech, i) => (
          <span
            key={`${tech}-${i}`}
            className="whitespace-nowrap text-xl font-medium text-text-muted transition-colors hover:text-text sm:text-2xl"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  )
}
