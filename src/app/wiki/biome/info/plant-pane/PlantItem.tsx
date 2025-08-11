import { Badge } from '@/components/ui/badge'
import useLangStore from '@/hooks/useLangStore'
import { cn } from '@/lib/utils'
import {
  getItemMaterialTypeInfo,
  getItemPlantFamilyInfo,
  getItemPlantTypeInfo,
  getItemProduceInfo,
  getItemTagInfo,
} from '@/utils/item'
import { formatFloatNumber } from '@/utils/math'
import { getPlantGrowthRateByRange } from '@/utils/plant'
import { getItemIdName, ItemId, ItemModel, PlantModel } from '@ecology-mc/data'
import { Star } from 'lucide-react'
import { FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import useBiomeSelectPlantStore from '../useBiomeSelectPlantStore'

export type PlantItemProps = {
  plantModel: PlantModel
  temperatureRange: [number, number]
  rainfallRange: [number, number]
  className?: string
  onClick?: () => void
}

const PlantItem: FC<PlantItemProps> = (props) => {
  const { plantModel, temperatureRange, rainfallRange, className, onClick } =
    props
  const { lang } = useLangStore()
  const { t } = useTranslation()
  const { selectedPlants } = useBiomeSelectPlantStore()

  const growRate = useMemo(
    () =>
      getPlantGrowthRateByRange(plantModel, {
        temperatureRange,
        rainfallRange,
      }),
    [plantModel, temperatureRange, rainfallRange]
  )

  const itemModel = useMemo(() => {
    try {
      const lootItems = plantModel.lootItems
      const itemId =
        lootItems.find((item) => !item.itemId.includes('seed'))?.itemId ||
        lootItems[0].itemId
      return ItemModel.getById(itemId as ItemId)
    } catch {
      return null
    }
  }, [plantModel.seedId])

  const itemTags = useMemo(
    () =>
      itemModel
        ? {
            item: getItemTagInfo(itemModel, lang),
            family: getItemPlantFamilyInfo(itemModel, lang),
            type: getItemPlantTypeInfo(itemModel, lang),
            produce: getItemProduceInfo(itemModel, lang),
            material: getItemMaterialTypeInfo(itemModel, lang),
          }
        : null,
    [itemModel, lang]
  )

  return itemModel ? (
    <div
      className={cn('flex items-center gap-4 p-1', {
        "bg-accent rounded": selectedPlants.includes(plantModel)
      } , className)}
      onClick={onClick}
    >
      {itemModel.image ? (
        <img
          width={40}
          src={itemModel.image}
          style={{ imageRendering: 'pixelated' }}
          className="bg-accent rounded p-1"
        />
      ) : null}
      <div className="flex w-full flex-col gap-0.5 overflow-hidden">
        <div className="flex items-center justify-between">
          <div>{getItemIdName(itemModel.itemId, lang)}</div>
          <div className="flex items-center">
            {Array.from({ length: itemModel.quality }).map((_, index) => (
              <Star key={index} fill="orange" stroke="none" size={16} />
            ))}
          </div>
        </div>
        <div className="flex w-full items-center justify-between overflow-hidden">
          {itemTags ? (
            <div
              className="text-muted-foreground flex-1 truncate text-xs"
              title={Object.values(itemTags)
                .filter((item) => item)
                .join(' / ')}
            >
              {Object.values(itemTags)
                .filter((item) => item)
                .join(' / ')}
            </div>
          ) : null}
          <Badge
            variant="outline"
            title={growRate === 1 ? t('common.suit') : t('wiki.plant.growRate')}
          >
            {growRate === 1
              ? t('common.suit')
              : `${formatFloatNumber(growRate * 100, 1)}%`}
          </Badge>
        </div>
      </div>
    </div>
  ) : null
}

export default PlantItem
