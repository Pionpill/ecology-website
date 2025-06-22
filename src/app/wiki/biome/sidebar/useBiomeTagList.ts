import useLangStore from '@/hooks/useLangStore'
import {
  BIOME_TAG,
  BiomeModel,
  getBiomeName,
  getBiomeTagName,
} from '@ecology-mc/data'
import { useMemo } from 'react'

const useBiomeTagList = () => {
  const { lang } = useLangStore()

  return useMemo(
    () =>
      BIOME_TAG.map((tag) => {
        const label = getBiomeTagName(tag, lang)
        return {
          label,
          key: tag,
          children: BiomeModel.getByFilter({ tags: [tag] }).map((biome) => ({
            label: getBiomeName(biome.biomeId, lang),
            key: biome.biomeId,
          })),
        }
      }),
    [lang]
  )
}

export default useBiomeTagList
