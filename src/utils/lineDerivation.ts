import { BoxGeometry, DoubleSide, Mesh, MeshBasicMaterial, Quaternion, RepeatWrapping, TextureLoader, Vector3 } from 'three'
import { v4 as uuidv4 } from 'uuid'

import { BASECONFIG } from '@/constants'
import type { BaseConfigTypeItem } from '@/type/SchemaType'
import wall from '@/assets/wall.jpg'
import store from '@/store'

interface BoxGeometryParamsType {
  position: Vector3
  width: number
  height: number
  depth: number
  rotation?: {
    x: number
    y: number
    z: number
    order: string
  }
}

interface BoxMaterialParamsType {
  texture?: string
  color?: string
  repeatX?: number
  repeatY?: number
  wrapS?: number
  wrapT?: number
  side?: number
}

export interface TextureParamsType {
  texture?: string
  repeatX?: number
  repeatY?: number
  wrapS?: number
  wrapT?: number
}

/**
 * record schema to store, target to push view update
 * @param boxGeometryParams
 * @param boxMaterialParams
 * @returns
 */
const recordSchemaToStore = (boxGeometryParams: BoxGeometryParamsType, boxMaterialParams: BoxMaterialParamsType) => {
  const { position, width, height, depth, rotation } = boxGeometryParams
  const { color, texture, repeatX, wrapS, repeatY, wrapT, side } = boxMaterialParams

  // geometry info
  const geometry = {
    type: 'boxGeometry',
    width,
    height,
    depth,
  }

  // material info
  const material = {
    type: 'meshBasicMaterial',
    color,
    side,
    map: {
      texture,
      repeatX,
      repeatY,
      wrapS,
      wrapT,
    },
  }

  return {
    uid: uuidv4(),
    name: '墙体',
    tag: 'line',
    position,
    rotation,
    geometry,
    material,
  }
}

/**
 * create box geometry by two points
 * just provide data not create mesh
 * @param a
 * @param b
 * @param height
 * @param depth
 */
export const createBoxGeometryByPoints = (a: Vector3, b: Vector3, height = 1, depth = 0.2) => {
  // step 1: get position
  const width = a.distanceTo(b)
  const box = new BoxGeometry(width, height, depth)

  const texture = new TextureLoader().load(wall)
  texture.wrapS = RepeatWrapping
  texture.wrapT = RepeatWrapping

  texture.repeat.set(Math.ceil(width), 1)

  const material = new MeshBasicMaterial({ map: texture, side: DoubleSide, color: '#ac7c6a' })
  const mesh = new Mesh(box, material)

  // get center point
  const midpoint = new Vector3().addVectors(a, b).multiplyScalar(0.5)

  const position = new Vector3(midpoint.x, midpoint.y + height / 2, midpoint.z)
  mesh.position.x = midpoint.x
  mesh.position.y = midpoint.y + height / 2
  mesh.position.z = midpoint.z

  // step 2: rotate box
  const direction = new Vector3()
  direction.subVectors(a, b)
  direction.normalize()

  const axis = new Vector3(0, 1, 0) // axis
  const angle = new Vector3(1, 0, 0).angleTo(direction)

  const quaternion = new Quaternion().setFromAxisAngle(axis, angle)
  const newDirection = new Vector3(1, 0, 0).applyQuaternion(quaternion)

  if (!newDirection.angleTo(direction))
    mesh.rotateOnAxis(axis, angle)
  else
    mesh.rotateOnAxis(axis, -angle)

  const data = recordSchemaToStore({
    position,
    width,
    height,
    depth,
    rotation: {
      x: mesh.rotation.x,
      y: mesh.rotation.y,
      z: mesh.rotation.z,
      order: mesh.rotation.order,
    },
  },
  {
    texture: wall,
    repeatX: Math.ceil(width),
    repeatY: 1,
    wrapS: RepeatWrapping,
    wrapT: RepeatWrapping,
    color: '#ac7c6a',
    side: DoubleSide,
  })

  store.schemaStore.getState().addMesh({
    ...data,
    baseConfig: BASECONFIG as BaseConfigTypeItem[],
  } as any)

  mesh.geometry.dispose()
  mesh.material.dispose()
  // return mesh
}
