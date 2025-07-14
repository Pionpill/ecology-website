import { LangType } from '@/hooks/useLangStore'
import {
  getMaterialTypeName,
  getPlantFamilyName,
  getPlantProduceName,
  getPlantTypeName,
  ITEM_TYPE,
  ItemModel,
  ItemType,
  MATERIAL_TYPE,
  PLANT_FAMILY,
  PLANT_PRODUCT,
  PLANT_TYPE_DATA,
  PlantFamily,
  PlantProduce,
  PlantType,
} from '@ecology-mc/data'
import { MaterialType } from '@ecology-mc/data/dist/lib/plant/type'

/** 获取物品标签 */
export const getItemTagInfo = (item: ItemModel, lang: LangType) => {
  const itemTag = item.tags.find((tag) => ITEM_TYPE.includes(tag as ItemType))
  return itemTag ? getPlantFamilyName(itemTag as PlantFamily, lang) : null
}

/** 获取物品标签-作物科目 */
export const getItemPlantFamilyInfo = (item: ItemModel, lang: LangType) => {
  const itemFamily = item.tags.find((tag) =>
    PLANT_FAMILY.includes(tag as PlantFamily)
  )
  return itemFamily ? getPlantFamilyName(itemFamily as PlantFamily, lang) : null
}

/** 获取物品标签-作物类型 */
export const getItemPlantTypeInfo = (item: ItemModel, lang: LangType) => {
  const itemType = item.tags.find((tag) =>
    PLANT_TYPE_DATA.includes(tag as PlantType)
  )
  return itemType ? getPlantTypeName(itemType as PlantType, lang) : null
}

/** 获取物品标签-作物产物 */
export const getItemProduceInfo = (item: ItemModel, lang: LangType) => {
  const itemProduct = item.tags.find((tag) =>
    PLANT_PRODUCT.includes(tag as PlantProduce)
  )
  return itemProduct
    ? getPlantProduceName(itemProduct as PlantProduce, lang)
    : null
}

/** 获取物品标签-材料类型 */
export const getItemMaterialTypeInfo = (item: ItemModel, lang: LangType) => {
  const itemMaterialType = item.tags.find((tag) =>
    MATERIAL_TYPE.includes(tag as MaterialType)
  )
  return itemMaterialType
    ? getMaterialTypeName(itemMaterialType as MaterialType, lang)
    : null
}
