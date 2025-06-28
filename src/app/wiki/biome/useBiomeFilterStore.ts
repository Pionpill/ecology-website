import { BiomeCategory, BiomeTag, Dimension } from '@ecology-mc/data'
import { create } from 'zustand'

export type BiomeFilterState = {
  /** 降雨范围 */
  rainfall?: [number, number]
  /** 温度范围 */
  temperature?: [number, number]
  /** 生成概率范围 */
  generate?: [number, number]
  /** 所属维度 */
  dimension?: Dimension[]
  /** 所属分类 */
  category?: BiomeCategory[]
  /** 标签 */
  tags?: BiomeTag[]
  keyword: string
}

export type BiomeFilterActions = {
  setBiomeFilter: (
    filter:
      | Partial<BiomeFilterState>
      | ((filter: Partial<BiomeFilterState>) => Partial<BiomeFilterState>),
    reset?: boolean
  ) => void
}

const useBiomeFilterStore = create<BiomeFilterState & BiomeFilterActions>(
  (set) => ({
    keyword: '',
    setBiomeFilter: (filter, reset = false) =>
      set((state) => {
        const newState = typeof filter === 'function' ? filter(state) : filter
        return reset
          ? {
              category: undefined,
              tags: undefined,
              generate: undefined,
              rainfall: undefined,
              temperature: undefined,
              dimension: undefined,
              keyword: '',
              ...newState,
            }
          : { ...state, ...newState }
      }),
  })
)

export default useBiomeFilterStore
