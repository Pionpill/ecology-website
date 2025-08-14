import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  HEIGHT_MIDDLE,
  TEMPERATURE_RANGE_ALTITUDE,
  TEMPERATURE_RANGE_DAY,
} from '@/lib/constant'
import { cn } from '@/lib/utils'
import { hasIntersectionRange } from '@/utils/math'
import { getPlantGrowthRateByRange } from '@/utils/plant'
import { PlantGrowPeriod, PlantModel } from '@ecology-mc/data'
import { CircleQuestionMark } from 'lucide-react'
import { FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import useBiomeContext from '../useBiomeContext'
import { BiomePlantEnvironment } from './interface'
import PlantBarChart from './PlantBarChart'
import PlantList from './PlantList'
import useDeviceStore from '@/hooks/useDeviceStore'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export type PlantPaneProps = {
  altitude: number
  className?: string
}

const PlantPane: FC<PlantPaneProps> = (props) => {
  const { altitude, className } = props

  const { biomeModel } = useBiomeContext()
  const { device } = useDeviceStore()
  const { t } = useTranslation()

  const allPlants = useMemo(() => PlantModel.getAll(), [])

  /**
   * 获取当前环境下可种植的作物
   * 温度：基础温度，海拔，时间
   * 降雨：基础降雨
   */
  const [suitPlants, canPlants] = useMemo(() => {
    const getTemperatureRange = (type: PlantGrowPeriod): [number, number] => {
      const basicTemperature =
        biomeModel.temperature * 20 +
        (HEIGHT_MIDDLE - altitude) * TEMPERATURE_RANGE_ALTITUDE

      if (type === 'sun') {
        return [basicTemperature, basicTemperature + TEMPERATURE_RANGE_DAY]
      } else if (type === 'moon') {
        return [basicTemperature - TEMPERATURE_RANGE_DAY, basicTemperature]
      } else {
        return [
          basicTemperature - TEMPERATURE_RANGE_DAY,
          basicTemperature + TEMPERATURE_RANGE_DAY,
        ]
      }
    }

    return allPlants.reduce(
      (acc, plant) => {
        const temperatureRange = getTemperatureRange(
          plant.defaultGrowInfo.period
        )
        const rainfallRange = [
          biomeModel.rainfall * 100,
          biomeModel.rainfall * 100,
        ] as [number, number]
        const growRate = getPlantGrowthRateByRange(plant, {
          temperatureRange,
          rainfallRange,
        })
        return [
          hasIntersectionRange(temperatureRange, plant.temperatureRange.suit) &&
          hasIntersectionRange(rainfallRange, plant.rainfallRange.suit)
            ? [...acc[0], { plant, temperatureRange, rainfallRange, growRate }]
            : acc[0],
          hasIntersectionRange(
            temperatureRange,
            plant.temperatureRange.can,
            false
          ) &&
          hasIntersectionRange(rainfallRange, plant.rainfallRange.can, false)
            ? [...acc[1], { plant, temperatureRange, rainfallRange, growRate }]
            : acc[1],
        ]
      },
      [[], []] as [BiomePlantEnvironment[], BiomePlantEnvironment[]]
    )
  }, [biomeModel, altitude])

  return (
    <div
      className={cn(
        'bg-muted-secondary flex h-full w-72 flex-col gap-4 overflow-hidden p-4',
        className
      )}
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="font-semibold">{t('wiki.biome.plantList')}</span>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" className="size-6">
                <CircleQuestionMark />
              </Button>
            </TooltipTrigger>
            <TooltipContent>{t('wiki.biome.plantListTooltip')}</TooltipContent>
          </Tooltip>
        </div>
        <span className="text-ring text-sm">
          {t('wiki.biome.plantListDescription')}
        </span>
      </div>
      {device === 'PC' ? (
        <>
          <PlantBarChart canPlants={canPlants} suitPlants={suitPlants} />
          <PlantList canPlants={canPlants} suitPlants={suitPlants} />
        </>
      ) : (
        <Tabs defaultValue="list" className="overflow-hidden">
          <TabsList>
            <TabsTrigger value="list">
              {t('wiki.biome.plantPaneTab.list')}
            </TabsTrigger>
            <TabsTrigger value="chart">
              {t('wiki.biome.plantPaneTab.chart')}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="list" className="flex flex-1 overflow-hidden">
            <PlantList canPlants={canPlants} suitPlants={suitPlants} />
          </TabsContent>
          <TabsContent value="chart">
            <PlantBarChart canPlants={canPlants} suitPlants={suitPlants} />
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}

export default PlantPane
