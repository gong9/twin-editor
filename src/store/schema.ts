import { create } from 'zustand'
import type { Vector3 } from 'three'
import { v4 as uuidv4 } from 'uuid'

import type { MeshType, ModelType, SchemaType } from '../type/SchemaType'

export interface SchemaStoreProps {
  data: SchemaType
  currentSelectedMesh: MeshType | null
  addMesh: (mesh: MeshType) => void
  addModel: (model: ModelType) => void
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
    model: [],
  },

  currentSelectedMesh: null,

  addMesh: (mesh: MeshType) => set(state => ({
    data: {
      mesh: [...(state.data.mesh || []), mesh],
      model: state.data.model,
    },
  })),

  addModel: (model: ModelType) => set(state => ({
    data: {
      model: [...(state.data.model || []), model],
      mesh: state.data.mesh,
    },
  })),

  updateMesh: (uid: string, mesh: MeshType) => set(state => ({
    data: {
      mesh: state.data.mesh?.map((item) => {
        if (item.uid === uid)
          return mesh

        return item
      }),
      model: state.data.model,
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
