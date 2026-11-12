import { useControls } from 'leva'
import { OpticalSubject } from './subjects/OpticalSubject'

interface SceneProps {
  debug: boolean
}

export function Scene({ debug }: SceneProps) {
  const material = useControls('Optical material', {
    transmission: { value: 0.72, min: 0, max: 1, step: 0.01 },
    thickness: { value: 0.7, min: 0, max: 3, step: 0.01 },
    roughness: { value: 0.16, min: 0, max: 1, step: 0.01 },
    ior: { value: 1.42, min: 1, max: 2.33, step: 0.01 },
    chromaticAberration: { value: 0.035, min: 0, max: 0.2, step: 0.001 },
    distortion: { value: 0.08, min: 0, max: 1, step: 0.01 },
  })

  return (
    <>
      <color attach="background" args={['#050505']} />
      <ambientLight intensity={0.42} color="#ff201c" />
      <directionalLight position={[4, 5, 4]} intensity={3.4} color="#ff372f" />
      <directionalLight position={[-4, 0, 3]} intensity={2.2} color="#7e0004" />
      <pointLight position={[0, -2, 2]} intensity={28} distance={8} color="#e51f1b" />
      <OpticalSubject material={material} debug={debug} />
    </>
  )
}
