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

export interface MeshType {
  geometry: GeometryType
  material: MaterialType
  position: Vector3
  uid: string
  children?: MeshType[]
}

export interface SchemaType {
  mesh?: MeshType[]
}
