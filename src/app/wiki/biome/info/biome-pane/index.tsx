import { Badge } from '@/components/ui/badge'
import useLangStore from '@/hooks/useLangStore'
import { getBiomeCatalogIcon } from '@/utils/biome'
import {
  BiomeTag,
  getBiomeCategoryName,
  getBiomeName,
  getBiomeTagName,
} from '@ecology-mc/data'
import { FC } from 'react'
import useBiomeContext from '../useBiomeContext'
import BiomeBasicInfo from './biome-basic-info'
import BiomePreviewChart from './BiomePreviewChart'

export type BiomePaneProps = {
  altitude: number
  onAltitudeChange: (altitude: number) => void
}

const BiomePane: FC<BiomePaneProps> = (props) => {
  const { altitude, onAltitudeChange } = props
  const { lang } = useLangStore()
  const { biomeModel } = useBiomeContext()

  return (
    <div className="bg-muted flex flex-1 flex-col gap-6 overflow-auto p-4">
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
            {biomeModel.tags
              .map((tag) => getBiomeTagName(tag as BiomeTag, lang))
              .join(' · ')}
          </span>
        </div>
      </div>
      <BiomeBasicInfo altitude={altitude} onAltitudeChange={onAltitudeChange} />
      <BiomePreviewChart className="flex-1 overflow-auto" altitude={altitude} />
    </div>
  )
}

export default BiomePane
