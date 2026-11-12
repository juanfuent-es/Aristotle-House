import { Bloom, ChromaticAberration, EffectComposer, Noise, Vignette } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { Vector2 } from 'three'

const globalChromaticOffset = new Vector2(0.00035, 0.0002)

export function PostEffects() {
  return (
    <EffectComposer multisampling={0}>
      <Bloom mipmapBlur intensity={0.28} luminanceThreshold={0.72} luminanceSmoothing={0.35} />
      <ChromaticAberration
        offset={globalChromaticOffset}
        radialModulation
        modulationOffset={0.35}
        opacity={0.42}
      />
      <Noise blendFunction={BlendFunction.SOFT_LIGHT} opacity={0.035} premultiply />
      <Vignette offset={0.22} darkness={0.42} />
    </EffectComposer>
  )
}
