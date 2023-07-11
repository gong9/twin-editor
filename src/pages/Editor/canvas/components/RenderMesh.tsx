import type { FC } from 'react'
import { memo, useEffect, useRef, useState } from 'react'
import isEqual from 'react-fast-compare'

import SelectdCube, { CubeType } from './Selected'
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
  const { position, geometry, material } = mesh
  const [currentPosition, setCurrentPosition] = useState([position.x, position.y, position.z])

  useEffect(() => {
    setCurrentPosition([
      mesh.position.x,
      mesh.position.y,
      mesh.position.z,
    ])
  }, [
    mesh.position,
  ])

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

  return (
    <>
      <SelectdCube cube={mesh} cubeType={CubeType.mesh} currentPosition={currentPosition} setCurrentPosition={setCurrentPosition}>
        {renderMesh()}
      </SelectdCube>
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
