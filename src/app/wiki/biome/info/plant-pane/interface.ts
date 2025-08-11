import { PlantModel } from "@ecology-mc/data"

export type BiomePlantEnvironment = {
  plant: PlantModel
  temperatureRange: [number, number]
  rainfallRange: [number, number]
  growRate: number
}
