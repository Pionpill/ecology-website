import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Toggle } from '@/components/ui/toggle'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import useLangStore from '@/hooks/useLangStore'
import { cn } from '@/lib/utils'
import { hasIntersectionRange } from '@/utils/math'
import { getPlantTypeIcon } from '@/utils/plant'
import {
  getItemIdName,
  getPlantTypeName,
  ItemId,
  PLANT_TYPE_DATA,
  PlantModel,
  PlantType,
} from '@ecology-mc/data'
import { CircleQuestionMark, Search } from 'lucide-react'
import { FC, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import useBiomePlantFilterStore from '../useBiomePlantFilterStore'
import PlantBarChart from './PlantBarChart'
import PlantItem from './PlantItem'

const PlantPane: FC = () => {
  const { t } = useTranslation()
  const { lang } = useLangStore()
  const [keyword, setKeyword] = useState('')
  const [suitOnly, setSuitOnly] = useState(false)

  const [togglePlantTypes, setTogglePlantTypes] = useState<PlantType[]>(
    PLANT_TYPE_DATA.filter((type) => type !== 'grass')
  )

  const { temperature, rainfall } = useBiomePlantFilterStore()

  const allPlants = useMemo(() => PlantModel.getAll(), [])

  const [suitPlants, canPlants] = useMemo(() => {
    return [
      allPlants.filter(
        (plant) =>
          hasIntersectionRange(temperature, plant.temperatureRange.suit) &&
          hasIntersectionRange(rainfall, plant.rainfallRange.suit)
      ),
      allPlants.filter(
        (plant) =>
          hasIntersectionRange(temperature, plant.temperatureRange.can) &&
          hasIntersectionRange(rainfall, plant.rainfallRange.can)
      ),
    ]
  }, [temperature, rainfall])

  const plants = useMemo(() => {
    const allData = suitOnly ? suitPlants : canPlants
    return allData.filter((plant) => {
      if (!togglePlantTypes.includes(plant.type)) return false
      const lootItems = plant.lootItems
      const itemId =
        lootItems.find((item) => !item.itemId.includes('seed'))?.itemId ||
        lootItems[0].itemId
      const itemName = getItemIdName(itemId as ItemId, lang)
      if (!itemName) return false
      return itemName.includes(keyword)
    })
  }, [keyword, suitOnly, suitPlants, canPlants, togglePlantTypes, lang])

  return (
    <div className="bg-muted-secondary flex h-full w-72 flex-col gap-4 overflow-hidden p-4">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="font-semibold">{t('wiki.biome.plantList')}</span>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" className="size-6">
                <CircleQuestionMark />
              </Button>
            </TooltipTrigger>
            <TooltipContent>{t('wiki.biome.plantListTooltip')}</TooltipContent>
          </Tooltip>
        </div>
        <span className="text-ring text-sm">
          {t('wiki.biome.plantListDescription')}
        </span>
      </div>
      <div>
        <PlantBarChart canPlants={canPlants} suitPlants={suitPlants} />
      </div>
      <div className="flex flex-1 flex-col gap-2 overflow-hidden">
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
          {PLANT_TYPE_DATA.filter((type) => type !== 'grass').map(
            (plantType) => (
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
                  className="cursor-pointer data-[state=on]:border"
                >
                  {getPlantTypeIcon(plantType)}
                </Toggle>
                <span className="text-ring text-[10px]">
                  {getPlantTypeName(plantType, lang)}
                </span>
              </div>
            )
          )}
        </div>
        <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
          {plants.map((plant) => (
            <PlantItem plantModel={plant} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default PlantPane
