import { Float, useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import { Mesh, type BufferGeometry, type Group } from 'three'
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

  useFrame(({ pointer }, delta) => {
    if (!subject.current || debug) return

    subject.current.rotation.y += delta * 0.09
    subject.current.rotation.x += (pointer.y * 0.16 - subject.current.rotation.x) * 0.035
    subject.current.rotation.z += (-pointer.x * 0.1 - subject.current.rotation.z) * 0.035
  })

  return (
    <Float speed={1.25} rotationIntensity={0.18} floatIntensity={0.35}>
      <group ref={subject} position={[0, -0.22, 0]} rotation={[0.02, -0.28, 0]}>
        <mesh geometry={geometry ?? undefined} scale={0.0094}>
          <OpticalMaterial settings={material} />
        </mesh>
      </group>
    </Float>
  )
}

useGLTF.preload(modelUrl)
