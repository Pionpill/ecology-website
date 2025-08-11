import { PlantGrowPeriod } from '@ecology-mc/data'

export const getPlantPeriodByFrame = (frame: number): PlantGrowPeriod => {
  return frame % 24000 <= 12000 ? 'sun' : 'moon'
}
