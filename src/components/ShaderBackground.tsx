import { lazy, Suspense } from 'react'
import { useDeviceCapability } from '@/hooks/useDeviceCapability'

// Lazy-load the entire R3F/Three.js scene — zero three imports in this file
const ShaderScene = lazy(() => import('@/components/ShaderScene'))

const CSSFallback = () => (
  <div
    className="absolute inset-0"
    style={{
      background: 'radial-gradient(ellipse at 30% 50%, #1a2a5e 0%, #08090d 70%)',
    }}
  />
)

export function ShaderBackground() {
  const { hasWebGL, prefersReducedMotion } = useDeviceCapability()

  if (!hasWebGL || prefersReducedMotion) {
    return <CSSFallback />
  }

  return (
    <div className="absolute inset-0">
      <Suspense fallback={<CSSFallback />}>
        <ShaderScene />
      </Suspense>
    </div>
  )
}
