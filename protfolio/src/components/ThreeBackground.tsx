import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function FloatingSphere() {
  const meshRef = useRef<THREE.Mesh>(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  useMemo(() => {
    const handleMouse = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouseRef.current.y = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [])

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.elapsedTime
    meshRef.current.rotation.x = t * 0.1
    meshRef.current.rotation.y = t * 0.15
    meshRef.current.position.x += (mouseRef.current.x * 1 - meshRef.current.position.x) * 0.01
    meshRef.current.position.y += (mouseRef.current.y * 1 - meshRef.current.position.y) * 0.01
  })

  return (
    <mesh ref={meshRef} scale={2}>
      <sphereGeometry args={[1.5, 64, 64]} />
      <meshStandardMaterial
        color="#1a1a2e"
        roughness={0.3}
        metalness={0.6}
        transparent
        opacity={0.4}
        wireframe
      />
    </mesh>
  )
}

function Particles() {
  const count = 800
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count * 3; i++) {
      pos[i] = (Math.random() - 0.5) * 20
    }
    return pos
  }, [])

  const ref = useRef<THREE.Points>(null)

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.005
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.01} color="#fff" transparent opacity={0.3} sizeAttenuation />
    </points>
  )
}

export default function ThreeBackground() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
      <color attach="background" args={['#000']} />
      <ambientLight intensity={0.3} />
      <directionalLight position={[3, 3, 3]} intensity={0.4} />
      <FloatingSphere />
      <Particles />
    </Canvas>
  )
}
