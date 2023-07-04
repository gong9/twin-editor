import type { FC } from 'react'
import { useRef, useState } from 'react'
import type { Vector3 } from 'three'
import { useFrame } from '@react-three/fiber'

import type { GeometryType, MaterialType } from '@/type/SchemaType'

interface RenderMeshProps {
  geometry: GeometryType
  material: MaterialType
  position: Vector3
}

const RenderMesh: FC<RenderMeshProps> = ({ geometry, material, position }) => {
  const ref = useRef(null)
  const [hovered, setHover] = useState(false)

  useFrame(({ mouse }) => {

  })

  return (
    <mesh
      ref={ref}
      position={[position.x, position.y, position.z]}
      scale={1}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      >
      <boxGeometry args={[geometry.width, geometry.height, geometry.depth]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : material.color || 'red'} />
    </mesh>
  )
}

export default RenderMesh
