import type { Vector3 } from 'three'
import { v4 as uuidv4 } from 'uuid'

import type { MeshType } from '@/type/SchemaType'
import store from '@/store'

const schemaStore = store.schemaStore
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
  // 判断编辑器状态，编辑器需要反向处理数据拆分
  // 开一个worker线程，处理数据拆分和数据初始化。 如模型数据的提前加载
  init: () => {
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
