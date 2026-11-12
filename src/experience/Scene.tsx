import { useControls } from 'leva'
import { OpticalSubject } from './subjects/OpticalSubject'
import { RefractionBackdrop } from './lighting/RefractionBackdrop'

interface SceneProps {
  debug: boolean
}

export function Scene({ debug }: SceneProps) {
  const material = useControls('Optical material', {
    transmission: { value: 1, min: 0, max: 1, step: 0.01 },
    thickness: { value: 1.15, min: 0, max: 3, step: 0.01 },
    roughness: { value: 0.08, min: 0, max: 1, step: 0.01 },
    ior: { value: 1.35, min: 1, max: 2.33, step: 0.01 },
    chromaticAberration: { value: 0.055, min: 0, max: 0.2, step: 0.001 },
    distortion: { value: 0.16, min: 0, max: 1, step: 0.01 },
  })

  return (
    <>
      <color attach="background" args={['#d8d2c5']} />
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 5, 4]} intensity={2.2} color="#fff8e8" />
      <directionalLight position={[-4, -2, 2]} intensity={1.4} color="#7194ff" />
      <RefractionBackdrop />
      <OpticalSubject material={material} debug={debug} />
    </>
  )
}
