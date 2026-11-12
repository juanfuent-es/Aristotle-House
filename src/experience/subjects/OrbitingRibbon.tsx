import { useFrame } from '@react-three/fiber'
import { useEffect, useMemo } from 'react'
import {
  CanvasTexture,
  DoubleSide,
  PlaneGeometry,
  RepeatWrapping,
  SRGBColorSpace,
} from 'three'

function createRibbonTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 4096
  canvas.height = 256

  const context = canvas.getContext('2d')
  if (!context) throw new Error('Unable to create the ribbon texture')

  context.fillStyle = '#d82420'
  context.fillRect(0, 0, canvas.width, canvas.height)
  context.fillStyle = '#f4efe5'
  context.font = '900 142px Impact, Arial Black, sans-serif'
  context.textAlign = 'left'
  context.textBaseline = 'middle'

  const label = 'COMING SOON  /  ARISTOTLE HOUSE  /  '
  const labelWidth = context.measureText(label).width

  for (let x = -labelWidth; x < canvas.width + labelWidth; x += labelWidth) {
    context.fillText(label, x, canvas.height / 2 + 3)
  }

  const texture = new CanvasTexture(canvas)
  texture.colorSpace = SRGBColorSpace
  texture.wrapS = RepeatWrapping
  texture.repeat.set(1, 1)
  texture.anisotropy = 8
  return texture
}

export function OrbitingRibbon() {
  const texture = useMemo(createRibbonTexture, [])
  const geometry = useMemo(() => {
    const plane = new PlaneGeometry(14, 1.05, 128, 1)
    const positions = plane.attributes.position

    for (let index = 0; index < positions.count; index += 1) {
      const x = positions.getX(index)
      positions.setZ(index, -0.018 * x * x)
    }

    positions.needsUpdate = true
    plane.computeVertexNormals()
    return plane
  }, [])

  useEffect(() => () => {
    texture.dispose()
    geometry.dispose()
  }, [geometry, texture])

  useFrame((_, delta) => {
    texture.offset.x = (texture.offset.x - delta * 0.045) % 1
  })

  return (
    <group position={[0, 0.18, -0.72]} rotation={[0.035, 0, -0.025]}>
      <mesh geometry={geometry}>
        <meshBasicMaterial
          map={texture}
          side={DoubleSide}
          toneMapped={false}
        />
      </mesh>
    </group>
  )
}
