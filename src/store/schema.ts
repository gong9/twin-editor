import { create } from 'zustand'
import type { Vector3 } from 'three'

import type { MeshType, SchemaType } from '../type/SchemaType'

export interface SchemaStoreProps {
  data: SchemaType
  currentSelectedMesh: MeshType | null
  addMesh: (mesh: MeshType) => void
  setCurrentSelectedMesh: (mesh: MeshType) => void
  reset: () => void
}

const schemaStore = create<SchemaStoreProps>(set => ({
  data: {
    mesh: [{
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
    }],
  },

  currentSelectedMesh: null,

  addMesh: (mesh: MeshType) => set(state => ({
    data: {
      mesh: [...(state.data.mesh || []), mesh],
    },
  })),

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
