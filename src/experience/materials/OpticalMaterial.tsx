import { MeshTransmissionMaterial } from '@react-three/drei'
import { Color } from 'three'

const refractionBackground = new Color('#8f0e12')

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
      color="#d51f20"
      attenuationColor="#e32526"
      attenuationDistance={1.4}
      anisotropicBlur={0.08}
      clearcoat={1}
      clearcoatRoughness={0.12}
      distortionScale={0.22}
      temporalDistortion={0.035}
      samples={6}
      resolution={512}
    />
  )
}
