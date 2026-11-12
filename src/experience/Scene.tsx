import { useControls } from 'leva'
import { OpticalSubject } from './subjects/OpticalSubject'
import { OrbitingRibbon } from './subjects/OrbitingRibbon'

interface SceneProps {
  debug: boolean
}

export function Scene({ debug }: SceneProps) {
  const material = useControls('Optical material', {
    transmission: { value: 1, min: 0, max: 1, step: 0.01 },
    thickness: { value: 1.35, min: 0, max: 3, step: 0.01 },
    roughness: { value: 0.055, min: 0, max: 1, step: 0.005 },
    ior: { value: 1.52, min: 1, max: 2.33, step: 0.01 },
    chromaticAberration: { value: 0.105, min: 0, max: 0.2, step: 0.001 },
    distortion: { value: 0.14, min: 0, max: 1, step: 0.01 },
  })

  return (
    <>
      <color attach="background" args={['#050505']} />
      <ambientLight intensity={0.18} color="#fff4ee" />
      <directionalLight position={[4, 5, 4]} intensity={3.8} color="#fff2e8" />
      <directionalLight position={[-4, 0, 3]} intensity={3} color="#df211f" />
      <pointLight position={[0, -2, 2]} intensity={20} distance={8} color="#9f090d" />
      <OrbitingRibbon debug={debug} />
      <OpticalSubject material={material} debug={debug} />
    </>
  )
}
