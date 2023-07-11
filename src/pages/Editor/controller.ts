import type { Vector3 } from 'three'
import { v4 as uuidv4 } from 'uuid'
import { message } from 'antd'

import type { MeshType } from '@/type/SchemaType'
import store from '@/store'
import shortcutKeyRegister from '@/utils/shortcutKeyController'

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
  baseConfig: [
    {
      name: 'position',
      label: '位置',
      type: 'input-xyz',
    },
    {
      name: 'rotation',
      label: '旋转',
      type: 'input-xyz',
    },
    {
      name: 'scale',
      label: '缩放',
      type: 'input',
    },
  ],
}

const shortKeyInit = () => {
  const currentShortKeyApi = shortcutKeyRegister()
  const saveShortKeyApi = currentShortKeyApi.get('save')
  const deleteShortKeyApi = currentShortKeyApi.get('delete')

  saveShortKeyApi!(() => {
    localStorage.setItem('schema', JSON.stringify(schemaStore.getState().data))
    message.success('保存成功')
  })

  deleteShortKeyApi!(() => {
    const currentSelectedCube = schemaStore.getState().currentSelectedMesh
    if (currentSelectedCube && currentSelectedCube.uid) {
      schemaStore.setState({
        data: {
          ...schemaStore.getState().data,
          mesh: schemaStore.getState().data.mesh?.filter(item => item.uid !== currentSelectedCube.uid),
          model: schemaStore.getState().data.model?.filter(item => item.uid !== currentSelectedCube.uid),
        },
      })
    }
  })
}

const dataInit = () => {
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
}

export default {
  init: () => {
    shortKeyInit()
    dataInit()
  },
  destroy: () => {},
}
