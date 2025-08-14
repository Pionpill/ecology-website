import { Input } from '@/components/ui/input'
import useLangStore from '@/hooks/useLangStore'
import { cn } from '@/lib/utils'
import { getPlantTypeIcon } from '@/utils/plant'
import {
    getItemIdName,
    getPlantTypeName,
    ItemId,
    PLANT_TYPE_DATA,
    PlantType
} from '@ecology-mc/data'
import { Toggle } from '@radix-ui/react-toggle'
import { Search } from 'lucide-react'
import { FC, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import useBiomeSelectPlantStore from '../useBiomeSelectPlantStore'
import { BiomePlantEnvironment } from './interface'
import PlantItem from './PlantItem'

export type PlantListProps = {
  canPlants: BiomePlantEnvironment[]
  suitPlants: BiomePlantEnvironment[]
  className?: string
}

const PlantList: FC<PlantListProps> = (props) => {
  const { className, canPlants, suitPlants } = props
  const { t } = useTranslation()
  const { lang } = useLangStore()
  const { selectedPlants, setSelectedPlants } = useBiomeSelectPlantStore()

  const [keyword, setKeyword] = useState('')
  const [suitOnly, setSuitOnly] = useState(false)
  const [togglePlantTypes, setTogglePlantTypes] = useState<PlantType[]>(
    PLANT_TYPE_DATA.filter((type) => type !== 'grass')
  )

  const plantsInfo = useMemo(() => {
    const allData = suitOnly ? suitPlants : canPlants
    return allData.filter((plantInfo) => {
      if (!togglePlantTypes.includes(plantInfo.plant.type)) return false
      const lootItems = plantInfo.plant.lootItems
      const itemId =
        lootItems.find((item) => !item.itemId.includes('seed'))?.itemId ||
        lootItems[0].itemId
      const itemName = getItemIdName(itemId as ItemId, lang)
      if (!itemName) return false
      return itemName.includes(keyword)
    })
  }, [keyword, suitOnly, suitPlants, canPlants, togglePlantTypes, lang])

  return (
    <div className={cn("flex flex-1 flex-col gap-2 overflow-hidden", className)}>
      <div className="flex items-center gap-1">
        <div className="relative flex-1/4">
          <Input
            placeholder={t('common.search')}
            size={10}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className={cn(
              'bg-accent h-8 truncate border-none pl-7 shadow-none transition-all'
            )}
          />
          <Search className="text-muted-foreground absolute top-1/2 left-2 h-4 w-4 -translate-y-1/2" />
        </div>
        <Toggle
          aria-label="Toggle italic"
          onPressedChange={() => setSuitOnly(!suitOnly)}
          pressed
          className="cursor-pointer text-sm"
        >
          {suitOnly ? t('common.suit') : t('common.all')}
        </Toggle>
      </div>
      <div className="flex items-center justify-between">
        {PLANT_TYPE_DATA.filter((type) => type !== 'grass').map((plantType) => (
          <div key={plantType} className="flex flex-col items-center gap-1">
            <Toggle
              pressed={togglePlantTypes.includes(plantType)}
              onPressedChange={() => {
                if (togglePlantTypes.includes(plantType)) {
                  setTogglePlantTypes(
                    togglePlantTypes.filter((type) => type !== plantType)
                  )
                } else {
                  setTogglePlantTypes([...togglePlantTypes, plantType])
                }
              }}
              className="cursor-pointer data-[state=on]:bg-muted rounded p-2"
            >
              {getPlantTypeIcon(plantType)}
            </Toggle>
            <span className="text-ring text-[10px]">
              {getPlantTypeName(plantType, lang)}
            </span>
          </div>
        ))}
      </div>
      <div className="flex flex-1 flex-col gap-1 overflow-x-hidden overflow-y-auto">
        {plantsInfo
          .sort((a, b) => b.growRate - a.growRate)
          .map((plantInfo) => (
            <PlantItem
              key={plantInfo.plant.seedId}
              plantModel={plantInfo.plant}
              temperatureRange={plantInfo.temperatureRange}
              rainfallRange={plantInfo.rainfallRange}
              className="cursor-pointer"
              onClick={() => {
                const newPlants = selectedPlants.includes(plantInfo.plant)
                  ? selectedPlants.filter((plant) => plant !== plantInfo.plant)
                  : [...selectedPlants, plantInfo.plant]
                setSelectedPlants(newPlants)
              }}
            />
          ))}
      </div>
    </div>
  )
}

export default PlantList
