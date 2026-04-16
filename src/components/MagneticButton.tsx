import { useRef, useEffect, type ReactNode } from 'react'
import { gsap } from '@/lib/gsap'

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  as?: 'a' | 'button'
  href?: string
  target?: string
  onClick?: () => void
}

/**
 * Button/link that pulls toward the cursor when it enters a proximity radius.
 * Snaps back with elastic ease when cursor leaves.
 * Uses GSAP quickTo for 60fps movement.
 * Desktop only — no effect on touch devices.
 */
export function MagneticButton({
  children,
  className = '',
  as: Tag = 'button',
  href,
  target,
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const isTouchDevice = window.matchMedia('(hover: none)').matches
    if (isTouchDevice) return

    const xTo = gsap.quickTo(el, 'x', { duration: 0.8, ease: 'elastic.out(1, 0.3)' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.8, ease: 'elastic.out(1, 0.3)' })

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const deltaX = e.clientX - centerX
      const deltaY = e.clientY - centerY
      xTo(deltaX * 0.3)
      yTo(deltaY * 0.3)
    }

    const handleMouseLeave = () => {
      xTo(0)
      yTo(0)
    }

    el.addEventListener('mousemove', handleMouseMove)
    el.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      el.removeEventListener('mousemove', handleMouseMove)
      el.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  const props = {
    ref: ref as React.RefObject<HTMLElement>,
    className: `inline-block ${className}`,
    ...(href && { href }),
    ...(target && { target, rel: 'noopener noreferrer' }),
    ...(onClick && { onClick }),
  }

  // @ts-expect-error -- dynamic tag with ref
  return <Tag {...props}>{children}</Tag>
}
