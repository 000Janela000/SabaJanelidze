import { useCallback, useRef, type ReactNode } from 'react'
import { gsap } from '@/lib/gsap'

interface PortraitCardProps {
  children: ReactNode
  strength?: number
  className?: string
}

export function PortraitCard({ children, strength = 10, className = '' }: PortraitCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const flippingRef = useRef(false)

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (flippingRef.current) return
      const card = cardRef.current
      if (!card) return

      const rect = card.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5

      gsap.to(card, {
        rotateY: x * strength,
        rotateX: -y * strength,
        duration: 0.4,
        ease: 'power2.out',
      })
    },
    [strength],
  )

  const handleMouseLeave = useCallback(() => {
    if (flippingRef.current) return
    const card = cardRef.current
    if (!card) return

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.5)',
    })
  }, [])

  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (flippingRef.current) return
    const card = cardRef.current
    if (!card) return

    const rect = card.getBoundingClientRect()
    const dx = (e.clientX - rect.left) / rect.width - 0.5
    const dy = (e.clientY - rect.top) / rect.height - 0.5

    flippingRef.current = true

    const horizontal = Math.abs(dx) >= Math.abs(dy)
    const yDelta = horizontal ? (dx > 0 ? 360 : -360) : 0
    const xDelta = !horizontal ? (dy > 0 ? -360 : 360) : 0

    gsap.to(card, {
      rotateY: `+=${yDelta}`,
      rotateX: `+=${xDelta}`,
      duration: 0.9,
      ease: 'power2.inOut',
      onComplete: () => {
        gsap.set(card, { rotateX: 0, rotateY: 0 })
        flippingRef.current = false
      },
    })
  }, [])

  return (
    <div style={{ perspective: '800px' }} className={className}>
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        style={{ transformStyle: 'preserve-3d' }}
        data-cursor="pointer"
      >
        {children}
      </div>
    </div>
  )
}
