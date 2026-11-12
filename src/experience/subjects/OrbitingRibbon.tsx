import { useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import {
  BackSide,
  CanvasTexture,
  MathUtils,
  RepeatWrapping,
  SRGBColorSpace,
  type Group,
} from 'three'

function createRibbonTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 2048
  canvas.height = 256

  const context = canvas.getContext('2d')
  if (!context) throw new Error('Unable to create the ribbon texture')

  context.fillStyle = '#df211f'
  context.fillRect(0, 0, canvas.width, canvas.height)
  context.fillStyle = '#050505'
  context.font = '900 142px Impact, Arial Black, sans-serif'
  context.textAlign = 'left'
  context.textBaseline = 'middle'

  const label = 'COMING SOON  ✦  '
  const labelWidth = context.measureText(label).width

  for (let x = -labelWidth; x < canvas.width + labelWidth; x += labelWidth) {
    context.fillText(label, x, canvas.height / 2 + 3)
  }

  const texture = new CanvasTexture(canvas)
  texture.colorSpace = SRGBColorSpace
  texture.wrapS = RepeatWrapping
  texture.repeat.set(-1, 1)
  texture.offset.x = 1
  texture.anisotropy = 8
  return texture
}

interface OrbitingRibbonProps {
  debug: boolean
}

export function OrbitingRibbon({ debug }: OrbitingRibbonProps) {
  const ribbon = useRef<Group>(null)
  const texture = useMemo(createRibbonTexture, [])

  useEffect(() => () => texture.dispose(), [texture])

  useFrame(({ clock, pointer }, delta) => {
    if (!ribbon.current || debug) return

    const targetRotation = clock.elapsedTime * 0.1 + pointer.x * 1.15
    ribbon.current.rotation.y = MathUtils.damp(
      ribbon.current.rotation.y,
      targetRotation,
      4.5,
      delta,
    )
  })

  return (
    <group ref={ribbon} position={[0, 0.26, -0.08]} rotation={[0.035, 0, -0.035]}>
      <mesh>
        <cylinderGeometry args={[1.68, 1.68, 0.6, 128, 1, true]} />
        <meshBasicMaterial
          map={texture}
          side={BackSide}
          toneMapped={false}
        />
      </mesh>
    </group>
  )
}
