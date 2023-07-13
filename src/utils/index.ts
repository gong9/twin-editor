import type { DataNode } from 'antd/es/tree'
import type { SchemaType } from '@/type/SchemaType'

type middleDataType = {
  [k: string]: any
} []

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
        title: middleData[i].uid.slice(0, 10),
        key: middleData[i].uid,
      },
    )
  }

  return result
}
