import { Float } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import type { Group } from 'three'
import { colors } from '../../styles/tokens'
import { pointer } from './pointer'

/**
 * Abstract metallic core used where the character cannot be shown (model failed to load),
 * and as the interactive decorative object in the About section.
 */
export function CoreSculpture({
  animate = true,
  scale = 1,
  accent = colors.lime,
  line = colors.fg,
}: {
  animate?: boolean
  scale?: number
  accent?: string
  line?: string
}) {
  const group = useRef<Group>(null)
  const inner = useRef<Group>(null)

  useFrame((_, dt) => {
    if (!group.current || !inner.current) return
    if (animate) {
      inner.current.rotation.y += dt * 0.25
      inner.current.rotation.x += dt * 0.08
    }
    // Pointer-driven tilt (damped)
    const k = 1 - Math.exp(-dt * 3)
    group.current.rotation.y += (pointer.x * 0.5 - group.current.rotation.y) * k
    group.current.rotation.x += (-pointer.y * 0.35 - group.current.rotation.x) * k
  })

  return (
    <Float speed={animate ? 1.4 : 0} floatIntensity={animate ? 0.8 : 0} rotationIntensity={0}>
      <group ref={group} scale={scale}>
        <group ref={inner}>
          <mesh>
            <icosahedronGeometry args={[1, 0]} />
            <meshStandardMaterial color={colors.ink3} metalness={1} roughness={0.22} flatShading />
          </mesh>
          <mesh scale={1.32}>
            <icosahedronGeometry args={[1, 1]} />
            <meshBasicMaterial color={accent} wireframe transparent opacity={0.35} />
          </mesh>
          <mesh rotation={[Math.PI / 2.4, 0, 0]}>
            <torusGeometry args={[1.75, 0.012, 8, 160]} />
            <meshBasicMaterial color={accent} transparent opacity={0.6} toneMapped={false} />
          </mesh>
          <mesh rotation={[Math.PI / 1.8, 0.6, 0]}>
            <torusGeometry args={[2.1, 0.008, 8, 160]} />
            <meshBasicMaterial color={line} transparent opacity={0.25} />
          </mesh>
        </group>
      </group>
    </Float>
  )
}
