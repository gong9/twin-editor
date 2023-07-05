import { create } from 'zustand'
import type { Vector3 } from 'three'
import { v4 as uuidv4 } from 'uuid'

import type { MeshType, SchemaType } from '../type/SchemaType'

export interface SchemaStoreProps {
  data: SchemaType
  currentSelectedMesh: MeshType | null
  addMesh: (mesh: MeshType) => void
  updateMesh: (id: string, mesh: MeshType) => void
  setCurrentSelectedMesh: (mesh: MeshType) => void
  reset: () => void
}

const mockData: MeshType = {
  uid: uuidv4(),
  position: {
    x: 0,
    y: 0.5,
    z: 0,
  } as Vector3,
  geometry: {
    type: 'boxGeometry',
    width: 1,
    height: 1,
    depth: 1,
  },
  material: {
    type: 'meshBasicMaterial',
  },
}

/**
 * json schema store
 * notes: 数据尽量扁平化
 */
const schemaStore = create<SchemaStoreProps>(set => ({
  data: {
    mesh: [mockData],
  },

  currentSelectedMesh: null,

  addMesh: (mesh: MeshType) => set(state => ({
    data: {
      mesh: [...(state.data.mesh || []), mesh],
    },
  })),

  updateMesh: (uid: string, mesh: MeshType) => set(state => ({
    data: {
      mesh: state.data.mesh?.map((item) => {
        if (item.uid === uid)
          return mesh

        return item
      }),
    },
  })),

  deleteMesh: (meshId: string) => set(state => ({})),

  setCurrentSelectedMesh: (mesh: MeshType) => set(() => ({
    currentSelectedMesh: mesh,
  })),

  reset: () => set(() => ({
    data: {
      mesh: [],
    },
  })),
}))

export type SchemaStoreType = typeof schemaStore

export default schemaStore
