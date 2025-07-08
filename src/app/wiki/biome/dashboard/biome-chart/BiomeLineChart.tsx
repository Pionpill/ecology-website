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
import { cn } from '@/lib/utils'

export type BiomeLineChartProps = BiomeChartProps & {
  type: 'temperature' | 'rainfall'
}

const BiomeLineChart: FC<BiomeLineChartProps> = (props) => {
  const { data, type, className, containerClassName } = props
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
        color: 'var(--chart-1)',
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
    <Card className={cn("w-auto border-none shadow-none", className)}>
      <CardHeader>
        <CardTitle className="uppercase">
          {type === 'temperature'
            ? t('wiki.biome.temperatureLineChart')
            : t('wiki.biome.rainfallLineChart')}
        </CardTitle>
        <CardDescription>
          {type === 'temperature'
            ? t('wiki.biome.temperatureLineChartDescription')
            : t('wiki.biome.rainfallLineChartDescription')}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <ChartContainer config={chartConfig} className={cn('w-full', containerClassName)}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
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
              unit={type === 'temperature' ? '℃' : '%'}
              orientation="left"
            />
            <ChartTooltip
              content={<ChartTooltipContent indicator="line" />}
              formatter={(value, name, item) => (
                <div className="flex flex-col gap-2">
                  <span className="font-semibold">{item.payload.name}</span>
                  <div className="flex items-center gap-1">
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
                  </div>
                </div>
              )}
            />
            <Bar
              yAxisId="left"
              dataKey={type === 'temperature' ? 'temperature' : 'rainfall'}
              fill="var(--chart-1)"
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default BiomeLineChart
