import useDeviceStore from '@/hooks/useDeviceStore'
import { cn } from '@/lib/utils'
import { FC } from 'react'
import BiomeGenerateInfo from './BiomeGenerateInfo'
import BiomeRainfallInfo from './BiomeRainfallInfo'
import BiomeTemperatureInfo from './BiomeTemperatureInfo'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

export type BiomeBasicInfoProps = {
  altitude: number
  onAltitudeChange: (altitude: number) => void
}

const BiomeBasicInfo: FC<BiomeBasicInfoProps> = (props) => {
  const { altitude, onAltitudeChange } = props
  const { device } = useDeviceStore()

  return device === 'PC' ? (
    <div className={cn('flex w-full items-end gap-16')}>
      <BiomeTemperatureInfo
        altitude={altitude}
        onAltitudeChange={onAltitudeChange}
      />
      <BiomeRainfallInfo />
      <BiomeGenerateInfo />
    </div>
  ) : (
    <Card className="gap-0 border-none p-0 shadow-none bg-muted-secondary">
      <BiomeTemperatureInfo
        className="p-4"
        altitude={altitude}
        onAltitudeChange={onAltitudeChange}
      />
      <Separator />
      <div className="flex gap-4">
        <BiomeRainfallInfo className="p-4"/>
        <Separator orientation="vertical" />
        <BiomeGenerateInfo className="p-4"/>
      </div>
    </Card>
  )
}

export default BiomeBasicInfo
