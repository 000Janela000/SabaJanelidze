import { useState, useEffect } from 'react'

interface DeviceCapability {
  prefersReducedMotion: boolean
  hasWebGL: boolean
  isMobile: boolean
}

// Singleton WebGL check — runs once, avoids creating throwaway contexts per component
const _hasWebGL = (() => {
  if (typeof window === 'undefined') return false
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl') || c.getContext('experimental-webgl'))
  } catch {
    return false
  }
})()

export function useDeviceCapability(): DeviceCapability {
  const [capability, setCapability] = useState<DeviceCapability>(() => {
    if (typeof window === 'undefined') {
      return { prefersReducedMotion: false, hasWebGL: false, isMobile: false }
    }
    return {
      prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      hasWebGL: _hasWebGL,
      isMobile: window.innerWidth <= 768,
    }
  })

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleMotionChange = (e: MediaQueryListEvent) => {
      setCapability((prev) => ({ ...prev, prefersReducedMotion: e.matches }))
    }
    motionQuery.addEventListener('change', handleMotionChange)
    return () => motionQuery.removeEventListener('change', handleMotionChange)
  }, [])

  return capability
}
