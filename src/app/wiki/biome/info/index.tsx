import { BiomeId, BiomeModel } from '@ecology-mc/data'
import { FC, useMemo, useState } from 'react'
import { useParams } from 'react-router'
import BiomePane from './biome-pane'
import PlantPane from './plant-pane'

const BiomeInfo: FC = () => {
  const { biomeId } = useParams()

  const [altitude, setAltitude] = useState(64)

  const biomeModel = useMemo(
    () => BiomeModel.getById(biomeId as BiomeId),
    [biomeId]
  )

  return (
    <div className="flex flex-1 overflow-hidden">
      <BiomePane biomeModel={biomeModel} altitude={altitude} onAltitudeChange={setAltitude} />
      <PlantPane biomeModel={biomeModel} altitude={altitude} />
    </div>
  )
}

export default BiomeInfo
