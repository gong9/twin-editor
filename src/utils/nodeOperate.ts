interface TreeData {
  children?: TreeData[]
  [k: string]: any
}

/**
 * add path to tree node
 * @param treeData
 */
export const addTreeNodePath = <T extends TreeData>(treeData: T) => {}

/**
 * find tree node by path
 * @param treeData
 * @param path
 */
export const findTreeNodeByPath = <T extends TreeData>(treeData: T, path: string) => {}
