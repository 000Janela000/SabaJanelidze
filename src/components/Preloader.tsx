import { useEffect, useRef } from 'react'
import { gsap, ScrambleTextPlugin } from '@/lib/gsap'

void ScrambleTextPlugin

interface PreloaderProps {
  onComplete: () => void
}

export function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)
  const nameRef = useRef<HTMLSpanElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  useEffect(() => {
    const container = containerRef.current
    const counter = counterRef.current
    const name = nameRef.current
    const bar = barRef.current
    if (!container || !counter || !name || !bar) return

    // Reset DOM state so re-initialization (StrictMode) works
    counter.textContent = '0'
    name.textContent = '\u00A0'
    gsap.set(bar, { width: '0%' })
    gsap.set(container, { yPercent: 0 })

    const tl = gsap.timeline({
      onComplete: () => {
        onCompleteRef.current()
      },
    })

    const counterObj = { val: 0 }
    tl.to(counterObj, {
      val: 100,
      duration: 1.8,
      ease: 'power2.inOut',
      onUpdate: () => {
        counter.textContent = Math.round(counterObj.val).toString()
      },
    })
    tl.to(bar, { width: '100%', duration: 1.8, ease: 'power2.inOut' }, '<')

    tl.to(
      name,
      {
        duration: 1.2,
        scrambleText: {
          text: 'Saba Janelidze',
          chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
          speed: 0.6,
          revealDelay: 0.3,
        },
      },
      '-=0.8'
    )

    tl.to({}, { duration: 0.3 })

    tl.to(container, {
      yPercent: -100,
      duration: 0.8,
      ease: 'power3.inOut',
    })

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-bg"
      aria-hidden="true"
    >
      <span
        ref={counterRef}
        className="font-mono text-7xl font-normal tabular-nums text-text-dim sm:text-8xl"
      >
        0
      </span>
      <span
        ref={nameRef}
        className="mt-4 h-6 text-sm font-medium tracking-[0.3em] text-text-muted uppercase"
      >
        &nbsp;
      </span>
      <div className="absolute bottom-0 left-0 h-px w-full bg-border">
        <div
          ref={barRef}
          className="h-full bg-accent"
          style={{ width: '0%' }}
        />
      </div>
    </div>
  )
}
