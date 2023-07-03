import type { FC } from 'react'
import type { Vector3 } from 'three'
import { useFrame } from '@react-three/fiber'

import type { GeometryType, MaterialType } from '@/type/SchemaType'

interface RenderMeshProps {
  geometry: GeometryType
  material: MaterialType
  position: Vector3
}

const RenderMesh: FC<RenderMeshProps> = ({ geometry, material, position }) => {
  return (
    <mesh
      position={[position.x, position.y, position.z]}
      scale={1}
      >
      <boxGeometry args={[geometry.width, geometry.height, geometry.depth]} />
      <meshStandardMaterial color='red' />
    </mesh>
  )
}

export default RenderMesh
