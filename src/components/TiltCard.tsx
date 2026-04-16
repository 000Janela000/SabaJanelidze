import { useRef, type ReactNode } from 'react'
import { gsap } from '@/lib/gsap'

interface TiltCardProps {
  children: ReactNode
  className?: string
  strength?: number
}

/**
 * 3D perspective tilt effect on hover.
 * Card rotates toward the cursor position with smooth GSAP easing.
 * Desktop only — no effect on touch devices.
 */
export function TiltCard({ children, className = '', strength = 10 }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return

    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5  // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5   // -0.5 to 0.5

    gsap.to(card, {
      rotateY: x * strength,
      rotateX: -y * strength,
      duration: 0.4,
      ease: 'power2.out',
    })
  }

  const handleMouseLeave = () => {
    const card = cardRef.current
    if (!card) return

    gsap.to(card, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.5)',
    })
  }

  return (
    <div style={{ perspective: '800px' }}>
      <div
        ref={cardRef}
        className={className}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {children}
      </div>
    </div>
  )
}
