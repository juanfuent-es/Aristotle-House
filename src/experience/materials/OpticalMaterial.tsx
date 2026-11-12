import { MeshTransmissionMaterial } from '@react-three/drei'

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
      color="#f0ede5"
      anisotropicBlur={0.12}
      distortionScale={0.35}
      temporalDistortion={0.08}
      samples={6}
      resolution={512}
    />
  )
}
