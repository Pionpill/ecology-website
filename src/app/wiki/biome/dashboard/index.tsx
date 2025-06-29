import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CreditCard, List, Sheet } from 'lucide-react'
import { useMemo, useState } from 'react'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import BiomeFilter from './biome-filter'
import useBiomeFilterStore from '../useBiomeFilterStore'
import { BiomeModel, getBiomeName } from '@ecology-mc/data'
import useLangStore from '@/hooks/useLangStore'
import BiomeTable from './biome-table'

export type BiomeDashboardMode = 'table' | 'list' | 'card'

const BiomeDashboard: FC = () => {
  // const {categories, tags, setBiomeFilter} = useBiomeFilterStore()
  const { t } = useTranslation()
  const { lang } = useLangStore()
  const [mode, setMode] = useState<BiomeDashboardMode>('table')
  const {
    rainfall,
    temperature,
    generate,
    dimension,
    category,
    tags,
    keyword,
  } = useBiomeFilterStore()

  const biomes = useMemo(() => {
    const biomes = BiomeModel.getByFilter({
      rainfall,
      temperature,
      generate,
      dimension,
      category,
      tags,
    })
    return keyword
      ? biomes.filter((biome) =>
          getBiomeName(biome.biomeId, lang).includes(keyword)
        )
      : biomes
  }, [rainfall, temperature, generate, dimension, category, tags, keyword])

  const biomeTotalInfo = useMemo(
    () => ({
      count: biomes.length,
      generate: biomes.reduce((acc, biome) => acc + (biome.generate ?? 0), 0),
    }),
    [biomes]
  )

  return (
    <div className="flex flex-1 flex-col overflow-auto">
      <Tabs
        value={mode}
        onValueChange={(newMode) => setMode(newMode as BiomeDashboardMode)}
        className="flex flex-row items-start justify-between p-2"
      >
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="table" className="cursor-pointer">
              <Sheet />
              {t('common.table')}
            </TabsTrigger>
            <TabsTrigger value="list" className="cursor-pointer">
              <List />
              {t('common.list')}
            </TabsTrigger>
            <TabsTrigger value="card" className="cursor-pointer">
              <CreditCard />
              {t('common.card')}
            </TabsTrigger>
          </TabsList>
        </div>
        <BiomeFilter />
      </Tabs>
      <div className="flex flex-1 flex-col gap-4 overflow-auto p-2">
        <BiomeTable data={biomes} />
        <div className="text-muted-foreground flex justify-end gap-2">
          <span>
            {t('wiki.biome.name') + t('common.count')}: {biomeTotalInfo.count}
          </span>
          <span>
            {t('common.percent')}: {biomeTotalInfo.generate / 100}%
          </span>
        </div>
      </div>
    </div>
  )
}

export default BiomeDashboard
