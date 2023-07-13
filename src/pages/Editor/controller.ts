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
      const data = {
        ...schemaStore.getState().data,
        mesh: schemaStore.getState().data.mesh?.filter(item => item.uid !== currentSelectedCube.uid),
        model: schemaStore.getState().data.model?.filter(item => item.uid !== currentSelectedCube.uid),
      }
      schemaStore.setState({
        data,
      })
    }
  })
}

const dataInit = () => {
  const schema = localStorage.getItem('schema')
  const calcSceneTreeData = schemaStore.getState().calcSceneTreeData
  if (schema) {
    const data = JSON.parse(schema)
    calcSceneTreeData(data)
    schemaStore.setState({
      data,
    })
  }
  else {
    const data = {
      mesh: [mockData],
      model: [],
    }
    calcSceneTreeData(data)
    schemaStore.setState(
      {
        data,
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
