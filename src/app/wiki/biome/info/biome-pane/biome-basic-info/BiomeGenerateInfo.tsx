import { FC } from 'react'
import useBiomeContext from '../../useBiomeContext'
import { useTranslation } from 'react-i18next'
import { ChartPie, CircleQuestionMark } from 'lucide-react'
import useDeviceStore from '@/hooks/useDeviceStore'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const BiomeGenerateInfo: FC<{className?: string}> = ({className}) => {
  const { biomeModel } = useBiomeContext()
  const { t } = useTranslation()
  const { device } = useDeviceStore()

  return device === 'PC' ? (
    <div className={cn("flex flex-col gap-2", className)}>
      <ChartPie size={26} />
      <div className="flex items-center gap-2 text-xl">
        <span>{t('common.generate')}</span>
        <span className="text-xl">
          {biomeModel.generate
            ? `${biomeModel.generate / 100}%`
            : t('common.unCounted')}
        </span>
      </div>
      <span className="text-muted-foreground text-xs">
        {t('wiki.biome.generateTip')}
      </span>
    </div>
  ) : (
    <div className={cn("flex flex-1 flex-col gap-2", className)}>
      <div className="flex items-center">
        <span className="text-sm">{t('common.generate')}</span>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" className="size-5 bg-transparent">
              <CircleQuestionMark className="text-muted-foreground" />
            </Button>
          </TooltipTrigger>
          <TooltipContent className="whitespace-pre">
            {t('wiki.biome.generateTip')}
          </TooltipContent>
        </Tooltip>
      </div>
      <div className="flex items-center gap-2">
        <span>
          <ChartPie size={20} />
        </span>
        <span className="text-lg">
          {' '}
          {biomeModel.generate
            ? `${biomeModel.generate / 100}%`
            : t('common.unCounted')}
        </span>
      </div>
    </div>
  )
}

export default BiomeGenerateInfo
