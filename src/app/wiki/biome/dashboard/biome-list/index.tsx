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

export type BiomeTableProps = {
  data: BiomeModel[]
}

const BiomeList: FC<BiomeTableProps> = (props) => {
  const { data } = props
  const { lang } = useLangStore()
  const { t } = useTranslation()

  return (
    <div className="flex flex-col overflow-auto border-t">
      {data.map((biome) => (
        <div
          key={biome.biomeId}
          className="hover:bg-accent flex gap-2 border-b p-2 transition-all cursor-pointer"
        >
          <div className="pt-1" title={getDimensionName(biome.dimension, lang)}>
            {getBiomeDimensionIcon(biome.dimension, 16)}
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-end gap-2">
              <span>{getBiomeName(biome.biomeId, lang)}</span>
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
            <div className="flex items-center gap-2">
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

export default BiomeList
