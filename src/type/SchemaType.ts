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

// config json schema
export interface BaseConfigTypeItem {
  name: 'position' | 'rotation' | 'scale'
  label: string
  type: string // input | select ... current need input
}

// cube base attributes
interface BaseAttributesType {
  uid: string
  position: Vector3
  rotation?: Vector3
  scale?: Vector3
  baseConfig: BaseConfigTypeItem[]
}

// model
export interface ModelType extends BaseAttributesType {
  source: string
  type: 'gltf' | 'fbx'
  version?: string
}

// mesh
export interface MeshType extends BaseAttributesType {
  geometry: GeometryType
  material: MaterialType
  children?: MeshType[]
}

export interface SchemaType {
  mesh?: MeshType[]
  model?: ModelType[]
}
