import { AdaptiveDpr } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Leva } from 'leva'
import { Suspense } from 'react'
import { experienceConfig } from './config'
import { Scene } from './Scene'

interface ExperienceCanvasProps {
  debug: boolean
}

export default function ExperienceCanvas({ debug }: ExperienceCanvasProps) {
  return (
    <>
      <div className="canvas-layer" aria-hidden="true">
        <Canvas
          camera={experienceConfig.camera}
          dpr={[1, 1.75]}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        >
          <Suspense fallback={null}>
            <Scene debug={debug} />
          </Suspense>
          <AdaptiveDpr pixelated />
        </Canvas>
      </div>
      <Leva hidden={!debug} collapsed titleBar={{ title: 'Material study' }} />
    </>
  )
}
