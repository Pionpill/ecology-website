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
import {
  BiomeCategory,
  BiomeId,
  getBiomeCategoryName,
  getBiomeName,
} from '@ecology-mc/data'
import { FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Treemap } from 'recharts'
import { BiomeChartProps } from '..'
import TreeMapContent from './TreeMapContent'
import useLangStore from '@/hooks/useLangStore'
import { cn } from '@/lib/utils'

const BiomeTreeChart: FC<BiomeChartProps> = (props) => {
  const { data, className, containerClassName } = props
  const { t } = useTranslation()
  const { lang } = useLangStore()

  const [chartData, allGenerate] = useMemo(() => {
    const result: Array<{
      name: string
      children: Array<{ name: string; generate: number }>
    }> = []
    let allGenerate = 0
    data.forEach((item) => {
      allGenerate += item.generate ?? 0
      if (['the_end', 'nether'].includes(item.category)) {
        return
      }
      const categories = result.find(
        (category) =>
          category.name ===
          getBiomeCategoryName(item.category as BiomeCategory, lang)
      )
      if (!categories) {
        result.push({
          name: getBiomeCategoryName(item.category as BiomeCategory, lang),
          children: [
            {
              name: getBiomeName(item.biomeId as BiomeId, lang),
              generate: item.generate ?? 0,
            },
          ],
        })
      } else {
        categories.children.push({
          name: getBiomeName(item.biomeId as BiomeId, lang),
          generate: item.generate ?? 0,
        })
      }
    })
    return [result, allGenerate]
  }, [data])

  const chartConfig = useMemo(
    () => ({
      generate: {
        label: t('common.generate'),
        color: 'var(--chart-1)',
      },
    }),
    []
  ) satisfies ChartConfig

  return (
    <Card className={cn('w-auto border-none shadow-none', className)}>
      <CardHeader>
        <CardTitle className="uppercase">
          {t('wiki.biome.categoryGenerateTreeChart')}
        </CardTitle>
        <CardDescription>
          {t('wiki.biome.categoryGenerateTreeChartDescription')}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0 pl-6">
        <ChartContainer
          config={chartConfig}
          className={cn('w-full', containerClassName)}
        >
          <Treemap
            data={chartData}
            nameKey="name"
            dataKey="generate"
            content={(props) => <TreeMapContent {...props} />}
          >
            <ChartTooltip
              content={
                <ChartTooltipContent
                  indicator="line"
                  active={false}
                  payload={[]}
                  coordinate={{ x: 0, y: 0 }}
                  accessibilityLayer={false}
                />
              }
              formatter={(value, _, item) => (
                <div className="flex flex-col gap-2">
                  <span className="font-semibold">{item.payload.name}</span>
                  <div className="flex items-center gap-2">
                    {t('common.generate')}
                    <div className="text-foreground ml-auto flex items-center gap-0.5 font-mono font-medium tabular-nums">
                      {(value as number) / 100}
                      <span className="text-muted-foreground font-normal">
                        %
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {t('common.percentage')}
                    <div className="text-foreground ml-auto flex items-center gap-0.5 font-mono font-medium tabular-nums">
                      {Math.round(((value as number) / allGenerate) * 10000) /
                        100}
                      <span className="text-muted-foreground font-normal">
                        %
                      </span>
                    </div>
                  </div>
                </div>
              )}
            />
          </Treemap>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default BiomeTreeChart
