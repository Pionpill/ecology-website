import { Badge } from '@/components/ui/badge'
import useLangStore from '@/hooks/useLangStore'
import {
    getItemMaterialTypeInfo,
    getItemPlantFamilyInfo,
    getItemPlantTypeInfo,
    getItemProduceInfo,
    getItemTagInfo,
} from '@/utils/item'
import { hasIntersectionRange } from '@/utils/math'
import { getItemIdName, ItemId, ItemModel, PlantModel } from '@ecology-mc/data'
import { Star } from 'lucide-react'
import { FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import useBiomePlantFilterStore from '../useBiomePlantFilterStore'

export type PlantItemProps = {
  plantModel: PlantModel
}

const PlantItem: FC<PlantItemProps> = (props) => {
  const { plantModel } = props
  const { lang } = useLangStore()
  const { t } = useTranslation()
  const { temperature, rainfall } = useBiomePlantFilterStore()

  const isSuit =
    hasIntersectionRange(temperature, plantModel.temperatureRange.suit) &&
    hasIntersectionRange(rainfall, plantModel.rainfallRange.suit)

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
    <div className="flex items-center gap-4 py-2">
      {itemModel.image ? (
        <img
          width={40}
          src={itemModel.image}
          style={{ imageRendering: 'pixelated' }}
          className="bg-accent rounded p-1"
        />
      ) : null}
      <div className="flex w-full flex-col gap-0.5">
        <div className="flex items-center justify-between">
          <div>{getItemIdName(itemModel.itemId, lang)}</div>
          <div className="flex items-center">
            {Array.from({ length: itemModel.quality }).map((_, index) => (
              <Star key={index} fill="orange" stroke="none" size={16} />
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between">
          {itemTags ? (
            <div className="text-muted-foreground text-sm">
              {Object.values(itemTags)
                .filter((item) => item)
                .join(' / ')}
            </div>
          ) : null}
          <Badge variant="outline">
            {isSuit ? t('common.suit') : t('common.can')}
          </Badge>
        </div>
      </div>
    </div>
  ) : null
}

export default PlantItem
