'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

// ── Stars ────────────────────────────────────────────────────────────────────
function StarField() {
  const count = 2400
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 200
      arr[i * 3 + 1] = (Math.random() - 0.5) * 200
      arr[i * 3 + 2] = (Math.random() - 0.5) * 200
    }
    return arr
  }, [count])

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial color="#6b93d6" size={0.18} sizeAttenuation transparent opacity={0.7} />
    </points>
  )
}

// ── Lock body ─────────────────────────────────────────────────────────────────
function LockMesh() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state, delta) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y += delta * 0.18
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.25) * 0.12
    // Gentle float
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.06
  })

  const material = (
    <meshPhysicalMaterial
      color="#050515"
      metalness={1}
      roughness={0.05}
      emissive={new THREE.Color('#1e3a8a')}
      emissiveIntensity={0.45}
      clearcoat={1}
      clearcoatRoughness={0}
    />
  )

  return (
    <group ref={groupRef}>
      {/* Lock body: wide torus */}
      <mesh position={[0, -0.55, 0]}>
        <torusGeometry args={[1.1, 0.48, 48, 96]} />
        {material}
      </mesh>

      {/* Shackle: half-torus arc, opening downward so it connects to body */}
      <mesh position={[0, 0.52, 0]} rotation={[0, 0, Math.PI]}>
        <torusGeometry args={[0.72, 0.22, 48, 64, Math.PI]} />
        {material}
      </mesh>

      {/* Keyhole cylinder */}
      <mesh position={[0, -0.55, 0.6]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.13, 0.13, 0.04, 32]} />
        <meshBasicMaterial color="#000010" />
      </mesh>

      {/* Wireframe accent on body */}
      <mesh position={[0, -0.55, 0]}>
        <torusGeometry args={[1.13, 0.49, 16, 40]} />
        <meshBasicMaterial color="#3b82f6" wireframe transparent opacity={0.18} />
      </mesh>
    </group>
  )
}

// ── Bloom ring ────────────────────────────────────────────────────────────────
function GlowRing() {
  const ringRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!ringRef.current) return
    const t = state.clock.elapsedTime
    ringRef.current.rotation.z = t * 0.05
    const pulse = 1 + Math.sin(t * 0.6) * 0.04
    ringRef.current.scale.setScalar(pulse)
    ;(ringRef.current.material as THREE.MeshBasicMaterial).opacity =
      0.06 + Math.sin(t * 0.8) * 0.02
  })

  return (
    <mesh ref={ringRef} position={[0, -0.55, 0]}>
      <torusGeometry args={[2.4, 0.04, 16, 120]} />
      <meshBasicMaterial color="#3b82f6" transparent opacity={0.06} />
    </mesh>
  )
}

// ── Scene export ──────────────────────────────────────────────────────────────
export default function LockScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6.5], fov: 48 }}
      style={{ background: '#050508', width: '100%', height: '100%' }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.08} />
      <pointLight position={[3, 4, 3]} intensity={3} color="#3b82f6" />
      <pointLight position={[-3, -4, 2]} intensity={1.5} color="#1d4ed8" />
      <pointLight position={[0, 0, 5]} intensity={0.5} color="#60a5fa" />

      <StarField />
      <LockMesh />
      <GlowRing />
    </Canvas>
  )
}
