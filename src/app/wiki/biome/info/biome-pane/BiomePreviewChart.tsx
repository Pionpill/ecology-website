import RainPattern, { RAIN_PATTERN_ID } from '@/components/svg/RainPattern'
import SnowPattern, { SNOW_PATTERN_ID } from '@/components/svg/SnowPattern'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from '@/components/ui/chart'
import useLangStore from '@/hooks/useLangStore'
import { cn } from '@/lib/utils'
import { getTemperatureIcon } from '@/utils/biome'
import { formatFloatNumber } from '@/utils/math'
import {
  BiomeModel,
  getBiomeName,
  getItemIdName,
  ItemId,
  ItemModel
} from '@ecology-mc/data'
import { Toggle } from '@radix-ui/react-toggle'
import { schemeCategory10 } from 'd3-scale-chromatic'
import { CloudRainWind, CloudSnow, Sun } from 'lucide-react'
import { FC, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Area,
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
} from 'recharts'
import useBiomeSelectPlantStore from '../useBiomeSelectPlantStore'
import useChartData from './useChartData'

export type BiomePreviewChartProps = {
  className?: string
  biomeModel: BiomeModel
  altitude: number
}

const BiomePreviewChart: FC<BiomePreviewChartProps> = (props) => {
  const { biomeModel, altitude, className } = props
  const { t } = useTranslation()
  const { lang } = useLangStore()
  const { selectedPlants } = useBiomeSelectPlantStore()

  const selectedPlantsInfo = useMemo(
    () =>
      selectedPlants.map((plant) => {
        const lootItems = plant.lootItems
        const itemId =
          lootItems.find((item) => !item.itemId.includes('seed'))?.itemId ||
          lootItems[0].itemId
        const itemModel = ItemModel.getById(itemId as ItemId)
        return {
          plant,
          item: itemModel,
        }
      }),
    [selectedPlants]
  )

  const [openRain, setOpenRain] = useState(true)

  const chartConfig = useMemo(
    () =>
      ({
        temperature: {
          label: t('common.temperature'),
          color: 'var(--chart-1)',
        },
        suitPlants: {
          label: t('common.suit'),
          color: 'var(--chart-1)',
        },
        canPlants: {
          label: t('common.can'),
          color: 'var(--chart-1-secondary)',
        },
      }) satisfies ChartConfig,
    []
  )

  const chartDataWithPlants = useChartData(biomeModel, selectedPlantsInfo, {
    openRain,
    altitude,
  })

  return (
    <Card
      className={cn('bg-muted-secondary border-none shadow-none', className)}
    >
      <div className="flex">
        <CardHeader className="w-full">
          <CardTitle>{t('wiki.biome.biomePreviewChartTitle')}</CardTitle>
          <CardDescription>
            {t('wiki.biome.biomePreviewChartDescription')}
          </CardDescription>
        </CardHeader>
        <div className="flex items-center gap-2 pr-6">
          <Toggle
            title={
              openRain
                ? t('common.close') + t('common.rain')
                : t('common.open') + t('common.rain')
            }
            className="cursor-pointer"
            pressed={openRain}
            onPressedChange={setOpenRain}
          >
            {openRain ? <CloudRainWind size={16} /> : <Sun size={16} />}
          </Toggle>
        </div>
      </div>
      <ChartContainer className="h-[100px] flex-1" config={chartConfig}>
        <ComposedChart accessibilityLayer data={chartDataWithPlants}>
          <CartesianGrid vertical={false} />
          <ChartTooltip
            cursor={false}
            content={(props) => {
              const payloads = props.payload
              if (!payloads.length) return null
              const time = ((payloads[0].payload.frame / 24000) * 24) % 24
              const isRain = payloads.some(
                (payload) => payload.dataKey === 'rain' && payload.value === 1
              )

              return (
                <div className="bg-background flex min-w-[160px] flex-col gap-2 rounded-md p-2">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1 font-semibold">
                      {isRain ? (
                        biomeModel.temperature < 0 ? (
                          <CloudSnow size={12} />
                        ) : (
                          <CloudRainWind size={12} />
                        )
                      ) : null}
                      {getBiomeName(biomeModel.biomeId, lang)}
                    </span>
                    <span className="flex items-center gap-1">
                      {time <= 12 ? `  ${time} am` : `  ${time} pm`}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    {payloads
                      .sort((a, b) => {
                        if (a.name.startsWith('ham')) return 1
                        if (b.name.startsWith('ham')) return -1
                        return 0
                      })
                      .map((payload) => {
                        if (payload.name === 'rain') return null
                        if (payload.name.startsWith('ham')) {
                          return (
                            <div className="flex w-full items-center justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <div
                                  className="h-0.5 w-2.5 shrink-0 rounded-[2px]"
                                  style={{ backgroundColor: payload.color }}
                                />
                                {getItemIdName(payload.name, lang)}
                              </div>
                              <div className="flex items-center gap-1">
                                {formatFloatNumber(payload.value * 100)} %
                              </div>
                            </div>
                          )
                        }
                        return (
                          <div className="flex w-full items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <div
                                className={cn(
                                  'relative h-2.5 w-2.5 shrink-0 rounded-[2px]',
                                  {
                                    'h-0.5': payload.name === 'temperature',
                                    'before:content-[" "] before:absolute before:top-1/2 before:left-1/2 before:h-1 before:w-1 before:translate-x-[-50%] before:translate-y-[-50%] before:rounded-full before:bg-[var(--chart-3)]':
                                      payload.name === 'temperature',
                                  }
                                )}
                                style={{ backgroundColor: payload.color }}
                              />
                              {t(`common.${payload.name}`)}
                            </div>
                            <div className="flex items-center gap-1">
                              {payload.name === 'temperature' &&
                                getTemperatureIcon(
                                  (payload.value as number) / 20,
                                  12
                                )}
                              {payload.value}
                              {payload.name === 'temperature' && '℃'}
                            </div>
                          </div>
                        )
                      })}
                  </div>
                </div>
              )
            }}
          />
          <XAxis
            type="number"
            xAxisId="frame"
            tickCount={24}
            dataKey="frame"
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => {
              const time = ((value / 24000) * 24) % 24
              return time <= 12 ? `${time}am` : `${time}pm`
            }}
          />
          <YAxis
            dataKey="temperature"
            yAxisId="temperature"
            type="number"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => `${value}℃`}
          />
          <YAxis
            dataKey="canPlants"
            yAxisId="count"
            orientation="right"
            type="number"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            domain={[0, 100]}
            tickFormatter={(value) => `${value}%`}
          />
          <defs>
            <linearGradient id="fillTemperature" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="var(--foreground)"
                stopOpacity={0.4}
              />
              <stop
                offset="85%"
                stopColor="var(--foreground)"
                stopOpacity={0}
              />
            </linearGradient>
            {biomeModel.temperature < 0 ? <SnowPattern /> : <RainPattern />}
          </defs>

          <Area
            dataKey="rain"
            yAxisId="rain"
            fill="var(--rain-background)"
            stroke="transparent"
          />
          <Area
            dataKey="rain"
            yAxisId="rain"
            fill={`url(#${biomeModel.temperature < 0 ? SNOW_PATTERN_ID : RAIN_PATTERN_ID})`}
            stroke="transparent"
          />
          <Bar
            dataKey="suitPlants"
            stackId="count"
            yAxisId="count"
            fill="var(--chart-1)"
          />
          <Bar
            dataKey="canPlants"
            stackId="count"
            yAxisId="count"
            fill="var(--chart-1-secondary)"
          />
          <Area
            dataKey="temperature"
            yAxisId="temperature"
            type="monotone"
            fill="url(#fillTemperature)"
            stroke="var(--chart-3)"
            baseValue="dataMin"
            dot={<circle cx={0} cy={0} r={2} className="fill-chart-3" />}
          />
          {selectedPlantsInfo.map((plant, index) => (
            <Line
              key={plant.item.itemId}
              dataKey={plant.item.itemId}
              yAxisId="rain"
              type="monotone"
              dot={false}
              stroke={schemeCategory10[index % schemeCategory10.length]}
            />
          ))}
        </ComposedChart>
      </ChartContainer>
    </Card>
  )
}

export default BiomePreviewChart
