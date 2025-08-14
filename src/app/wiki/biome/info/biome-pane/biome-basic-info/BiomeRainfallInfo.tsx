import { getRainfallIcon } from '@/utils/biome'
import { FC } from 'react'
import useBiomeContext from '../../useBiomeContext'
import { useTranslation } from 'react-i18next'
import useDeviceStore from '@/hooks/useDeviceStore'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import { CircleQuestionMark } from 'lucide-react'
import { cn } from '@/lib/utils'

const BiomeRainfallInfo: FC<{className?: string}> = ({className}) => {
  const { biomeModel } = useBiomeContext()
  const { t } = useTranslation()
  const { device } = useDeviceStore()

  return device === 'PC' ? (
    <div className={cn("flex flex-col gap-2", className)}>
      <span>{getRainfallIcon(biomeModel.rainfall, 26)}</span>
      <div className="flex items-center gap-2 text-xl">
        <span>{t('common.rainfall')}</span>
        <span className="text-xl">{biomeModel.rainfall * 100} %</span>
      </div>
      <span className="text-muted-foreground text-xs">
        {t('wiki.biome.rainfallTip')}
      </span>
    </div>
  ) : (
    <div className={cn("flex flex-1 flex-col gap-2", className)}>
      <div className="flex items-center">
        <span className="text-sm">{t('common.rainfall')}</span>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" className="size-5 bg-transparent">
              <CircleQuestionMark className="text-muted-foreground" />
            </Button>
          </TooltipTrigger>
          <TooltipContent className="whitespace-pre">
            {t('wiki.biome.rainfallTip')}
          </TooltipContent>
        </Tooltip>
      </div>
      <div className="flex items-center gap-2">
        <span>{getRainfallIcon(biomeModel.rainfall, 20)}</span>
        <span className="text-lg">{biomeModel.rainfall * 100} %</span>
      </div>
    </div>
  )
}

export default BiomeRainfallInfo
