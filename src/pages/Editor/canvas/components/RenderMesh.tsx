import type { FC } from 'react'
import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'

import store from '@/store'
import type { MeshType } from '@/type/SchemaType'

interface RenderMeshProps {
  mesh: MeshType
}

const RenderMesh: FC<RenderMeshProps> = ({ mesh }) => {
  const ref = useRef(null)
  const [hovered, setHover] = useState(false)
  const schemaStore = store.schemaStore(state => state)
  const { position, geometry, material } = mesh

  useFrame(({ mouse }) => {

  })

  const setCurrentMesh = () => {
    schemaStore.setCurrentSelectedMesh(mesh)
  }

  return (
    <mesh
      ref={ref}
      position={[position.x, position.y, position.z]}
      scale={1}
      onClick={setCurrentMesh}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      >

      <boxGeometry args={[geometry.width, geometry.height, geometry.depth]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : material.color || 'red'} />
    </mesh>
  )
}

export default RenderMesh
