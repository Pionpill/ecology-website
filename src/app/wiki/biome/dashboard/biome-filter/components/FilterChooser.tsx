import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { BIOME_CATEGORY, BIOME_DIMENSION, BIOME_TAG } from '@ecology-mc/data'
import {
  CloudRainWind,
  Filter,
  Globe,
  Group,
  LayoutList,
  Percent,
  Tags,
  Thermometer
} from 'lucide-react'
import { FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import useBiomeFilterStore from '../../../useBiomeFilterStore'

const FilterChooser: FC = () => {
  const { t } = useTranslation()
  const filter = useBiomeFilterStore()

  const hasAllFilter = useMemo(
    () =>
      filter.category &&
      filter.tags &&
      filter.dimension &&
      filter.generate &&
      filter.rainfall &&
      filter.temperature,
    [filter]
  )

  const filterItems = [
    {
      label: t('common.temperature'),
      icon: <Thermometer />,
      onUnActiveClick: () => filter.setBiomeFilter({ temperature: [-20, 50] }),
      onActiveClick: () => filter.setBiomeFilter({ temperature: undefined }),
      active: filter.temperature,
    },
    {
      label: t('common.rainfall'),
      icon: <CloudRainWind />,
      onUnActiveClick: () => filter.setBiomeFilter({ rainfall: [0, 1] }),
      onActiveClick: () => filter.setBiomeFilter({ rainfall: undefined }),
      active: filter.rainfall,
    },
    {
      label: t('common.generate'),
      icon: <Percent />,
      onUnActiveClick: () => filter.setBiomeFilter({ generate: [0, 1500] }),
      onActiveClick: () => filter.setBiomeFilter({ generate: undefined }),
      active: filter.generate,
    },
    {
      label: t('common.dimension'),
      icon: <Globe />,
      onUnActiveClick: () =>
        filter.setBiomeFilter({ dimension: [...BIOME_DIMENSION] }),
      onActiveClick: () => filter.setBiomeFilter({ dimension: undefined }),
      active: filter.dimension,
    },
    {
      label: t('common.category'),
      icon: <Group />,
      onUnActiveClick: () =>
        filter.setBiomeFilter({
          category: [...BIOME_CATEGORY],
        }),
      onActiveClick: () => filter.setBiomeFilter({ category: undefined }),
      active: filter.category,
    },
    {
      label: t('common.tag'),
      icon: <Tags />,
      onUnActiveClick: () => filter.setBiomeFilter({ tags: [...BIOME_TAG] }),
      onActiveClick: () => filter.setBiomeFilter({ tags: undefined }),
      active: filter.tags,
    },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <Button variant="outline">
          <Filter />
          {t('wiki.biome.chooseFilter')}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {filterItems.map((item) => (
          <DropdownMenuItem
            className={cn('cursor-pointer', item.active && 'bg-muted')}
            key={item.label}
            onClick={item.active ? item.onActiveClick : item.onUnActiveClick}
          >
            {item.icon} {item.label}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() =>
            hasAllFilter
              ? filter.setBiomeFilter({
                  category: undefined,
                  tags: undefined,
                  dimension: undefined,
                  temperature: undefined,
                  generate: undefined,
                  rainfall: undefined,
                })
              : filter.setBiomeFilter({
                  category: [...BIOME_CATEGORY],
                  tags: [...BIOME_TAG],
                  dimension: [...BIOME_DIMENSION],
                  temperature: [-20, 50],
                  rainfall: [0, 1],
                  generate: [0, 1500],
                })
          }
        >
          <LayoutList />{' '}
          {hasAllFilter ? t('common.clearCheckAll') : t('common.checkAll')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default FilterChooser
