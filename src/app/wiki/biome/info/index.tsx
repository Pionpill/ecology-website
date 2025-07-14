import { TEMPERATURE_RANGE_DAY } from '@/lib/constant'
import { BiomeId, BiomeModel } from '@ecology-mc/data'
import { FC, useEffect, useMemo } from 'react'
import { useParams } from 'react-router'
import PlantPane from './plant-pane'
import useBiomePlantFilterStore from './useBiomePlantFilterStore'

const BiomeInfo: FC = () => {
  const { biomeId } = useParams()
  const { setTemperature, setRainfall } = useBiomePlantFilterStore()

  const biomeModel = useMemo(
    () => BiomeModel.getById(biomeId as BiomeId),
    [biomeId]
  )

  useEffect(() => {
    const temperatureAdjust = TEMPERATURE_RANGE_DAY
    setTemperature([
      biomeModel.temperature * 20 - temperatureAdjust,
      biomeModel.temperature * 20 + temperatureAdjust,
    ])
    setRainfall([biomeModel.rainfall * 100, biomeModel.rainfall * 100])
  }, [biomeModel])

  return (
    <div className="flex flex-1 overflow-hidden">
      <div
        className="bg-muted flex flex-1 flex-col p-6"
        style={{
          backgroundImage:
            'radial-gradient(circle, var(--border) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      >
        <div className="flex flex-1">123</div>
      </div>
      <PlantPane />
    </div>
  )
}

export default BiomeInfo
