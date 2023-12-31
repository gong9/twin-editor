import { create } from 'zustand'

import type { DataNode } from 'antd/es/tree'
import type { GlobalConfigTyle, MeshType, ModelType, SchemaType } from '../type/SchemaType'
import { calcSceneTreeData } from '@/utils'
import historyController from '@/utils/historyController'

export type SelectCubeType = MeshType | ModelType | null

interface schemaStoreStates {
  data: SchemaType
  globalConfig: GlobalConfigTyle
  currentSelectedMesh: SelectCubeType
  sceneTree: DataNode[]
  initialMainCameraPosition: [x: number, y: number, z: number]
}

interface schemaStoreActions {
  addMesh: (mesh: MeshType) => void
  addModel: (model: ModelType) => void
  setData: (data: SchemaType) => void
  updateMesh: (id: string, mesh: MeshType) => void
  updateModel: (id: string, model: ModelType) => void
  calcSceneTreeData: (data: SchemaType) => void
  setCurrentSelectedMesh: (mesh: MeshType | ModelType | null) => void
  reset: () => void
}

export type SchemaStoreProps = schemaStoreStates & schemaStoreActions

/**
 * json schema store
 * notes: 数据尽量扁平化
 */
const schemaStore = create<SchemaStoreProps>(set => ({
  data: {
    mesh: [],
    model: [],
  },

  sceneTree: [],

  globalConfig: {
    globalConfigData: {
      background: '#ffffff',
    },
    globalConfig: [
      {
        name: 'background',
        label: '背景颜色',
        type: 'color',
      },
    ],
  },

  currentSelectedMesh: null,

  initialMainCameraPosition: [0, 3, 10],

  calcSceneTreeData: (data: SchemaType) => set(() => ({
    sceneTree: calcSceneTreeData(data),
  })),

  addMesh: (mesh: MeshType) => set((state) => {
    const data = {
      mesh: [...(state.data.mesh || []), mesh],
      model: state.data.model,
    }

    state.calcSceneTreeData(data)
    // historyController.addRecord(data)

    return {
      data,
    }
  }),

  addModel: (model: ModelType) => set((state) => {
    const data = {
      model: [...(state.data.model || []), model],
      mesh: state.data.mesh,
    }

    state.calcSceneTreeData(data)
    // historyController.addRecord(data)

    return {
      data,
    }
  }),

  updateMesh: (uid: string, mesh: MeshType) => set((state) => {
    const data = {
      mesh: state.data.mesh?.map((item) => {
        if (item.uid === uid)
          return mesh

        return item
      }),
      model: state.data.model,
    }

    // historyController.addRecord(data)

    return {
      data,
    }
  }),

  updateModel: (uid: string, model: ModelType) => set((state) => {
    const data = {
      model: state.data.model?.map((item) => {
        if (item.uid === uid)
          return model

        return item
      }),
      mesh: state.data.mesh,
    }

    // historyController.addRecord(data)

    return {
      data,
    }
  }),

  setData: (data: SchemaType) => set(() => {
    // historyController.addRecord(data)

    return {
      data,
    }
  }),

  setCurrentSelectedMesh: (cube: MeshType | ModelType | null) => set(() => ({
    currentSelectedMesh: cube,
  })),

  reset: () => set((state) => {
    const currentData = {
      mesh: [],
      model: [],
    }
    state.calcSceneTreeData(currentData)
    // historyController.addRecord(currentData)

    return {
      data: currentData,
    }
  }),
}))

export type SchemaStoreType = typeof schemaStore

export default schemaStore
