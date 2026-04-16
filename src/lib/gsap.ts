import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'

gsap.registerPlugin(ScrollTrigger, SplitText, ScrambleTextPlugin)

// Respect prefers-reduced-motion: set all GSAP durations to near-zero
if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  gsap.globalTimeline.timeScale(100)
  ScrollTrigger.defaults({ scrub: false })
}

export { gsap, ScrollTrigger, SplitText, ScrambleTextPlugin }
