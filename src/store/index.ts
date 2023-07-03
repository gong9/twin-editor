import { create } from 'zustand'

import type { SchemaStoreType } from './schema'
import schemaStore from './schema'

interface StoreType {
  schemaStore: SchemaStoreType
}

const useStore: StoreType = {
  schemaStore,
}

export default useStore
