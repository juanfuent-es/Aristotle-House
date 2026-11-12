import { AdaptiveDpr } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense, useState } from 'react'
import { experienceConfig } from './config'
import { MaterialGui } from './controls/MaterialGui'
import type { OpticalMaterialSettings } from './materials/OpticalMaterial'
import { Scene } from './Scene'

interface ExperienceCanvasProps {
  debug: boolean
}

export default function ExperienceCanvas({ debug }: ExperienceCanvasProps) {
  const [material, setMaterial] = useState<OpticalMaterialSettings>({
    transmission: 0.78,
    thickness: 1.7,
    roughness: 0.1,
    ior: 1.52,
    chromaticAberration: 0.12,
    distortion: 0.16,
  })

  return (
    <>
      <div className="canvas-layer" aria-hidden="true">
        <Canvas
          camera={experienceConfig.camera}
          dpr={[1, 1.75]}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        >
          <Suspense fallback={null}>
            <Scene debug={debug} material={material} />
          </Suspense>
          <AdaptiveDpr pixelated />
        </Canvas>
      </div>
      <MaterialGui setSettings={setMaterial} />
    </>
  )
}
