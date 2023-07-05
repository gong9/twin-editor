import type { Vector3 } from 'three'

export interface GeometryType {
  type: 'boxGeometry'
  width: number
  height: number
  depth: number
  widthSegments?: number
  heightSegments?: number
  depthSegments?: number
}

export interface MaterialType {
  type: 'meshBasicMaterial'
  color?: string

}

interface BaseConfigType {
  position: Vector3
  rotation?: Vector3
  scale?: Vector3
}

export interface ModelType extends BaseConfigType {

}

export interface MeshType extends BaseConfigType {
  geometry: GeometryType
  material: MaterialType
  uid: string
  children?: MeshType[]
}

export interface SchemaType {
  mesh?: MeshType[]
  model?: ModelType[]
}
