/**
 * 用于检测对象数组中是否存在重复项
 * @param data
 * @param IdentityAttr
 * @returns
 */
export const isDuplicateByAttributes = (
  data: { [k: string]: unknown }[],
  IdentityAttr: string,
) => {
  const map = new Map()

  for (let i = 0; i < data.length; i++) {
    if (!map.has(data[i][IdentityAttr]))
      map.set(data[i][IdentityAttr], data[i])

    else
      return true
  }

  return false
}

/**
 * 对象数组去重
 * @param data
 * @param IdentityAttr
 * @returns
 */
export const duplicateRemovalByAttributes = <T>(
  data: T[],
  IdentityAttr: string,
  callback?: (preNode: T, currentNode: T) => T,
) => {
  const map = new Map()

  data.forEach((item: any) => {
    if (!map.has(item[IdentityAttr]))
      map.set(item[IdentityAttr], item)

    else
      callback && map.set(item[IdentityAttr], callback(map.get(item[IdentityAttr]), item))
  })

  return Array.from(map.values()) as T[]
}
