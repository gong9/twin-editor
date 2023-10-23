import type { Euler, Fog, Vector3 } from 'three'

export interface GeometryType {
  type: 'boxGeometry' | 'planeGeometry'
  width: number
  height: number
  depth?: number
  widthSegments?: number
  heightSegments?: number
  depthSegments?: number
}

// material texture map
interface TextureMapType {
  texture?: string // image path
  repeatX: number
  repeatY: number
  wrapS?: number
  wrapT?: number
}
export interface MaterialType {
  type: 'meshBasicMaterial'
  color?: string
  map?: TextureMapType
  side?: number
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
  tag?: string // 特殊标记
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
