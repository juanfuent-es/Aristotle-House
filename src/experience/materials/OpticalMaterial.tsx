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
      color="#d93431"
      attenuationColor="#df211f"
      attenuationDistance={0.7}
      anisotropicBlur={0.045}
      clearcoat={1}
      clearcoatRoughness={0.08}
      distortionScale={0.38}
      temporalDistortion={0.025}
      samples={8}
      resolution={768}
    />
  )
}
