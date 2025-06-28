import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CreditCard, List } from 'lucide-react'
import { useMemo, useState } from 'react'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import BiomeFilter from './biome-filter'
import useBiomeFilterStore from '../useBiomeFilterStore'
import { BiomeModel, getBiomeName } from '@ecology-mc/data'
import useLangStore from '@/hooks/useLangStore'

const BiomeDashboard: FC = () => {
  // const {categories, tags, setBiomeFilter} = useBiomeFilterStore()
  const { t } = useTranslation()
  const { lang } = useLangStore()
  const [mode, setMode] = useState<'list' | 'card'>('list')
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

  console.log('biomes', biomes)

  return (
    <div className="flex flex-1 flex-col">
      <Tabs
        value={mode}
        onValueChange={(newMode) => setMode(newMode as 'list' | 'card')}
        className="flex flex-row items-start justify-between p-2"
      >
        <TabsList>
          <TabsTrigger value="list" className="cursor-pointer">
            <List />
            {t('common.list')}
          </TabsTrigger>
          <TabsTrigger value="card" className="cursor-pointer">
            <CreditCard />
            {t('common.card')}
          </TabsTrigger>
        </TabsList>
        <BiomeFilter />
      </Tabs>
      <div className="flex flex-1 p-2">
        123
      </div>
    </div>
  )
}

export default BiomeDashboard
