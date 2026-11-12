import type { OpticalMaterialSettings } from './materials/OpticalMaterial'
import { OpticalSubject } from './subjects/OpticalSubject'
import { OrbitingRibbon } from './subjects/OrbitingRibbon'

interface SceneProps {
  debug: boolean
  material: OpticalMaterialSettings
}

export function Scene({ debug, material }: SceneProps) {
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
