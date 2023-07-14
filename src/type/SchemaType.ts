import type { Euler, Fog, Vector3 } from 'three'

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
  name: string
  position: Vector3
  rotation?: Euler
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

interface GlobalConfigDataType {
  background?: string
  environment?: string
  fog?: Fog
}

interface GlobalConfigType {
  type: string
  label: string
  name: string
}

export interface SchemaType {
  mesh?: MeshType[]
  model?: ModelType[]
}

export interface GlobalConfigTyle {
  globalConfigData: GlobalConfigDataType
  globalConfig: GlobalConfigType[]
}
