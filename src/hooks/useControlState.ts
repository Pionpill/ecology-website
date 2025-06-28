import { SetStateAction, useCallback, useRef, useState } from 'react'

interface Props<T> {
  /** 受控值 */
  value?: T | ((prevState: T) => T)
  /** 非受控值 */
  defaultValue?: T
  /** 默认值 */
  defaultStateValue: T
  /** 值改变的回调 */
  onChange?: (s: T) => void
}

/**
 * 处理组件受控与非受控两种形态
 * @param options
 * @returns
 */
export const useControlState = <T>(options: Props<T>) => {
  const {
    onChange,
    defaultValue,
    value: originValue,
    defaultStateValue,
  } = options

  const isControlled = options.value !== undefined

  const checkRef = useRef<T | undefined>(
    isControlled
      ? undefined
      : options.defaultValue !== undefined
        ? defaultValue
        : defaultStateValue
  )

  const value =
    typeof originValue === 'function'
      ? (originValue as (prev: T | undefined) => T)(checkRef.current)
      : originValue

  const [, update] = useState({})

  if (isControlled) {
    checkRef.current = value
  }

  const setState = useCallback(
    (v: SetStateAction<T>) => {
      const nextValue =
        typeof v === 'function'
          ? (v as (prev: T | undefined) => T)(checkRef.current)
          : v
      if (nextValue === checkRef.current) {
        return
      }
      checkRef.current = nextValue
      update({})
      onChange?.(nextValue)
    },
    [onChange]
  )

  return [checkRef.current as T, setState] as const
}
