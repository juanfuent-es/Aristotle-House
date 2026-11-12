import { Float, useFBO, useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import { MathUtils, Mesh, type BufferGeometry, type Group } from 'three'
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import { OpticalMaterial, type OpticalMaterialSettings } from '../materials/OpticalMaterial'

const modelUrl = `${import.meta.env.BASE_URL}models/aristotle-bust.glb`

interface OpticalSubjectProps {
  material: OpticalMaterialSettings
  debug: boolean
}

export function OpticalSubject({ material, debug }: OpticalSubjectProps) {
  const subject = useRef<Group>(null)
  const { scene } = useGLTF(modelUrl)
  const refractionTarget = useFBO({ samples: 2, depthBuffer: true })

  const geometry = useMemo(() => {
    scene.updateMatrixWorld(true)
    const parts: BufferGeometry[] = []

    scene.traverse((child) => {
      if (!(child instanceof Mesh)) return
      const part = child.geometry.clone()
      part.applyMatrix4(child.matrixWorld)
      parts.push(part)
    })

    const merged = mergeGeometries(parts, false)
    parts.forEach((part) => part.dispose())
    merged?.center()
    merged?.computeBoundingSphere()
    return merged
  }, [scene])

  useEffect(() => () => geometry?.dispose(), [geometry])

  useFrame((state, delta) => {
    if (!subject.current || debug) return

    const previousTarget = state.gl.getRenderTarget()
    subject.current.visible = false
    state.gl.setRenderTarget(refractionTarget)
    state.gl.clear()
    state.gl.render(state.scene, state.camera)
    state.gl.setRenderTarget(previousTarget)
    subject.current.visible = true

    const { pointer } = state

    subject.current.rotation.y = MathUtils.damp(
      subject.current.rotation.y,
      -0.28 - pointer.x * 0.62,
      4.2,
      delta,
    )
    subject.current.rotation.x = MathUtils.damp(
      subject.current.rotation.x,
      0.02 + pointer.y * 0.13,
      4.2,
      delta,
    )
    subject.current.rotation.z = MathUtils.damp(
      subject.current.rotation.z,
      pointer.x * 0.055,
      4.2,
      delta,
    )
  })

  return (
    <Float speed={1.25} rotationIntensity={0.18} floatIntensity={0.35}>
      <group ref={subject} position={[0, -0.22, 0]} rotation={[0.02, -0.28, 0]}>
        <mesh geometry={geometry ?? undefined} scale={0.0094}>
          <OpticalMaterial settings={material} target={refractionTarget} />
        </mesh>
      </group>
    </Float>
  )
}

useGLTF.preload(modelUrl)
