/** 获取两个数组的交集 */
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

/** 判断两个范围是否有交集 */
export const hasIntersectionRange = (
  range1: [number, number],
  range2: [number, number],
  edge = true
) => {
  const [min1, max1] = range1
  const [min2, max2] = range2
  return edge ? min1 <= max2 && max1 >= min2 : min1 < max2 && max1 > min2
}

/** 判断一个值是否在范围内 */
export const inRange = (
  value: number,
  range: [number, number],
  edge = true
) => {
  const [min, max] = range
  return edge ? value >= min && value <= max : value > min && value < max
}

/** 格式化浮点数 */
export const formatFloatNumber = (value: number, precision = 1) => {
  return Math.round(value * Math.pow(10, precision)) / Math.pow(10, precision)
}

/** 获取值在范围中的比例 */
export const getRangeRate = (
  value: number,
  range: [number, number],
  edge: 'min' | 'max' = 'min'
) => {
  const [min, max] = range
  return inRange(value, range)
    ? edge === 'min'
      ? (value - min) / (max - min)
      : (max - value) / (max - min)
    : 0
}
