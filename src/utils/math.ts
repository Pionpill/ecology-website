/** 获取两个数组得交集 */
export const getIntersection = <T = string>(arr1: Array<T>, arr2: Array<T>) => {
  const set = new Set<T>(arr1)
  const result = [] as Array<T>
  for (let i = 0; i < arr2.length; i++) {
    if (set.has(arr2[i])) result.push(arr2[i])
  }
  return result
}

/** 判断两个数组是否有交集 */
export const hasIntersection = <T = string>(arr1: Array<T>, arr2: Array<T>) => {
  const set = new Set<T>(arr1)
  for (let i = 0; i < arr2.length; i++) {
    if (set.has(arr2[i])) return true
  }
  return false
}
