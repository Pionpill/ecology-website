import { FC, useMemo } from 'react'
import useBiomeContext from '../../useBiomeContext'
import { getTemperatureIcon } from '@/utils/biome'
import {
  HEIGHT_MIDDLE,
  TEMPERATURE_ADJUST_WIND,
  TEMPERATURE_RANGE_ALTITUDE,
  TEMPERATURE_RANGE_DAY,
} from '@/lib/constant'
import { useTranslation } from 'react-i18next'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import { CircleQuestionMark } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

export type BiomeTemperatureInfoProps = {
  className?: string
  altitude: number
  onAltitudeChange: (altitude: number) => void
}

const BiomeTemperatureInfo: FC<BiomeTemperatureInfoProps> = (props) => {
  const { className, altitude, onAltitudeChange } = props
  const { biomeModel } = useBiomeContext()
  const { t } = useTranslation()

  const basicTemperature = useMemo(
    () =>
      Math.round(
        (biomeModel.temperature * 20 +
          (HEIGHT_MIDDLE - altitude) * TEMPERATURE_RANGE_ALTITUDE) *
          10
      ) / 10,
    [biomeModel, altitude]
  )

  return (
    <div className={cn('flex max-w-[300px] flex-col gap-2', className)}>
      <div className="flex items-center gap-2 text-3xl">
        <span>{getTemperatureIcon(biomeModel.temperature, 32)}</span>
        <span>
          {basicTemperature} ± {TEMPERATURE_RANGE_DAY + TEMPERATURE_ADJUST_WIND}{' '}
          ℃
        </span>
      </div>
      <div className="flex items-center text-sm">
        <div className="flex items-center">
          <span>{t('common.altitude')}</span>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" className="size-6 bg-transparent">
                <CircleQuestionMark className="text-muted-foreground"/>
              </Button>
            </TooltipTrigger>
            <TooltipContent className="whitespace-pre">
              {t('wiki.biome.altitudeInfluence')}
            </TooltipContent>
          </Tooltip>
        </div>
        <Input
          type="number"
          className="h-8 w-20"
          value={altitude}
          onChange={(e) => onAltitudeChange(Number(e.target.value))}
        />
      </div>
      <span className="text-muted-foreground text-xs">
        {t('wiki.biome.temperatureTip')}
      </span>
    </div>
  )
}

export default BiomeTemperatureInfo
