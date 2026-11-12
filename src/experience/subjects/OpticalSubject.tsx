import { Float } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import type { Group } from 'three'
import { OpticalMaterial, type OpticalMaterialSettings } from '../materials/OpticalMaterial'

interface OpticalSubjectProps {
  material: OpticalMaterialSettings
  debug: boolean
}

export function OpticalSubject({ material, debug }: OpticalSubjectProps) {
  const subject = useRef<Group>(null)

  useFrame(({ pointer }, delta) => {
    if (!subject.current || debug) return

    subject.current.rotation.y += delta * 0.09
    subject.current.rotation.x += (pointer.y * 0.16 - subject.current.rotation.x) * 0.035
    subject.current.rotation.z += (-pointer.x * 0.1 - subject.current.rotation.z) * 0.035
  })

  return (
    <Float speed={1.25} rotationIntensity={0.18} floatIntensity={0.35}>
      <group ref={subject} rotation={[0.1, -0.35, -0.08]}>
        <mesh castShadow scale={1.35}>
          <icosahedronGeometry args={[1.25, 1]} />
          <OpticalMaterial settings={material} />
        </mesh>
      </group>
    </Float>
  )
}
