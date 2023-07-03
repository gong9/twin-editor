import { create } from 'zustand'

export interface SchemaStoreProps {
  bears: number
  increasePopulation: () => void
}

const schemaStore = create<SchemaStoreProps>(set => ({
  bears: 0,
  increasePopulation: () => set(state => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}))

export type SchemaStoreType = typeof schemaStore

export default schemaStore
