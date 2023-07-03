import { create } from 'zustand'

import type { MeshType, SchemaType } from '../type/SchemaType'

export interface SchemaStoreProps {
  data: SchemaType
  addMesh: (mesh: MeshType) => void
}

const schemaStore = create<SchemaStoreProps>(set => ({
  data: {},

  addMesh: (mesh: MeshType) => set(state => ({
    data: {
      mesh: [...(state.data.mesh || []), mesh],
    },
  })),
}))

export type SchemaStoreType = typeof schemaStore

export default schemaStore
