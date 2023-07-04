import type { FC } from 'react'
import { memo, useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import isEqual from 'react-fast-compare'
import { useDrag } from 'react-use-gesture'

import store from '@/store'
import type { MeshType } from '@/type/SchemaType'

interface RenderMeshProps {
  mesh: MeshType
}

const RenderMesh: FC<RenderMeshProps> = ({ mesh }) => {
  const meshRef = useRef(null)
  const { position, geometry, material } = mesh
  const [currentPosition, setCurrentPosition] = useState([position.x, position.y, position.z])
  const [hovered, setHover] = useState(false)
  const schemaStore = store.schemaStore(state => state)
  const { setOrbitControlsEnabled } = store.settingStore(state => state)
  const { size, viewport } = useThree()
  const aspect = size.width / viewport.width

  const bind = useDrag(
    ({ offset: [x, y] }) => {
      setOrbitControlsEnabled(false)
      const z = currentPosition[2]
      setCurrentPosition([x / aspect, -y / aspect, z])
    },
    { pointerEvents: true },
  )

  useFrame(() => {

  })

  const setCurrentMesh = () => {
    schemaStore.setCurrentSelectedMesh(mesh)
  }

  // const updateMesh = () => {
  //   schemaStore.updateMesh({
  //     ...mesh,
  //     position: {
  //       x: currentPosition[0],
  //       y: currentPosition[1],
  //       z: currentPosition[2],
  //     },
  //   })
  // }

  return (
    <mesh
      ref={meshRef}
      position={currentPosition as [number, number, number]}
      {...bind() as any}
      scale={1}
      onClick={setCurrentMesh}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      onPointerLeave={() => setOrbitControlsEnabled(true)}
      >

      <boxGeometry args={[geometry.width, geometry.height, geometry.depth]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : material.color || 'red'} />
    </mesh>
  )
}

export default memo(RenderMesh, (prevProps, nextProps) => {
  const { geometry: preGeometry, material: preMaterial, position: Position } = prevProps.mesh
  const { geometry: nextGeometry, material: nextMaterial, position: nextPosition } = nextProps.mesh

  return isEqual(
    {
      geometry: preGeometry,
      material: preMaterial,
      position: Position,
    },
    {
      geometry: nextGeometry,
      material: nextMaterial,
      position: nextPosition,
    },
  )
})
