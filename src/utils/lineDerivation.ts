import { BoxGeometry, DoubleSide, Mesh, MeshBasicMaterial, Quaternion, RepeatWrapping, TextureLoader, Vector3 } from 'three'
import { v4 as uuidv4 } from 'uuid'

import wall from '@/assets/wall.jpg'

interface BoxGeometryParamsType {
  position: Vector3
  width: number
  height: number
  depth: number
}

interface BoxMaterialParamsType {
  path?: string
  color?: string
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
  const { position, width, height, depth } = boxGeometryParams
  const { color, path, repeatX, wrapS, repeatY, wrapT } = boxMaterialParams

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
    map: {
      path,
      repeatX,
      repeatY,
      wrapS,
      wrapT,
    },
  }

  return {
    uid: uuidv4(),
    name: '墙体',
    position,
    rotation: new Quaternion(0, 0, 0, 0),
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

  // recordSchemaToStore(mesh, 'boxGeometry')

  return mesh
}
