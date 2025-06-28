import MultiSelect, { MultiSelectProp } from '@/components/shared/MultiSelect'
import useLangStore from '@/hooks/useLangStore'
import { BIOME_TAG, BiomeTag, getBiomeTagName } from '@ecology-mc/data'
import { Tags } from 'lucide-react'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import useBiomeFilterStore from '../../../useBiomeFilterStore'

const TagSelect: FC<Partial<MultiSelectProp>> = (props) => {
  const { t } = useTranslation()
  const { lang } = useLangStore()
  const filter = useBiomeFilterStore()

  return (
    <MultiSelect
      title={t('common.tag')}
      maxShownNum={2}
      prefix={<Tags />}
      contentClassName="grid grid-cols-4 gap-1"
      value={filter.tags}
      options={BIOME_TAG.map((tag) => ({
        label: getBiomeTagName(tag, lang),
        value: tag,
      }))}
      onChange={(newTags) =>
        filter.setBiomeFilter({
          tags: newTags as BiomeTag[],
        })
      }
      {...props}
    />
  )
}

export default TagSelect
