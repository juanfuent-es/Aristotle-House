export function RefractionBackdrop() {
  return (
    <group position={[0, 0, -2.6]}>
      <mesh position={[-2.7, 1.5, 0]} rotation={[0, 0, -0.35]}>
        <planeGeometry args={[2.4, 5.5]} />
        <meshBasicMaterial color="#c44b31" />
      </mesh>
      <mesh position={[2.85, -1.3, -0.1]} rotation={[0, 0, 0.28]}>
        <circleGeometry args={[1.65, 64]} />
        <meshBasicMaterial color="#284f9d" />
      </mesh>
      <mesh position={[0.2, -2.8, -0.2]} rotation={[0, 0, 0.1]}>
        <planeGeometry args={[4.8, 1.35]} />
        <meshBasicMaterial color="#d8ab3f" />
      </mesh>
    </group>
  )
}
