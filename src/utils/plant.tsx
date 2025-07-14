import Mushroom from '@/components/icon/Mushroom'
import { PlantModel, PlantType } from '@ecology-mc/data'
import {
    BottleWine,
    Carrot,
    Cherry,
    Leaf,
    LucideProps,
    Wheat,
} from 'lucide-react'
import { RefAttributes } from 'react'
import { inRange } from './math'

export const getPlantTypeIcon = (
  type: PlantType,
  config?: Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
) => {
  switch (type) {
    case 'grain':
      return <Wheat {...config} />
    case 'fungi':
      return <Mushroom {...config} />
    case 'spice':
      return <BottleWine {...config} />
    case 'fruit':
      return <Cherry {...config} />
    case 'vegetable':
      return <Carrot {...config} />
    case 'grass':
      return <Leaf {...config} />
  }
}

// export const getPlantBiomeGrowthRate = (plant: PlantModel, biome: BiomeModel, altitude: number) => {
//   const temperature = plant.
// }

/** 获取作物在生态中的生长速率 */
export const getPlantGrowthRate = (
  plant: PlantModel,
  ecology: {
    temperature?: number
    rainfall?: number
  }
) => {
  const basicRate = 100
  const { temperature, rainfall } = ecology
  const temperatureRate = temperature
    ? calculateAbleTickRatio(temperature, plant.temperatureRange)
    : 1
  const rainfallRate = rainfall
    ? calculateAbleTickRatio(rainfall, plant.rainfallRange)
    : 1
  return basicRate * temperatureRate * rainfallRate
}

/** 获取温度，降水，光照的适宜度 */
export const calculateAbleTickRatio = (
  value: number,
  range: {
    can: [number, number]
    suit: [number, number]
  }
) => {
  const { can, suit } = range
  if (inRange(value, suit)) return 1.0
  if (value <= can[0] || value >= can[1]) return 0
  if (value < suit[0]) return (value - can[0]) / (suit[0] - can[0])
  return (can[1] - value) / (can[1] - suit[1])
}

export default calculateAbleTickRatio
