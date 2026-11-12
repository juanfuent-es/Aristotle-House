import { MeshTransmissionMaterial } from '@react-three/drei'
import { Color } from 'three'

const refractionBackground = new Color('#050505')

export interface OpticalMaterialSettings {
  transmission: number
  thickness: number
  roughness: number
  ior: number
  chromaticAberration: number
  distortion: number
}

interface OpticalMaterialProps {
  settings: OpticalMaterialSettings
}

export function OpticalMaterial({ settings }: OpticalMaterialProps) {
  return (
    <MeshTransmissionMaterial
      {...settings}
      background={refractionBackground}
      color="#ffaaa0"
      attenuationColor="#df211f"
      attenuationDistance={1.8}
      anisotropicBlur={0.035}
      clearcoat={1}
      clearcoatRoughness={0.06}
      distortionScale={0.3}
      temporalDistortion={0.025}
      samples={8}
      resolution={768}
    />
  )
}
