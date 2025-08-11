import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import useLangStore from '@/hooks/useLangStore'
import {
  HEIGHT_MIDDLE,
  TEMPERATURE_ADJUST_WIND,
  TEMPERATURE_RANGE_ALTITUDE,
  TEMPERATURE_RANGE_DAY,
} from '@/lib/constant'
import { getBiomeCatalogIcon, getRainfallIcon, getTemperatureIcon } from '@/utils/biome'
import {
  BiomeModel,
  BiomeTag,
  getBiomeCategoryName,
  getBiomeName,
  getBiomeTagName,
} from '@ecology-mc/data'
import { ChartPie, CircleQuestionMark } from 'lucide-react'
import { FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import BiomePreviewChart from './BiomePreviewChart'

export type BiomePaneProps = {
  biomeModel: BiomeModel,
  altitude: number
  onAltitudeChange: (altitude: number) => void
}

const BiomePane: FC<BiomePaneProps> = (props) => {
  const { biomeModel, altitude, onAltitudeChange } = props
  const { lang } = useLangStore()
  const { t } = useTranslation()

  const basicTemperature = useMemo(
    () =>
      Math.round(
        (biomeModel.temperature * 20 +
          (HEIGHT_MIDDLE - altitude) * TEMPERATURE_RANGE_ALTITUDE) *
          10
      ) / 10,
    [biomeModel, altitude]
  )

  return (
    <div className="bg-muted flex flex-1 flex-col gap-6 p-6 overflow-auto">
      <div className="flex flex-col gap-2">
        <div className="flex items-baseline gap-4">
          <span className="text-xl font-semibold">
            {getBiomeName(biomeModel.biomeId, lang)}
          </span>
          <span className="text-muted-foreground text-sm">
            {biomeModel.biomeId}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Badge>
            {getBiomeCatalogIcon(biomeModel.category)}
            {getBiomeCategoryName(biomeModel.category, lang)}
          </Badge>
          <span className="text-sm">
            {biomeModel.tags.map((tag) =>
              getBiomeTagName(tag as BiomeTag, lang)
            ).join(' · ')}
          </span>
        </div>
      </div>
      <div className="flex w-full items-end gap-16">
        <div className="flex max-w-[300px] flex-col gap-2">
          <div className="flex items-center gap-2 text-3xl">
            <span>{getTemperatureIcon(biomeModel.temperature, 32)}</span>
            <span>
              {basicTemperature} ±{' '}
              {TEMPERATURE_RANGE_DAY + TEMPERATURE_ADJUST_WIND} ℃
            </span>
          </div>
          <div className="flex items-center text-sm">
            <div className="flex items-center">
              <span>{t('common.altitude')}</span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" className="size-6 bg-transparent">
                    <CircleQuestionMark />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="whitespace-pre">
                  {t('wiki.biome.altitudeInfluence')}
                </TooltipContent>
              </Tooltip>
            </div>
            <Input
              type="number"
              className="h-8 w-20"
              value={altitude}
              onChange={(e) => onAltitudeChange(Number(e.target.value))}
            />
          </div>
          <span className="text-muted-foreground text-xs">
            {t('wiki.biome.temperatureTip')}
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <span>{getRainfallIcon(biomeModel.rainfall, 26)}</span>
          <div className="flex items-center gap-2 text-xl">
            <span>{t('common.rainfall')}</span>
            <span className="text-xl">{biomeModel.rainfall * 100} %</span>
          </div>
          <span className="text-muted-foreground text-xs">
            {t('wiki.biome.rainfallTip')}
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <ChartPie size={26} />
          <div className="flex items-center gap-2 text-xl">
            <span>{t('common.generate')}</span>
            <span className="text-xl">
              {biomeModel.generate
                ? `${biomeModel.generate / 100}%`
                : t('common.unCounted')}
            </span>
          </div>
          <span className="text-muted-foreground text-xs">
            {t('wiki.biome.generateTip')}
          </span>
        </div>
      </div>
      <BiomePreviewChart className="flex-1 overflow-auto" biomeModel={biomeModel} altitude={altitude}/>
    </div>
  )
}

export default BiomePane
