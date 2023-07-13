import type { SchemaStoreType } from './schema'
import schemaStore from './schema'

import type { SettingStoreType } from './setting'
import settingStore from './setting'

import type { ThreeStoreType } from './three'
import threeStore from './three'

interface StoreType {
  schemaStore: SchemaStoreType
  settingStore: SettingStoreType
  threeStore: ThreeStoreType
}

const useStore: StoreType = {
  schemaStore,
  settingStore,
  threeStore,
}

export default useStore
