import { create } from 'zustand'

export type BiomePlantFilterStore = {
  temperature: [number, number]
  rainfall: [number, number]
}

export type BiomePlantFilterActions = {
  setTemperature: (temperature: [number, number]) => void
  setRainfall: (rainfall: [number, number]) => void
}

/** 生物群落作物过滤器 */
const useBiomePlantFilterStore = create<
  BiomePlantFilterStore & BiomePlantFilterActions
>((set) => ({
  temperature: [0, 0],
  rainfall: [0, 0],
  setTemperature: (temperature) => set({ temperature }),
  setRainfall: (rainfall) => set({ rainfall }),
}))

export default useBiomePlantFilterStore
