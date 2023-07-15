import type { FC } from 'react'
import { memo, useEffect, useRef, useState } from 'react'
import isEqual from 'react-fast-compare'
import type { Box3 } from 'three'

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
  const geometryRef = useRef(null)
  const { position, geometry, material, scale } = mesh
  const [currentPosition, setCurrentPosition] = useState([position.x, position.y, position.z])
  const [currentScale, setCurrentScale] = useState([scale?.x || 1, scale?.y || 1, scale?.z || 1])
  const [currentBoundingBox, setCurrentBoundingBox] = useState<Box3 | null>(null)

  useEffect(() => {
    setCurrentPosition([
      mesh.position.x,
      mesh.position.y,
      mesh.position.z,
    ])
    setCurrentScale([
      mesh.scale?.x || 1,
      mesh.scale?.y || 1,
      mesh.scale?.z || 1,
    ])
  }, [
    mesh.position,
    mesh.scale,
  ])

  useEffect(() => {
    if (geometryRef && !(geometryRef.current! as any).boundingBox) {
      const currentGeometry = geometryRef.current as any
      currentGeometry.computeBoundingBox()
      currentGeometry.boundingBox.min.multiplyScalar(1.1)
      currentGeometry.boundingBox.max.multiplyScalar(1.1)

      setCurrentBoundingBox((geometryRef.current! as any).boundingBox)
    }
  }, [currentPosition])

  const Geometry = geometry.type
  const Material = material.type

  const renderMesh = () => (
    <mesh
      ref={meshRef}
      scale={1}
      >
      <Geometry ref={geometryRef} args={[geometry.width, geometry.height, geometry.depth]} />
      <Material wireframe={false} color={ 'hotpink'} />
    </mesh>
  )

  return (
    <>
      <SelectdCube cube={mesh}
        currentBoundingBox={currentBoundingBox}
        cubeType={CubeType.mesh}
        currentScale={currentScale}
        currentPosition={currentPosition}
        setCurrentPosition={setCurrentPosition}
        setCurrentScale={setCurrentScale}
        >

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
