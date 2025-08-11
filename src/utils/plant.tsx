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
import { hasIntersectionRange, inRange } from './math'

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

/** 获取作物在某环境下的生长速率 */
export const getPlantGrowthRate = (
  plant: PlantModel,
  ecology: {
    temperature?: number
    rainfall?: number
  }
) => {
  const { temperature, rainfall } = ecology
  const temperatureRate = temperature
    ? calculateAbleTickRatio(temperature, plant.temperatureRange)
    : 1
  const rainfallRate = rainfall
    ? calculateAbleTickRatio(rainfall, plant.rainfallRange)
    : 1
  return temperatureRate * rainfallRate
}

/** 获取作物在某环境范围下的生长速率 */
export const getPlantGrowthRateByRange = (
  plant: PlantModel,
  range: {
    temperatureRange?: [number, number]
    rainfallRange?: [number, number]
  }
) => {
  const { temperatureRange, rainfallRange } = range

  const getRangeRate = (
    suitRange: [number, number],
    canRange: [number, number],
    range: [number, number]
  ) => {
    if (hasIntersectionRange(suitRange, range)) {
      return 1
    }
    if (!hasIntersectionRange(canRange, range)) {
      return 0
    }
    if (inRange(range[1], [canRange[0], suitRange[0]])) {
      return (range[1] - canRange[0]) / (suitRange[0] - canRange[0])
    }
    if (inRange(range[0], [suitRange[1], canRange[1]])) {
      return (canRange[1] - range[0]) / (canRange[1] - suitRange[1])
    }
    return 0
  }

  const temperatureRate = temperatureRange
    ? getRangeRate(plant.temperatureRange.suit, plant.temperatureRange.can, temperatureRange)
    : 1
  const rainfallRate = rainfallRange
    ? getRangeRate(plant.rainfallRange.suit, plant.rainfallRange.can, rainfallRange)
    : 1
  return temperatureRate * rainfallRate
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
