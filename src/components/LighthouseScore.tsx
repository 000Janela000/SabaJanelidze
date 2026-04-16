import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

interface LighthouseScoreProps {
  score: number
  label: string
  size?: 'sm' | 'lg'
}

function scoreColor(score: number): string {
  if (score >= 90) return '#22c55e'
  if (score >= 50) return '#f59e0b'
  return '#ef4444'
}

const sizeConfig = {
  sm: {
    diameter: 44,
    radius: 18,
    stroke: 3,
    fontSize: 'text-[10px]',
    labelSize: 'text-[8px]',
  },
  lg: {
    diameter: 64,
    radius: 26,
    stroke: 3.5,
    fontSize: 'text-[13px]',
    labelSize: 'text-[9px]',
  },
}

export function LighthouseScore({ score, label, size = 'sm' }: LighthouseScoreProps) {
  const config = sizeConfig[size]
  const { diameter, radius, stroke, fontSize, labelSize } = config

  const containerRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<SVGCircleElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)

  const cx = diameter / 2
  const cy = diameter / 2
  const circumference = 2 * Math.PI * radius

  useEffect(() => {
    if (!containerRef.current || !ringRef.current || !counterRef.current) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduced) {
      // Skip animation, jump to final values
      const targetOffset = circumference * (1 - score / 100)
      gsap.set(ringRef.current, { strokeDashoffset: targetOffset })
      counterRef.current.textContent = String(score)
      return
    }

    const ctx = gsap.context(() => {
      const ring = ringRef.current!
      const counter = counterRef.current!
      const targetOffset = circumference * (1 - score / 100)

      // Initialize
      gsap.set(ring, { strokeDashoffset: circumference })

      // Create timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })

      // Counter object for number animation
      const obj = { val: 0 }

      // Animate ring and counter together
      tl.to(ring, {
        strokeDashoffset: targetOffset,
        duration: 1.4,
        ease: 'power2.out',
      }, 0)

      tl.to(
        obj,
        {
          val: score,
          duration: 1.4,
          ease: 'power2.out',
          onUpdate: () => {
            counter.textContent = String(Math.round(obj.val))
          },
        },
        0
      )
    }, containerRef)

    return () => ctx.revert()
  }, [score, circumference])

  return (
    <div ref={containerRef} className="flex flex-col items-center gap-1.5">
      {/* SVG Ring */}
      <div className="relative" style={{ width: diameter, height: diameter }}>
        <svg
          width={diameter}
          height={diameter}
          viewBox={`0 0 ${diameter} ${diameter}`}
          fill="none"
          aria-hidden="true"
        >
          {/* Track circle (background) */}
          <circle
            cx={cx}
            cy={cy}
            r={radius}
            stroke="var(--color-border)"
            strokeWidth={stroke}
            strokeOpacity={0.6}
            fill="none"
            transform={`rotate(-90, ${cx}, ${cy})`}
          />

          {/* Progress circle (animated) */}
          <circle
            ref={ringRef}
            cx={cx}
            cy={cy}
            r={radius}
            stroke={scoreColor(score)}
            strokeWidth={stroke}
            strokeLinecap="round"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
            transform={`rotate(-90, ${cx}, ${cy})`}
            style={{
              filter: `drop-shadow(0 0 4px ${scoreColor(score)}66)`,
            }}
          />
        </svg>

        {/* Score number — centered over SVG */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            ref={counterRef}
            className={`${fontSize} font-bold leading-none text-text tabular-nums`}
          >
            0
          </span>
        </div>
      </div>

      {/* Label below ring */}
      <span className={`${labelSize} font-semibold tracking-[0.15em] text-text-dim uppercase`}>
        {label}
      </span>
    </div>
  )
}
