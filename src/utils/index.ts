import type { DataNode } from 'antd/es/tree'
import mitt from 'mitt'

import type { SchemaType } from '@/type/SchemaType'

type middleDataType = {
  [k: string]: any
} []

const emitterHandle = mitt()

export const emitter = {
  on: emitterHandle.on,
  off: emitterHandle.off,
  emit: emitterHandle.emit,
  all: emitterHandle.all,
}

/**
 * todo 当前不支持组合
 * @param data
 * @returns
 */
export const calcSceneTreeData = (data: SchemaType): DataNode[] => {
  const middleData: middleDataType = [...data.mesh || [], ...data.model || []]
  const result: DataNode[] = []

  for (let i = 0; i < middleData.length; i++) {
    result.push(
      {
        title: middleData[i].name,
        key: middleData[i].uid,
        isLeaf: true,
      },
    )
  }

  return result
}

export const isTure = (param: string | number | null | undefined) => {
  if (param === 0 || param)
    return true
  else
    return false
}
