import { useCallback, useRef, type ReactNode } from 'react'
import { gsap } from '@/lib/gsap'

interface PortraitCardProps {
  children: ReactNode
  strength?: number
  className?: string
}

export function PortraitCard({ children, strength = 28, className = '' }: PortraitCardProps) {
  const flipRef = useRef<HTMLDivElement>(null)
  const tiltRef = useRef<HTMLDivElement>(null)
  const flippingRef = useRef(false)

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (flippingRef.current) return
      const tilt = tiltRef.current
      if (!tilt) return

      const rect = tilt.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5

      tilt.style.transform = `rotateX(${-y * strength}deg) rotateY(${x * strength}deg)`
    },
    [strength],
  )

  const handleMouseLeave = useCallback(() => {
    if (flippingRef.current) return
    const tilt = tiltRef.current
    if (!tilt) return
    tilt.style.transform = ''
  }, [])

  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (flippingRef.current) return
    const flip = flipRef.current
    const tilt = tiltRef.current
    if (!flip || !tilt) return

    const rect = e.currentTarget.getBoundingClientRect()
    const dx = (e.clientX - rect.left) / rect.width - 0.5
    const dy = (e.clientY - rect.top) / rect.height - 0.5

    // Rotation axis is perpendicular to press direction within the card plane.
    // Press at (dx, dy) → axis (-dy, dx, 0). Press point travels into screen first.
    const magnitude = Math.hypot(dx, dy)
    const ax = magnitude > 0.01 ? -dy / magnitude : 0
    const ay = magnitude > 0.01 ? dx / magnitude : 1

    flippingRef.current = true
    tilt.style.transform = ''

    const state = { angle: 0 }
    gsap.to(state, {
      angle: 360,
      duration: 0.9,
      ease: 'power2.inOut',
      onUpdate: () => {
        flip.style.transform = `rotate3d(${ax}, ${ay}, 0, ${state.angle}deg)`
      },
      onComplete: () => {
        flip.style.transform = ''
        flippingRef.current = false
      },
    })
  }, [])

  return (
    <div style={{ perspective: '800px' }} className={className}>
      <div ref={flipRef} style={{ transformStyle: 'preserve-3d' }}>
        <div
          ref={tiltRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
          style={{
            transformStyle: 'preserve-3d',
            transition: 'transform 250ms cubic-bezier(0.33, 1, 0.68, 1)',
            willChange: 'transform',
          }}
          data-cursor="pointer"
          data-cursor-magnet="false"
        >
          {children}
        </div>
      </div>
    </div>
  )
}
