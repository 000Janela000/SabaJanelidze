import type Lenis from 'lenis'

let lenisInstance: Lenis | null = null
const listeners = new Set<() => void>()

export function subscribe(cb: () => void) {
  listeners.add(cb)
  return () => {
    listeners.delete(cb)
  }
}

export function getSnapshot() {
  return lenisInstance
}

export function getServerSnapshot() {
  return null
}

export function setLenisInstance(instance: Lenis | null) {
  lenisInstance = instance
  listeners.forEach((cb) => cb())
}
