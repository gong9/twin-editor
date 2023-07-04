import { create } from 'zustand'
import type { Vector3 } from 'three'
import { v4 as uuidv4 } from 'uuid'

import type { MeshType, SchemaType } from '../type/SchemaType'

export interface SchemaStoreProps {
  data: SchemaType
  currentSelectedMesh: MeshType | null
  addMesh: (mesh: MeshType) => void
  updateMesh: (mesh: MeshType) => void
  setCurrentSelectedMesh: (mesh: MeshType) => void
  reset: () => void
}

const schemaStore = create<SchemaStoreProps>(set => ({
  data: {
    mesh: [{
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
    }],
  },

  currentSelectedMesh: null,

  addMesh: (mesh: MeshType) => set(state => ({
    data: {
      mesh: [...(state.data.mesh || []), mesh],
    },
  })),

  updateMesh: (mesh: MeshType) => set(state => ({
    data: {
      mesh: state.data.mesh?.map((item) => {
        if (item.uid === mesh.uid)
          return mesh

        return item
      }),
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
