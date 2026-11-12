import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import { ShaderMaterial, Vector2, type WebGLRenderTarget } from 'three'

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
  target: WebGLRenderTarget
}

const vertexShader = /* glsl */ `
  varying vec3 vNormalView;
  varying vec3 vViewDirection;

  void main() {
    vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
    vNormalView = normalize(normalMatrix * normal);
    vViewDirection = normalize(-viewPosition.xyz);
    gl_Position = projectionMatrix * viewPosition;
  }
`

const fragmentShader = /* glsl */ `
  uniform sampler2D uBuffer;
  uniform vec2 uResolution;
  uniform float uTime;
  uniform float uTransmission;
  uniform float uThickness;
  uniform float uRoughness;
  uniform float uIor;
  uniform float uChromatic;
  uniform float uDistortion;

  varying vec3 vNormalView;
  varying vec3 vViewDirection;

  vec2 safeUv(vec2 uv) {
    return clamp(uv, vec2(0.002), vec2(0.998));
  }

  vec3 refractedSample(vec2 uv, vec2 offset, float chromatic) {
    float red = texture2D(uBuffer, safeUv(uv + offset * (1.0 + chromatic))).r;
    float green = texture2D(uBuffer, safeUv(uv + offset)).g;
    float blue = texture2D(uBuffer, safeUv(uv + offset * (1.0 - chromatic))).b;
    return vec3(red, green, blue);
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / uResolution;
    vec3 normal = normalize(vNormalView);
    vec3 viewDirection = normalize(vViewDirection);
    float eta = 1.0 / max(uIor, 1.001);
    vec3 refractedDirection = refract(-viewDirection, normal, eta);

    float waveA = sin(uv.y * 34.0 + uTime * 0.65);
    float waveB = cos(uv.x * 27.0 - uTime * 0.48);
    vec2 noiseOffset = vec2(waveA, waveB) * uDistortion * 0.006;

    float refractionStrength = 0.018 + uThickness * 0.026;
    vec2 offset = (refractedDirection.xy * 0.7 + normal.xy * 0.9) * refractionStrength + noiseOffset;
    float chromatic = uChromatic * 0.85;
    vec3 sharp = refractedSample(uv, offset, chromatic);

    vec2 blurStep = vec2(0.0055) * uRoughness;
    vec3 blurred = (
      refractedSample(uv + vec2( blurStep.x, 0.0), offset, chromatic) +
      refractedSample(uv + vec2(-blurStep.x, 0.0), offset, chromatic) +
      refractedSample(uv + vec2(0.0,  blurStep.y), offset, chromatic) +
      refractedSample(uv + vec2(0.0, -blurStep.y), offset, chromatic)
    ) * 0.25;

    vec3 refractedColor = mix(sharp, blurred, clamp(uRoughness * 1.4, 0.0, 1.0));
    float fresnel = pow(1.0 - clamp(abs(dot(normal, viewDirection)), 0.0, 1.0), 2.4);
    vec3 glass = mix(vec3(0.025, 0.028, 0.032), refractedColor * 1.12, uTransmission);

    vec3 keyDirection = normalize(vec3(-0.45, 0.72, 0.52));
    float key = pow(max(dot(normal, keyDirection), 0.0), 18.0);
    float rim = pow(fresnel, 1.35);
    glass += vec3(1.0, 0.96, 0.91) * key * 0.95;
    glass = mix(glass, vec3(0.92, 0.95, 1.0), rim * 0.62);
    glass += vec3(0.34, 0.015, 0.012) * rim * 0.28;

    gl_FragColor = vec4(glass, 1.0);
  }
`

export function OpticalMaterial({ settings, target }: OpticalMaterialProps) {
  const material = useRef<ShaderMaterial>(null)
  const uniforms = useMemo(() => ({
    uBuffer: { value: target.texture },
    uResolution: { value: new Vector2(target.width, target.height) },
    uTime: { value: 0 },
    uTransmission: { value: settings.transmission },
    uThickness: { value: settings.thickness },
    uRoughness: { value: settings.roughness },
    uIor: { value: settings.ior },
    uChromatic: { value: settings.chromaticAberration },
    uDistortion: { value: settings.distortion },
  }), [target.texture])

  useFrame(({ clock }) => {
    if (!material.current) return
    const values = material.current.uniforms
    values.uBuffer.value = target.texture
    values.uResolution.value.set(target.width, target.height)
    values.uTime.value = clock.elapsedTime
    values.uTransmission.value = settings.transmission
    values.uThickness.value = settings.thickness
    values.uRoughness.value = settings.roughness
    values.uIor.value = settings.ior
    values.uChromatic.value = settings.chromaticAberration
    values.uDistortion.value = settings.distortion
  })

  return (
    <shaderMaterial
      ref={material}
      uniforms={uniforms}
      vertexShader={vertexShader}
      fragmentShader={fragmentShader}
      toneMapped={false}
    />
  )
}
