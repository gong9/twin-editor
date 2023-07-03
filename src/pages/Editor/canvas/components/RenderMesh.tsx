import type { FC } from 'react'
import { Vector3 } from 'three'
import { useFrame } from '@react-three/fiber'

import type { GeometryType, MaterialType } from '@/type/SchemaType'

interface RenderMeshProps {
  geometry: GeometryType
  material: MaterialType
  position: Vector3
}

const RenderMesh: FC<RenderMeshProps> = ({ geometry, material, position }) => {
  console.log(geometry, material, position)

  return (
    <mesh
      position={new Vector3(position.x, position.y, position.z)}
      scale={1}
      >
      <boxGeometry args={[geometry.width, geometry.height, geometry.depth]} />
      <meshStandardMaterial color='red' />
    </mesh>
  )
}

export default RenderMesh
