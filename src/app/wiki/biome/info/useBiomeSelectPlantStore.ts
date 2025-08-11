import { PlantModel } from '@ecology-mc/data'
import { create } from 'zustand'

export type BiomeSelectPlantStore = {
  selectedPlants: PlantModel[]
  setSelectedPlants: (plants: PlantModel[]) => void
}

const useBiomeSelectPlantStore = create<BiomeSelectPlantStore>((set) => ({
  selectedPlants: [],
  setSelectedPlants: (plants) => set({ selectedPlants: plants }),
}))

export default useBiomeSelectPlantStore
