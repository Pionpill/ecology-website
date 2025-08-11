import {
  FRAME_DAY,
  FRAME_REAL_TIME_OFFSET,
  FRAME_TEMPERATURE_OFFSET,
  TEMPERATURE_RANGE_DAY,
} from '@/lib/constant'
import { BiomeCategory, Dimension } from '@ecology-mc/data'
import {
  Cloud,
  CloudDrizzle,
  CloudRain,
  Thermometer,
  ThermometerSnowflake,
  ThermometerSun,
  CloudFog,
  Eye,
  Fish,
  Flower2,
  LineSquiggle,
  Mountain,
  Skull,
  SunDim,
  TreeDeciduous,
  Waves,
  Earth,
} from 'lucide-react'

export const getRainfallIcon = (rainfall: number, size?: string | number) =>
  rainfall > 0.6 ? (
    <CloudRain size={size} />
  ) : rainfall < 0.2 ? (
    <Cloud size={size} />
  ) : (
    <CloudDrizzle size={size} />
  )

export const getTemperatureIcon = (
  temperature: number,
  size?: string | number
) =>
  temperature > 1 ? (
    <ThermometerSun size={size} className="text-red-500" />
  ) : temperature < 0 ? (
    <ThermometerSnowflake size={size} className="text-blue-500" />
  ) : (
    <Thermometer size={size} />
  )

export const getBiomeCatalogIcon = (
  catalog: BiomeCategory,
  size?: string | number
) => {
  switch (catalog) {
    case 'forest':
      return <TreeDeciduous size={size} />
    case 'ocean':
      return <Waves size={size} />
    case 'drought':
      return <SunDim size={size} />
    case 'mountain':
      return <Mountain size={size} />
    case 'plain':
      return <Flower2 size={size} />
    case 'nether':
      return <Skull size={size} />
    case 'cave':
      return <LineSquiggle size={size} />
    case 'swamp':
      return <CloudFog size={size} />
    case 'river':
      return <Fish size={size} />
    case 'the_end':
      return <Eye size={size} />
    default:
      return <TreeDeciduous size={size} />
  }
}

export const getBiomeDimensionIcon = (
  dimension: Dimension,
  size?: string | number
) => {
  switch (dimension) {
    case 'overworld':
      return <Earth size={size} />
    case 'the_end':
      return <Eye size={size} />
    default:
      return <Skull size={size} />
  }
}

/** 获取一天中某帧得温度偏移值 */
export const getAdjustTemperatureOfDay = (frame: number) => {
  const sinValue = Math.sin(
    2 * Math.PI * ((frame + FRAME_TEMPERATURE_OFFSET + FRAME_REAL_TIME_OFFSET) / FRAME_DAY)
  )
  return sinValue * TEMPERATURE_RANGE_DAY
}
