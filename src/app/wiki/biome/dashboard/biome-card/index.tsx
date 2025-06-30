import { Separator } from '@/components/ui/separator'
import useLangStore from '@/hooks/useLangStore'
import {
  BiomeModel,
  BiomeTag,
  getBiomeCategoryName,
  getBiomeName,
  getBiomeTagName,
  getDimensionName,
} from '@ecology-mc/data'
import { FC } from 'react'
import {
  getBiomeCatalogIcon,
  getBiomeDimensionIcon,
  getRainfallIcon,
  getTemperatureIcon,
} from '@/utils/biome'
import { Badge } from '@/components/ui/badge'
import { useTranslation } from 'react-i18next'

export type BiomeCardProps = {
  data: BiomeModel[]
}

const BiomeCard: FC<BiomeCardProps> = (props) => {
  const { data } = props
  const { lang } = useLangStore()
  const { t } = useTranslation()

  return (
    <div className="flex flex-wrap gap-2 overflow-auto">
      {data.map((biome) => (
        <div
          key={biome.biomeId}
          className="bg-accent hover:bg-accent/60 cursor-pointer flex w-[300px] gap-2 p-2 transition-all overflow-clip rounded-md"
        >
          <div className="pt-1" title={getDimensionName(biome.dimension, lang)}>
            {getBiomeDimensionIcon(biome.dimension, 16)}
          </div>
          <div className="flex flex-1 overflow-hidden flex-col gap-2">
            <div className="flex flex-col">
              {getBiomeName(biome.biomeId, lang)}
              <span className="text-muted-foreground text-xs">
                {biome.biomeId}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-sm">
                <span>{getTemperatureIcon(biome.temperature, 16)}</span>
                <span>{biome.temperature * 20}℃</span>
              </span>
              <Separator orientation="vertical" />
              <span className="flex items-center gap-1 text-sm">
                <span>{getRainfallIcon(biome.rainfall, 16)}</span>
                <span>{biome.rainfall * 100}%</span>
              </span>
            </div>
            <div className="flex items-center gap-2 overflow-auto">
              <Badge variant="secondary" title={t('common.category')}>
                {getBiomeCatalogIcon(biome.category)}
                {getBiomeCategoryName(biome.category, lang)}
              </Badge>
              {biome.tags.map((tag) => (
                <Badge variant="outline" title={t('common.tag')} key={tag}>
                  {getBiomeTagName(tag as BiomeTag, lang)}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default BiomeCard
