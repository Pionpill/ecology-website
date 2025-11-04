import useLangStore from '@/hooks/useLangStore'
import { getPlantMainLootItem, getPlantTypeIcon } from '@/utils/plant'
import {
    getItemIdName,
    getPlantTypeName,
    ItemId,
    PLANT_TYPE_DATA,
    PlantModel,
} from '@ecology-mc/data'
import { useMemo } from 'react'

const usePlantList = () => {
  const { lang } = useLangStore()

  return useMemo(
    () =>
      PLANT_TYPE_DATA.map((type) => {
        const label = getPlantTypeName(type, lang)
        return {
          label,
          type,
          key: `${type}-${lang}`,
          icon: getPlantTypeIcon(type),
          children: PlantModel.getByFilter({ type }).map((plant) => ({
            label: getItemIdName(
              getPlantMainLootItem(plant).itemId as ItemId,
              lang
            ),
            key: plant.seedId,
          })),
        }
      }),
    [lang]
  )
}

export default usePlantList
