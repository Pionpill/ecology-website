import MultiSelect, { MultiSelectProp } from '@/components/shared/MultiSelect'
import useLangStore from '@/hooks/useLangStore'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import useBiomeFilterStore from '../../../useBiomeFilterStore'
import { Group } from 'lucide-react'
import {
  BIOME_CATEGORY,
  BiomeCategory,
  getBiomeCategoryName,
} from '@ecology-mc/data'
import { biomeCategoryIcons } from '@/constant/biome'

const CatalogSelect: FC<Partial<MultiSelectProp>> = (props) => {
  const { t } = useTranslation()
  const { lang } = useLangStore()
  const filter = useBiomeFilterStore()

  return (
    <MultiSelect
      title={t('common.category')}
      maxShownNum={2}
      prefix={<Group />}
      contentClassName="grid grid-cols-4 gap-1"
      value={filter.category}
      options={BIOME_CATEGORY.map((category) => ({
        label: getBiomeCategoryName(category, lang),
        value: category,
        icon: biomeCategoryIcons[category],
      }))}
      onChange={(newCategory) =>
        filter.setBiomeFilter({
          category: newCategory as BiomeCategory[],
        })
      }
      {...props}
    />
  )
}

export default CatalogSelect
