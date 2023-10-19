import type { Vector3 } from 'three'
import { v4 as uuidv4 } from 'uuid'
import { message } from 'antd'

import type { BaseConfigTypeItem, MeshType } from '@/type/SchemaType'
import store from '@/store'
import { emitter } from '@/utils'
import shortcutKeyRegister from '@/utils/shortcutKeyController'
import { BASECONFIG } from '@/constants'
import historyController from '@/utils/historyController'
import useModeStore from '@/store/mode'

interface ShortActionType {
  save: () => void
  undo: () => void
}
const schemaStore = store.schemaStore

const mockData: MeshType = {
  uid: uuidv4(),
  position: {
    x: 0,
    y: 0,
    z: 0,
  } as Vector3,
  name: '地面',
  geometry: {
    type: 'planeGeometry',
    width: 50,
    height: 50,
  },
  material: {
    type: 'meshBasicMaterial',
  },
  baseConfig: BASECONFIG as BaseConfigTypeItem[],
}

export const shortAction: ShortActionType = {
  save: () => {
    localStorage.setItem('schema', JSON.stringify(schemaStore.getState().data))
    message.success('保存成功')
  },
  undo: () => {
    message.warning('作者正在调试中')
    // const data = historyController.undo()
    // schemaStore.setState({
    //   data: data as any,
    // })
  },

}

/**
 * 初始化快捷键
 */
const shortKeyInit = () => {
  const currentShortKeyApi = shortcutKeyRegister()
  const saveShortKeyApi = currentShortKeyApi.get('save')!
  const deleteShortKeyApi = currentShortKeyApi.get('delete')!
  const undoShortKeyApi = currentShortKeyApi.get('undo')!
  const exitShortKeyApi = currentShortKeyApi.get('exit')!

  saveShortKeyApi(shortAction.save)

  deleteShortKeyApi(() => {
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

  undoShortKeyApi(shortAction.undo)

  exitShortKeyApi(() => {
    const lastState = schemaStore.getState()

    useModeStore.setState({
      ...lastState,
      drawline: false,
    })
  })
}

const dataInit = () => {
  const schema = localStorage.getItem('schema')
  const calcSceneTreeData = schemaStore.getState().calcSceneTreeData
  const data = schema
    ? JSON.parse(schema)
    : {
        mesh: [mockData],
        model: [],
      }

  calcSceneTreeData(data)
  // historyController.setBaseData(data)
  schemaStore.setState({
    data,
  })
}

export default {
  init: () => {
    shortKeyInit()
    dataInit()
  },
  destroy: () => {
    emitter.all.clear()
  },
}
