import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Mesh, Vector2, Color } from 'three'
import vertexShader from '@/shaders/heroVertex.glsl?raw'
import fragmentShader from '@/shaders/heroFragment.glsl?raw'

function ShaderPlane() {
  const meshRef = useRef<Mesh>(null)
  const { size } = useThree()

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new Vector2(0.5, 0.5) },
      uResolution: { value: new Vector2(size.width, size.height) },
      uColorA: { value: new Color('#08090d') },
      uColorB: { value: new Color('#1a2a5e') },
      uColorC: { value: new Color('#2d1b4e') },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  useEffect(() => {
    uniforms.uResolution.value.set(size.width, size.height)
  }, [size, uniforms])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      uniforms.uMouse.value.set(
        e.clientX / window.innerWidth,
        1.0 - e.clientY / window.innerHeight
      )
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [uniforms])

  useFrame((_, delta) => {
    uniforms.uTime.value += delta
  })

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
      />
    </mesh>
  )
}

export default function ShaderScene() {
  return (
    <Canvas
      gl={{ antialias: false, alpha: false }}
      camera={{ position: [0, 0, 1] }}
      dpr={Math.min(window.devicePixelRatio, 1.5)}
      style={{ position: 'absolute', inset: 0 }}
    >
      <ShaderPlane />
    </Canvas>
  )
}
