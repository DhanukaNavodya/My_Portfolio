import { Environment, Lightformer } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useEffect } from 'react'
import { ACESFilmicToneMapping } from 'three'
import { useTheme } from '../../hooks/useTheme'
import { colors } from '../../styles/tokens'
import { CoreSculpture } from './CoreSculpture'
import { subscribePointer } from './pointer'

/** Small decorative scene for the About section (lazy chunk, mounted only near the viewport). */
export default function AboutCanvas({ animate, lowPower }: { animate: boolean; lowPower: boolean }) {
  useEffect(() => subscribePointer(), [])
  const light = useTheme() === 'light'
  return (
    <Canvas
      dpr={[1, lowPower ? 1.25 : 1.6]}
      camera={{ position: [0, 0, 6.2], fov: 35 }}
      gl={{ antialias: !lowPower, alpha: true, powerPreference: 'high-performance' }}
      onCreated={({ gl }) => (gl.toneMapping = ACESFilmicToneMapping)}
      aria-hidden
    >
      <Environment resolution={64} frames={1}>
        <Lightformer form="rect" intensity={2} position={[-3, 2, 3]} scale={[3, 4, 1]} />
        <Lightformer form="rect" intensity={1.6} color={colors.lime} position={[4, -1, -2]} scale={[1, 5, 1]} />
      </Environment>
      <directionalLight position={[-3, 4, 4]} intensity={1.5} />
      <directionalLight position={[4, -2, -3]} intensity={2} color={colors.lime} />
      <CoreSculpture animate={animate} scale={1.05} accent={light ? '#4d7c0f' : colors.lime} line={light ? '#0b0d0c' : colors.fg} />
    </Canvas>
  )
}
