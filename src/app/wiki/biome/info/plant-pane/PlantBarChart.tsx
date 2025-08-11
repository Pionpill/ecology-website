import { Card, CardDescription, CardHeader } from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import useLangStore from '@/hooks/useLangStore'
import {
  getPlantTypeName,
  PLANT_TYPE_DATA,
  PlantModel,
  PlantType,
} from '@ecology-mc/data'
import { FC, memo, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Bar, CartesianGrid, ComposedChart, Line, XAxis, YAxis } from 'recharts'
import { BiomePlantEnvironment } from './interface'

export type PlantBarChartProps = {
  canPlants: BiomePlantEnvironment[]
  suitPlants: BiomePlantEnvironment[]
}

const PlantBarChartInner: FC<PlantBarChartProps> = (props) => {
  const { canPlants, suitPlants } = props
  const { t } = useTranslation()
  const { lang } = useLangStore()

  const chartData = useMemo<
    Array<{
      type: PlantType
      suit: number
      can: number
      all: number
      percent: number
    }>
  >(() => {
    const data = PLANT_TYPE_DATA.map((type) => ({
      type: type,
      suit: 0,
      can: 0,
      all: 0,
      percent: 0,
    }))

    suitPlants.forEach((plantInfo) => {
      const plantData = data.find((item) => item.type === plantInfo.plant.type)
      if (!plantData) return
      plantData.suit += 1
    })

    canPlants.forEach((plantInfo) => {
      const plantData = data.find((item) => item.type === plantInfo.plant.type)
      if (!plantData) return
      plantData.can += 1
    })

    PlantModel.getAll().forEach((plant) => {
      const plantData = data.find((item) => item.type === plant.type)
      if (!plantData) return
      plantData.all += 1
    })

    data.forEach((item) => {
      item.can = item.can - item.suit
      item.percent = Math.round(((item.suit + item.can) / item.all) * 1000) / 10
    })

    return data
  }, [canPlants, suitPlants])

  const chartConfig = useMemo(
    () =>
      ({
        suit: {
          label: t('common.suit'),
          color: 'var(--chart-1)',
        },
        can: {
          label: t('common.can'),
          color: 'var(--chart-1-secondary)',
        },
      }) satisfies ChartConfig,
    []
  )

  return (
    <Card className="gap-0 py-2">
      <CardHeader>
        <CardDescription className="uppercase">
          {t('wiki.biome.availablePlantType')}
        </CardDescription>
      </CardHeader>
      <ChartContainer config={chartConfig}>
        <ComposedChart
          className="pr-2"
          accessibilityLayer
          layout="vertical"
          data={chartData}
        >
          <CartesianGrid vertical={false} horizontal={false} />
          <XAxis
            type="number"
            xAxisId="suit"
            dataKey="suit"
            domain={[0, 20]}
            orientation="top"
            hide
          />
          <XAxis
            type="number"
            xAxisId="percent"
            dataKey="percent"
            domain={[0, 100]}
            orientation="bottom"
            hide
          />
          <YAxis
            dataKey="type"
            type="category"
            tickLine={false}
            interval={0}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) =>
              getPlantTypeName(value as PlantType, lang)
            }
          />
          <ChartTooltip
            cursor={false}
            content={
              <ChartTooltipContent
                indicator="dashed"
                labelFormatter={(label) => (
                  <span className="font-semibold">
                    {getPlantTypeName(label as PlantType, lang)}
                  </span>
                )}
              />
            }
            formatter={(value, name, item) => {
              return (
                <div className="flex w-full items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div
                      className="h-2.5 w-2.5 shrink-0 rounded-[2px]"
                      style={{ backgroundColor: item.color }}
                    />
                    {t(`common.${name}`)}
                  </div>
                  <div>
                    {value}
                    {name === 'percent' && '%'}
                  </div>
                </div>
              )
            }}
          />
          <Bar
            dataKey="suit"
            stackId="a"
            xAxisId="suit"
            fill="var(--chart-1)"
          />
          <Bar
            dataKey="can"
            stackId="a"
            xAxisId="suit"
            fill="var(--chart-1-secondary)"
          />
          <Line
            dataKey="percent"
            xAxisId="percent"
            type="monotone"
            stroke="var(--chart-3)"
            dot={<circle cx={0} cy={0} r={2} className="fill-chart-3" />}
          />
        </ComposedChart>
      </ChartContainer>
    </Card>
  )
}

const PlantBarChart = memo(PlantBarChartInner);

export default PlantBarChart
