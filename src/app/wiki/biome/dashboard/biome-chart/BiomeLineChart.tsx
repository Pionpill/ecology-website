import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import useLangStore from '@/hooks/useLangStore'
import { getRainfallIcon, getTemperatureIcon } from '@/utils/biome'
import { getBiomeName } from '@ecology-mc/data'
import { FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import { BiomeChartProps } from '.'

const BiomeLineChart: FC<BiomeChartProps> = (props) => {
  const { data } = props
  const { t } = useTranslation()
  const { lang } = useLangStore()

  const chartConfig = useMemo(
    () => ({
      temperature: {
        label: t('common.temperature'),
        color: 'var(--chart-1)',
      },
      rainfall: {
        label: t('common.rainfall'),
        color: 'var(--chart-2)',
      },
    }),
    []
  ) satisfies ChartConfig

  const chartData = useMemo(() => {
    return data.map((item) => ({
      name: getBiomeName(item.biomeId, lang),
      temperature: item.temperature * 20,
      rainfall: item.rainfall * 100,
    }))
  }, [data])

  return (
    <Card className="h-auto border-none py-0 shadow-none">
      <CardHeader>
        <CardTitle>{t('wiki.biome.temperatureRainfallChart')}</CardTitle>
        <CardDescription>
          {t('wiki.biome.temperatureRainfallChartDescription')}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false}/>
            <XAxis
              dataKey="name"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis
              yAxisId="left"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              unit="℃"
              orientation="left"
              domain={[-20, 40]}
            />
            <YAxis
              yAxisId="right"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              unit="%"
              orientation="right"
              domain={[-50, 100]}
            />
            <ChartTooltip
              content={<ChartTooltipContent indicator="line" />}
              formatter={(value, name, item) => {
                console.log('item', item)
                return (
                  <>
                    <div
                      className="h-2.5 w-2.5 shrink-0 rounded-[2px] bg-(--color-bg)"
                      style={
                        {
                          '--color-bg': `var(--color-${name})`,
                        } as React.CSSProperties
                      }
                    />
                    {chartConfig[name as keyof typeof chartConfig]?.label ||
                      name}
                    <div className="text-foreground ml-auto flex items-center gap-0.5 font-mono font-medium tabular-nums">
                      <span className="text-muted-foreground font-normal">
                        {item.dataKey === 'temperature'
                          ? getTemperatureIcon(item.value as number, 12)
                          : getRainfallIcon(item.value as number, 12)}
                      </span>
                      {value}
                      <span className="text-muted-foreground font-normal">
                        {item.dataKey === 'temperature' ? '℃' : '%'}
                      </span>
                    </div>
                  </>
                )
              }}
            />
            <Bar
              yAxisId="left"
              dataKey="temperature"
              fill="var(--chart-1)"
              radius={4}
            />
            <Bar
              yAxisId="right"
              dataKey="rainfall"
              fill="var(--chart-2)"
              radius={4}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default BiomeLineChart
