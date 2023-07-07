import { produceWithImmer } from './immer'

interface Node {
  children?: Node[]
  [k: string]: any
}

/**
 * delete action
 * @param currentList
 * @param parent
 * @returns
 */
const deleteEmptyNode = <T extends Node>(
  currentList: T[],
  parent = currentList,
) => {
  for (let index = 0; index < currentList.length; index++) {
    const item = currentList[index]
    if (item.children && Array.isArray(item.children)) {
      if (item.children.length === 0) {
        parent.splice(index, 1)
        return true
      }
      else {
        const flag = (deleteEmptyNode(
          item.children,
          item.children,
        ) as any) as number

        if (flag && item.children.length === 0)
          parent.splice(index, 1)

        return true
      }
    }
  }
}

const deleteEmptyTreeNode = <T extends Node>(currentList: T[]) => {
  return produceWithImmer(currentList, (list: T[]) => {
    deleteEmptyNode(list)
  })
}

export default deleteEmptyTreeNode
