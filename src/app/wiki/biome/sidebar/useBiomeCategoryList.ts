import { biomeCategoryIcons } from '@/constant/biome'
import useLangStore from '@/hooks/useLangStore'
import {
  BIOME_CATEGORY,
  BiomeModel,
  getBiomeCategoryName,
  getBiomeName,
} from '@ecology-mc/data'
import { useMemo } from 'react'

const useBiomeCategoryList = () => {
  const { lang } = useLangStore()

  return useMemo(
    () =>
      BIOME_CATEGORY.map((category) => {
        const label = getBiomeCategoryName(category, lang)
        return {
          label,
          key: category,
          icon: biomeCategoryIcons[category],
          children: BiomeModel.getByFilter({ category }).map((biome) => ({
            label: getBiomeName(biome.biomeId, lang),
            key: biome.biomeId,
          })),
        }
      }),
    [lang]
  )
}

export default useBiomeCategoryList
