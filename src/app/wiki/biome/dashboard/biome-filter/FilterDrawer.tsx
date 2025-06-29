import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Separator } from '@/components/ui/separator'
import { Slider } from '@/components/ui/slider'
import {
  BIOME_CATEGORY,
  BIOME_DIMENSION,
  BIOME_TAG,
  BiomeCategory,
  BiomeModel,
  BiomeTag,
} from '@ecology-mc/data'
import {
  Check,
  CheckCheck,
  CloudRainWind,
  Filter,
  Globe,
  Group,
  Percent,
  Pin,
  PinOff,
  Tags,
  Thermometer,
} from 'lucide-react'
import { FC, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import useBiomeFilterStore, {
  BiomeFilterState,
} from '../../useBiomeFilterStore'
import CatalogSelect from './components/CatalogSelect'
import DimensionSelect from './components/DimensionSelect'
import TagSelect from './components/TagSelect'

export type FilterDrawerProps = {
  onConfirm?: (
    filter: BiomeFilterState,
    pinFilter: Array<keyof BiomeFilterState>
  ) => void
}

const FilterDrawer: FC<FilterDrawerProps> = (props) => {
  const { onConfirm } = props
  const { t } = useTranslation()
  const biomeFilter = useBiomeFilterStore()

  const allFilterKey: Array<keyof BiomeFilterState> = [
    'temperature',
    'rainfall',
    'generate',
    'dimension',
    'category',
    'tags',
  ]

  const [pinFilters, setPinFilters] = useState<Array<keyof BiomeFilterState>>([
    'temperature',
    'rainfall',
    'generate',
    'dimension',
    'category',
    'tags',
  ])
  const [checkedFilter, setCheckedFilter] = useState<
    Array<keyof BiomeFilterState>
  >([])

  const getStoreFilter = () => ({
    temperature: biomeFilter.temperature || [-1, 2.5],
    rainfall: biomeFilter.rainfall || [0, 1],
    generate: biomeFilter.generate || [0, 1500],
    dimension: biomeFilter.dimension || [...BIOME_DIMENSION],
    category: biomeFilter.category || [...BIOME_CATEGORY],
    tags: biomeFilter.tags || [...BIOME_TAG],
  })

  const [filter, setFilter] = useState(getStoreFilter)
  const updateFilter = (value: Partial<typeof filter>) => {
    setFilter((filter) => ({ ...filter, ...value }))
  }

  useEffect(() => {
    setFilter(getStoreFilter())
    setCheckedFilter(
      allFilterKey.filter((key) => biomeFilter[key as keyof BiomeFilterState])
    )
  }, [biomeFilter])

  const realFilter = useMemo(() => {
    const realFilter = { ...filter } as BiomeFilterState
    for (const key of Object.keys(realFilter)) {
      if (!checkedFilter.includes(key as keyof BiomeFilterState)) {
        delete realFilter[key as keyof BiomeFilterState]
      }
    }
    return realFilter
  }, [filter, checkedFilter])

  const filteredBiomes = useMemo(() => {
    return BiomeModel.getByFilter(realFilter)
  }, [realFilter])

  const handleConfirm = () => onConfirm?.(realFilter, pinFilters)

  const handleCheckAll = () => {
    if (checkedFilter.length === 6) {
      setCheckedFilter([])
    } else {
      setCheckedFilter(allFilterKey)
    }
  }

  const handlePinAll = () => {
    if (pinFilters.length === 6) {
      setPinFilters([])
    } else {
      setPinFilters(allFilterKey)
    }
  }

  const filterItems = [
    {
      key: 'temperature',
      label: t('common.temperature'),
      icon: <Thermometer size={16} />,
      value:
        filter.temperature.map((item) => Math.round(item * 20)).join(' ~ ') +
        '℃',
      component: (
        <Slider
          disabled={!checkedFilter.includes('temperature')}
          defaultValue={filter.temperature.map((item) => Math.round(item * 20))}
          onValueChange={(values) =>
            updateFilter({
              temperature: values.map((v) => v / 20) as [number, number],
            })
          }
          min={-20}
          max={50}
          step={1}
          title={t('common.temperature')}
        />
      ),
    },
    {
      key: 'rainfall',
      label: t('common.rainfall'),
      icon: <CloudRainWind size={16} />,
      value:
        filter.rainfall.map((item) => Math.round(item * 100)).join(' ~ ') + '%',
      component: (
        <Slider
          disabled={!checkedFilter.includes('rainfall')}
          defaultValue={filter.rainfall.map((value) => value * 100)}
          onValueChange={(values) =>
            updateFilter({
              rainfall: values.map((v) => v / 100) as [number, number],
            })
          }
          min={0}
          max={100}
          step={1}
          title={t('common.rainfall')}
        />
      ),
    },
    {
      key: 'generate',
      label: t('common.generate'),
      icon: <Percent size={16} />,
      value: filter.generate.map((value) => value / 10).join(' ~ ') + '‰',
      component: (
        <Slider
          disabled={!checkedFilter.includes('generate')}
          defaultValue={
            filter.generate
              ? filter.generate.map((value) => value / 10)
              : [0, 150]
          }
          onValueChange={(values) =>
            updateFilter({
              generate: values.map((v) => v * 10) as [number, number],
            })
          }
          min={0}
          max={150}
          step={1}
          title={t('common.generate')}
        />
      ),
    },
    {
      key: 'dimension',
      label: t('common.dimension'),
      icon: <Globe size={16} />,
      component: (
        <DimensionSelect
          disabled={!checkedFilter.includes('dimension')}
          showLabel
          className="w-full"
          value={filter.dimension}
          onValueChange={(dimension) => updateFilter({ dimension })}
        />
      ),
    },
    {
      key: 'category',
      label: t('common.category'),
      icon: <Group size={16} />,
      component: (
        <CatalogSelect
          disabled={!checkedFilter.includes('category')}
          value={filter.category}
          prefix={null}
          onChange={(category) =>
            updateFilter({ category: category as BiomeCategory[] })
          }
          maxShownNum={6}
        />
      ),
    },
    {
      key: 'tags',
      label: t('common.tag'),
      icon: <Tags size={16} />,
      component: (
        <TagSelect
          disabled={!checkedFilter.includes('tags')}
          value={filter.tags}
          prefix={null}
          onChange={(tags) => updateFilter({ tags: tags as BiomeTag[] })}
          maxShownNum={6}
        />
      ),
    },
  ]

  return (
    <Drawer direction="right" handleOnly>
      <DrawerTrigger asChild>
        <Button variant="outline">
          <Filter />
          {t('common.filter')}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="border-b px-6">
          <div className="flex items-center justify-between">
            <DrawerTitle className="capitalize">
              {t('wiki.biome.biomeFilterPanel')}
            </DrawerTitle>
            <DrawerClose asChild className="cursor-pointer">
              <Button size="icon" variant="ghost" onClick={handleConfirm}>
                <Check />
              </Button>
            </DrawerClose>
          </div>
          <DrawerDescription>
            {t('wiki.biome.biomeFilterPanelDescription')}
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-1 flex-col justify-between p-6">
          <div className="flex flex-1 flex-col gap-6 overflow-auto">
            <div className="flex justify-start gap-2">
              <Button
                variant="default"
                size="sm"
                onClick={handleCheckAll}
                className="cursor-pointer"
              >
                <CheckCheck />
                {checkedFilter.length === 6
                  ? t('common.clearCheckAll')
                  : t('common.checkAll')}
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="cursor-pointer"
                onClick={handlePinAll}
              >
                <Pin />
                {pinFilters.length === 6
                  ? t('wiki.biome.unpinAll')
                  : t('wiki.biome.pinAll')}
              </Button>
            </div>
            {filterItems.map((item) => (
              <div key={item.key} className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={checkedFilter.includes(
                        item.key as keyof BiomeFilterState
                      )}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setCheckedFilter([
                            ...checkedFilter,
                            item.key as keyof BiomeFilterState,
                          ])
                          setPinFilters([
                            ...pinFilters,
                            item.key as keyof BiomeFilterState,
                          ])
                        } else {
                          setCheckedFilter(
                            checkedFilter.filter((key) => key !== item.key)
                          )
                          setPinFilters(
                            pinFilters.filter((key) => key !== item.key)
                          )
                        }
                      }}
                    />
                    {item.icon}
                    <div className="capitalize">{item.label}</div>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    {item.value ?? null}
                    <Button
                      variant="ghost"
                      className="text-muted-foreground size-6 cursor-pointer"
                      title={
                        pinFilters.includes(item.key as keyof BiomeFilterState)
                          ? t('common.unpinFilterFromBar')
                          : t('common.pinFilterToBar')
                      }
                      onClick={() => {
                        if (
                          pinFilters.includes(
                            item.key as keyof BiomeFilterState
                          )
                        ) {
                          setPinFilters(
                            pinFilters.filter((key) => key !== item.key)
                          )
                        } else {
                          setPinFilters([
                            ...pinFilters,
                            item.key as keyof BiomeFilterState,
                          ])
                        }
                      }}
                    >
                      {pinFilters.includes(
                        item.key as keyof BiomeFilterState
                      ) ? (
                        <Pin />
                      ) : (
                        <PinOff />
                      )}
                    </Button>
                  </div>
                </div>
                {item.component}
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center gap-2">
            <Separator />
            <div className="text-muted-foreground text-sm">
              {t('wiki.biome.filterCount')}: {filteredBiomes.length}
            </div>
            <DrawerClose asChild>
              <Button className="w-full" onClick={handleConfirm}>
                {t('common.confirm')}
              </Button>
            </DrawerClose>
            <DrawerClose asChild>
              <Button
                variant="secondary"
                className="w-full"
                onClick={handleConfirm}
              >
                {t('common.cancel')}
              </Button>
            </DrawerClose>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default FilterDrawer
