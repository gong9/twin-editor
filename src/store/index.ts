import type { SchemaStoreType } from './schema'
import schemaStore from './schema'

import type { SettingStoreType } from './setting'
import settingStore from './setting'

interface StoreType {
  schemaStore: SchemaStoreType
  settingStore: SettingStoreType
}

const useStore: StoreType = {
  schemaStore,
  settingStore,
}

export default useStore
