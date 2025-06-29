import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { BiomeCategory, BiomeTag } from '@ecology-mc/data'
import { Search } from 'lucide-react'
import { FC, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router'
import useBiomeFilterStore, {
  BiomeFilterState,
} from '../../useBiomeFilterStore'
import CatalogSelect from './components/CatalogSelect'
import DimensionSelect from './components/DimensionSelect'
import GenerateSelect from './components/GenerateSelect'
import RainfallSelect from './components/RainfallSelect'
import TagSelect from './components/TagSelect'
import TemperatureSelect from './components/TemperatureSelect'
import FilterDrawer, { FilterDrawerProps } from './FilterDrawer'

const BiomeFilter: FC = () => {
  const { t } = useTranslation()
  const filter = useBiomeFilterStore()

  const [searchParams] = useSearchParams()
  const [pinFilter, setPinFilter] = useState<Array<keyof BiomeFilterState>>([
    'temperature',
    'rainfall',
    'generate',
    'dimension',
    'category',
    'tags',
  ])

  useMemo(() => {
    const category = searchParams.get('category')
    if (category)
      filter.setBiomeFilter({ category: [category as BiomeCategory] })
    const tag = searchParams.get('tag')
    if (tag) filter.setBiomeFilter({ tags: [tag as BiomeTag] })
  }, [searchParams])

  const handleConfirm: FilterDrawerProps['onConfirm'] = (
    newFilter,
    pinFilter
  ) => {
    filter.setBiomeFilter(newFilter, true)
    setPinFilter(pinFilter)
  }

  return (
    <div className="flex flex-wrap items-center justify-end gap-2">
      {pinFilter.includes('category') && filter.category ? (
        <CatalogSelect />
      ) : null}
      {pinFilter.includes('tags') && filter.tags ? <TagSelect /> : null}
      {pinFilter.includes('dimension') && filter.dimension ? (
        <DimensionSelect />
      ) : null}
      {pinFilter.includes('temperature') && filter.temperature ? (
        <TemperatureSelect />
      ) : null}
      {pinFilter.includes('rainfall') && filter.rainfall ? (
        <RainfallSelect />
      ) : null}
      {pinFilter.includes('generate') && filter.generate ? (
        <GenerateSelect />
      ) : null}
      <FilterDrawer onConfirm={handleConfirm} />
      <div className="relative">
        <Input
          placeholder={t('common.search')}
          value={filter.keyword}
          onChange={(e) => filter.setBiomeFilter({ keyword: e.target.value })}
          className={cn('truncate pl-7 transition-all')}
        />
        <Search className="text-muted-foreground absolute top-1/2 left-2 h-4 w-4 -translate-y-1/2" />
      </div>
    </div>
  )
}

export default BiomeFilter
