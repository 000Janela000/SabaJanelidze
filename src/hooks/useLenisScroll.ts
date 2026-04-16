import { useSyncExternalStore } from 'react'
import type Lenis from 'lenis'
import { subscribe, getSnapshot, getServerSnapshot } from '@/lib/lenis-store'

/**
 * Returns the Lenis instance for programmatic scrolling.
 * Use lenis.scrollTo('#target') or lenis.scrollTo(0, { immediate: true })
 * instead of native window.scrollTo or scrollIntoView.
 */
export function useLenisScroll(): Lenis | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
