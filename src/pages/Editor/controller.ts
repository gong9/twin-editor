import type { Vector3 } from 'three'
import { v4 as uuidv4 } from 'uuid'

import type { MeshType } from '@/type/SchemaType'
import store from '@/store'
import shortcutKeyRegister from '@/utils/shortcutKeyController'

const schemaStore = store.schemaStore
const settingStore = store.settingStore

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

export default {
  init: () => {
    const currentShortKeyApi = shortcutKeyRegister()
    settingStore.setState({
      shortcutKeyApi: currentShortKeyApi,
    })

    const data = localStorage.getItem('schema')
    if (data) {
      schemaStore.setState({
        data: JSON.parse(data),
      })
    }
    else {
      schemaStore.setState(
        {
          data: {
            mesh: [mockData],
            model: [],
          },
        },
      )
    }
  },
  destroy: () => {},
}
