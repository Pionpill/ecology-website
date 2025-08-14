import { BiomeId, BiomeModel } from '@ecology-mc/data'
import { FC, useMemo, useState } from 'react'
import { useParams } from 'react-router'
import BiomePane from './biome-pane'
import PlantPane from './plant-pane'
import useDeviceStore from '@/hooks/useDeviceStore'
import { BiomeContext } from './useBiomeContext'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { useTranslation } from 'react-i18next'

const BiomeInfo: FC = () => {
  const { biomeId } = useParams()
  const { device } = useDeviceStore()

  const [altitude, setAltitude] = useState(64)

  const biomeModel = useMemo(
    () => BiomeModel.getById(biomeId as BiomeId),
    [biomeId]
  )

  const { t } = useTranslation()

  return (
    <BiomeContext value={{ biomeModel }}>
      {device === 'PC' ? (
        <div className="flex flex-1 overflow-hidden">
          <BiomePane altitude={altitude} onAltitudeChange={setAltitude} />
          <PlantPane altitude={altitude} />
        </div>
      ) : (
        <div className="flex flex-1 flex-col">
          <BiomePane altitude={altitude} onAltitudeChange={setAltitude} />
          <div className="flex w-full p-4">
            <Drawer snapPoints={[0.5, 1]}>
              <DrawerTrigger asChild>
                <Button className="w-full cursor-pointer">
                  {t('wiki.biome.plantList')}
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <PlantPane
                  altitude={altitude}
                  className="w-full h-full bg-transparent"
                />
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      )}
    </BiomeContext>
  )
}

export default BiomeInfo
