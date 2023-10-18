import type { FC } from 'react'
import { memo, useEffect, useRef, useState } from 'react'
import isEqual from 'react-fast-compare'
import type { Box3 } from 'three'
import { DoubleSide, TextureLoader } from 'three'

import SelectdCube, { CubeType } from './Selected'
import type { MeshType } from '@/type/SchemaType'
import grass from '@/assets/grass.jpg'

const texture = new TextureLoader().load(grass)

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
  const geometryRef = useRef<any>(null)
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
      // const currentGeometry = geometryRef.current as any
      // currentGeometry.computeBoundingBox()
      // currentGeometry.boundingBox.min.multiplyScalar(1.1)
      // currentGeometry.boundingBox.max.multiplyScalar(1.1)

      // setCurrentBoundingBox((geometryRef.current! as any).boundingBox)
    }
  }, [currentPosition])

  const Geometry = geometry.type
  const Material = material.type

  const renderMesh = () => {
    let materialConfig = {}

    // notes: temporarily test use
    if (mesh.name === 'planeGeometry') {
      materialConfig = {
        ...materialConfig,
        map: texture,
        side: DoubleSide,
      }
    }
    else {
      materialConfig = {
        ...materialConfig,
        color: 'hotpink',
      }
    }

    return (
      <mesh
        ref={meshRef}
        scale={1}
        rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
      >
        <Geometry ref={geometryRef} args={[geometry.width, geometry.height, geometry.depth || 1]} />
        <Material wireframe={false} {...materialConfig}/>
      </mesh>
    )
  }

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
