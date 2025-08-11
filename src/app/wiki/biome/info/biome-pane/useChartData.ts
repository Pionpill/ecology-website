import {
  HEIGHT_MIDDLE,
  TEMPERATURE_ADJUST_WIND,
  TEMPERATURE_RANGE_ALTITUDE,
} from '@/lib/constant'
import { getAdjustTemperatureOfDay } from '@/utils/biome'
import { getPlantPeriodByFrame } from '@/utils/frame'
import { formatFloatNumber } from '@/utils/math'
import { getPlantGrowthRate } from '@/utils/plant'
import { BiomeModel, ItemModel, PlantModel } from '@ecology-mc/data'
import { useMemo } from 'react'

const useChartData = (
  biomeModel: BiomeModel,
  selectedPlantsInfo: {
    plant: PlantModel
    item: ItemModel
  }[],
  config: { openRain: boolean; altitude: number }
) => {
  const { openRain, altitude } = config

  const chartData = useMemo(() => {
    const data = []
    let rain = false
    let hasRained = !openRain
    for (let i = 0; i < 24000; i += 1000) {
      const isRain: boolean =
        biomeModel.rainfall === 0
          ? false
          : rain
            ? Math.random() > 0.1
            : Math.random() > 0.75
              ? hasRained
                ? false
                : true
              : false
      if (isRain !== rain) {
        rain = isRain
        hasRained = true
      }

      const temperature = formatFloatNumber(
        biomeModel.temperature * 20 +
          (HEIGHT_MIDDLE - altitude) * TEMPERATURE_RANGE_ALTITUDE +
          getAdjustTemperatureOfDay(i) +
          Math.random() * TEMPERATURE_ADJUST_WIND -
          1 +
          (isRain ? -5 : 0)
      )
      const canPlants = PlantModel.getByFilter({
        temperature: { can: [temperature, temperature] },
        rainfall: {
          can: [biomeModel.rainfall * 100, biomeModel.rainfall * 100],
        },
      }).filter((plant) =>
        (getPlantPeriodByFrame(i + 18000) === 'moon'
          ? ['moon', 'all']
          : ['sun', 'all']
        ).includes(plant.defaultGrowInfo.period)
      )

      const suitPlants = PlantModel.getByFilter({
        temperature: { suit: [temperature, temperature] },
        rainfall: {
          suit: [biomeModel.rainfall * 100, biomeModel.rainfall * 100],
        },
      }).filter((plant) =>
        (getPlantPeriodByFrame(i + 18000) === 'moon'
          ? ['moon', 'all']
          : ['sun', 'all']
        ).includes(plant.defaultGrowInfo.period)
      )

      const newData: {
        frame: number
        temperature: number
        suitPlants: number
        canPlants: number
        rain?: number
      } & Record<string, number> = {
        frame: i,
        temperature,
        suitPlants: suitPlants.length,
        canPlants: canPlants.length - suitPlants.length,
      }
      if (isRain) {
        newData.rain = 1
      }

      data.push(newData)
    }
    return data
  }, [biomeModel, altitude, openRain])

  const chartDataWithPlants = useMemo(() => {
    if (selectedPlantsInfo.length === 0) return chartData
    return chartData.map((item) => {
      const plantData = selectedPlantsInfo.reduce(
        (acc, plantInfo) => {
          const period = getPlantPeriodByFrame(item.frame + 18000)
          const plantPeriod = plantInfo.plant.defaultGrowInfo.period
          const canGrow =
            (period === 'sun' && plantPeriod === 'sun') ||
            (period === 'moon' && plantPeriod === 'moon') ||
            plantPeriod === 'all'
          // 判断能否生长
          const growthRate = canGrow
            ? getPlantGrowthRate(plantInfo.plant, {
                temperature: item.temperature,
                rainfall: item.rain
                  ? biomeModel.rainfall > 0.6
                    ? biomeModel.rainfall * 100
                    : 60
                  : biomeModel.rainfall * 100,
              })
            : 0
          acc[plantInfo.item.itemId] = growthRate
          return acc
        },
        {} as Record<string, number>
      )

      return {
        ...item,
        ...plantData,
      }
    })
  }, [chartData, selectedPlantsInfo])

  return chartDataWithPlants
}

export default useChartData
