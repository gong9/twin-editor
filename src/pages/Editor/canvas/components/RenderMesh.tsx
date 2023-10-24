import type { FC } from 'react'
import { memo, useEffect, useMemo, useRef, useState } from 'react'
import isEqual from 'react-fast-compare'
import type { Box3, Vector3 } from 'three'
import { DoubleSide, Euler, RepeatWrapping, TextureLoader } from 'three'

import { getCubeTextures } from '../3d/texture'
import SelectdCube, { CubeType } from './Selected'
import useCreateLine from '@/hooks/useCreateLine'
import type { MeshType } from '@/type/SchemaType'
import cementRoad from '@/assets/cementRoad.jpg'

const texture = new TextureLoader().load(cementRoad)

texture.wrapS = RepeatWrapping
texture.wrapT = RepeatWrapping
texture.repeat.set(10, 10)

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
  const { position, geometry, material, scale, rotation } = mesh
  const [currentPosition, setCurrentPosition] = useState([position.x, position.y, position.z])
  const [currentScale, setCurrentScale] = useState([scale?.x || 1, scale?.y || 1, scale?.z || 1])
  const [currentRotation, setCurrentRotation] = useState<Euler | undefined>(geometry.type === 'planeGeometry' ? new Euler(-Math.PI / 2, 0, -Math.PI / 2) : rotation)
  const [currentBoundingBox, setCurrentBoundingBox] = useState<Box3 | null>(null)
  const [setPoint, trySetPoint] = useCreateLine()

  const Geometry = geometry.type
  const Material = material.type

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

  const currentTexture = useMemo(() => {
    return getCubeTextures(material.map)
  }, [material])

  const recordPoints = (point: Vector3, type: string) => {
    if (type === 'planeGeometry')
      setPoint(point.x, point.y, point.z)
  }

  const tryRecordPoints = (point: Vector3, type: string) => {
    if (type === 'planeGeometry')
      trySetPoint(point.x, point.y, point.z)
  }

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
        color: material.color || 'hotpink',
        side: material.side,
      }
    }

    return (
      <mesh
        ref={meshRef}
        scale={1}
        onClick={e => recordPoints(e.point, mesh.name)}
        onPointerMove={e => tryRecordPoints(e.point, mesh.name)}
      >
        <Geometry ref={geometryRef} args={[geometry.width, geometry.height, geometry.depth || 1]} />
        <Material map={currentTexture} wireframe={false} {...materialConfig}/>
      </mesh>
    )
  }

  return (
    <>
      <SelectdCube
        cube={mesh}
        currentRotation={currentRotation}
        currentBoundingBox={currentBoundingBox}
        cubeType={CubeType.mesh}
        currentScale={currentScale}
        currentPosition={currentPosition}
        setCurrentPosition={setCurrentPosition}
        setCurrentScale={setCurrentScale}
        setCurrentRotation={setCurrentRotation}
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
