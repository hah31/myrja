'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, RoundedBox } from '@react-three/drei'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

// ── Star field ────────────────────────────────────────────────────────────────
function StarField() {
  const count = 2000
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 180
      arr[i * 3 + 1] = (Math.random() - 0.5) * 180
      arr[i * 3 + 2] = (Math.random() - 0.5) * 180
    }
    return arr
  }, [count])

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#7090c0" size={0.15} sizeAttenuation transparent opacity={0.65} />
    </points>
  )
}

// ── Padlock ───────────────────────────────────────────────────────────────────
//
// Body    : rounded rectangular box  (RoundedBox from drei)
// Shackle : thick U-tube = CatmullRomCurve3 through two straight legs +
//           a smooth semicircular arch at the top (TubeGeometry)
//
function Padlock() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state, delta) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y += delta * 0.32
    // Subtle tilt sway
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.45) * 0.07
    // Gentle float
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.55) * 0.08
  })

  // ── Shackle path ──────────────────────────────────────────────────────────
  // Body:   1.3 w × 1.05 h × 0.58 d,  center (0, −0.15, 0)
  //         → top at y = −0.15 + 0.525 = 0.375
  // Legs enter the body top (leg bottom y < 0.375).
  // Arch centre at y = 0.58; arch radius = 0.40
  // Leg x separation = ±0.40 (matches arch endpoints perfectly)
  const shackleCurve = useMemo(() => {
    const R   = 0.40   // arch radius  == leg x-offset
    const cyY = 0.58   // arch centre y (above body top 0.375)
    const legBotY = 0.12  // leg bottom y  (inside body, 0.12 < 0.375)

    const pts: THREE.Vector3[] = []

    // ── Left leg (straight, going up) ─────────────────────────────────────
    pts.push(new THREE.Vector3(-R, legBotY, 0))
    pts.push(new THREE.Vector3(-R, 0.34, 0))
    pts.push(new THREE.Vector3(-R, cyY,   0))   // leg top = arch left end

    // ── Arch (semicircle, angle π → 0, interior points only) ─────────────
    const N = 22
    for (let i = 1; i < N; i++) {
      const a = Math.PI - (i / N) * Math.PI   // π … approaching 0
      pts.push(new THREE.Vector3(
        Math.cos(a) * R,
        cyY + Math.sin(a) * R,
        0,
      ))
    }

    // ── Right leg (straight, going down) ──────────────────────────────────
    pts.push(new THREE.Vector3( R, cyY,    0))  // arch right end = leg top
    pts.push(new THREE.Vector3( R, 0.34,   0))
    pts.push(new THREE.Vector3( R, legBotY, 0))

    return new THREE.CatmullRomCurve3(pts)
  }, [])

  // ── Shared chrome material props ──────────────────────────────────────────
  // A slight blue tinge in the base colour; fully metallic + clearcoat
  // gives the polished-chrome look. envMapIntensity boosts reflections.
  const m = {
    color:                 '#b2c2d8' as THREE.ColorRepresentation, // silver-blue
    metalness:             1,
    roughness:             0.07,
    clearcoat:             1,
    clearcoatRoughness:    0.04,
    envMapIntensity:       3.0,
  }

  return (
    <group ref={groupRef}>

      {/* ── Lock body ───────────────────────────────────────────────────── */}
      {/* RoundedBox from drei gives smooth bevelled edges */}
      <RoundedBox
        args={[1.3, 1.05, 0.58]}
        radius={0.07}
        smoothness={6}
        position={[0, -0.15, 0]}
      >
        <meshPhysicalMaterial {...m} />
      </RoundedBox>

      {/* ── Shackle (U-tube) ────────────────────────────────────────────── */}
      <mesh>
        <tubeGeometry args={[shackleCurve, 96, 0.115, 22, false]} />
        <meshPhysicalMaterial {...m} />
      </mesh>

      {/* ── Keyhole indentation on the front face ───────────────────────── */}
      {/* Dark circle slot centred slightly below the body centre */}
      <mesh position={[0, -0.08, 0.292]}>
        <circleGeometry args={[0.075, 40]} />
        <meshBasicMaterial color="#010109" />
      </mesh>
      {/* Keyhole stem (the teardrop lower part) */}
      <mesh position={[0, -0.19, 0.292]}>
        <circleGeometry args={[0.038, 40]} />
        <meshBasicMaterial color="#010109" />
      </mesh>
      <mesh position={[0, -0.145, 0.292]}>
        <planeGeometry args={[0.06, 0.1]} />
        <meshBasicMaterial color="#010109" />
      </mesh>

    </group>
  )
}

// ── Scene ─────────────────────────────────────────────────────────────────────
export default function LockScene() {
  return (
    <Canvas
      camera={{ position: [0, 0.15, 5.2], fov: 44 }}
      style={{ width: '100%', height: '100%' }}
      dpr={[1, 2]}
    >
      {/* Background colour (avoids flash of white) */}
      <color attach="background" args={['#050508']} />

      {/* Environment map — critical for chrome reflections */}
      <Environment preset="studio" background={false} />

      {/* Lighting */}
      <ambientLight intensity={0.25} color="#c0d0ff" />
      {/* Key light: bright white from upper-right-front */}
      <directionalLight position={[3, 5, 4]}  intensity={4.5} color="#ffffff" />
      {/* Fill light: cool blue from left */}
      <directionalLight position={[-4, 2, 3]} intensity={2.0} color="#4a7ad0" />
      {/* Rim / underlight: deep blue from below */}
      <directionalLight position={[0, -4, 2]} intensity={1.2} color="#1a3070" />
      {/* Subtle blue point to add local glow */}
      <pointLight position={[0, 0, 5]} intensity={1.0} color="#6090e0" />

      <StarField />
      <Padlock />
    </Canvas>
  )
}
