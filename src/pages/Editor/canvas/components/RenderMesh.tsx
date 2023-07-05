import type { FC } from 'react'
import { memo, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import isEqual from 'react-fast-compare'
import { OrbitControls, TransformControls } from '@react-three/drei'

import store from '@/store'
import type { MeshType } from '@/type/SchemaType'

interface RenderMeshProps {
  mesh: MeshType
}

type TransformControlsModeType = 'translate' | 'rotate' | 'scale'

enum TransformControlsModeItem {
  translate = 'translate',
  rotate = 'rotate',
  scale = 'scale',
}

const RenderMesh: FC<RenderMeshProps> = ({ mesh }) => {
  const meshRef = useRef(null)
  const transform = useRef(null)
  const { position, geometry, material } = mesh
  const [currentPosition, setCurrentPosition] = useState([position.x, position.y, position.z])
  const [hovered, setHover] = useState(false)
  const schemaStore = store.schemaStore(state => state)
  const { setOrbitControlsEnabled } = store.settingStore(state => state)
  const [transformControlsMode, setTransformControlsMode] = useState<TransformControlsModeType>(TransformControlsModeItem.translate)

  useFrame(() => {

  })

  const setCurrentMesh = () => {
    schemaStore.setCurrentSelectedMesh(mesh)
  }

  return (
    <>
      <TransformControls enabled={true} ref={transform} mode={transformControlsMode}>
        <mesh
          ref={meshRef}
          scale={1}
      >
          <boxGeometry args={[geometry.width, geometry.height, geometry.depth]} />
          <meshStandardMaterial wireframe={true} color={hovered ? 'hotpink' : material.color || 'red'} />
        </mesh>
      </TransformControls>
    </>
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
