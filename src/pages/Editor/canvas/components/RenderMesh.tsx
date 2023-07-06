import type { FC } from 'react'
import { memo, useRef, useState } from 'react'
import isEqual from 'react-fast-compare'
import { TransformControls } from '@react-three/drei'
import type { Vector3 } from 'three'

import store from '@/store'
import type { MeshType } from '@/type/SchemaType'

interface RenderMeshProps {
  mesh: MeshType
}

export type TransformControlsModeType = 'translate' | 'rotate' | 'scale'

export enum TransformControlsModeItem {
  translate = 'translate',
  rotate = 'rotate',
  scale = 'scale',
}

const RenderMesh: FC<RenderMeshProps> = ({ mesh }) => {
  const meshRef = useRef(null)
  const transform = useRef(null)
  const { position, geometry, material } = mesh
  const schemaStore = store.schemaStore()
  const [currentPosition, setCurrentPosition] = useState([position.x, position.y, position.z])
  const [transformControlsMode] = useState<TransformControlsModeType>(TransformControlsModeItem.translate)

  const Geometry = geometry.type
  const Material = material.type

  const renderMesh = () => (
    <mesh
      ref={meshRef}
      scale={1}
      >
      <Geometry args={[geometry.width, geometry.height, geometry.depth]} />
      <Material wireframe={false} color={ 'hotpink'} />
    </mesh>
  )

  const handleTransformControlsMouseUp = () => {
    const object = (transform.current! as any).object
    setCurrentPosition(object.position)

    schemaStore.updateMesh(
      mesh.uid,
      {
        ...mesh,
        position: object.position,
      },
    )

    schemaStore.setCurrentSelectedMesh(mesh)
  }

  const handleSelected = () => {
    schemaStore.setCurrentSelectedMesh(mesh)
  }

  return (
    <>
      <TransformControls
        onClick={handleSelected}
        position={currentPosition as any as Vector3}
        size={1}
        onMouseUp={handleTransformControlsMouseUp}
        ref={transform}
        mode={transformControlsMode}>
        {renderMesh()}
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
