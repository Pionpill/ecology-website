import { BiomeCategory, BiomeTag } from '@ecology-mc/data'
import { create } from 'zustand'

export type BiomeFilterState = {
  categories: BiomeCategory[]
  tags: BiomeTag[]
}

export type BiomeFilterActions = {
  setBiomeFilter: (
    filter:
      | Partial<BiomeFilterState>
      | ((filter: Partial<BiomeFilterState>) => BiomeFilterState),
    reset?: boolean
  ) => void
}

const useBiomeFilterStore = create<BiomeFilterState & BiomeFilterActions>((set) => ({
  categories: [],
  tags: [],
  setBiomeFilter: (filter, reset = false) =>
    set((state) => {
      const newState = typeof filter === 'function' ? filter(state) : filter
      return reset
        ? { categories: [], tags: [], ...newState }
        : { ...state, ...newState }
    }),
}))

export default useBiomeFilterStore
