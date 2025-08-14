import { BiomeModel } from '@ecology-mc/data'
import { createContext, useContext } from 'react'

export const BiomeContext = createContext<{
  biomeModel: BiomeModel
}>({
  biomeModel: BiomeModel.getById('minecraft:plains'),
})

const useBiomeContext = () => useContext(BiomeContext)

export default useBiomeContext
