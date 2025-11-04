import useSidebarStore from '@/app/wiki/_components/wiki-header/useSidebarStore'
import useLangStore from '@/hooks/useLangStore'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import usePlantList from './usePlantList'
import { cn } from '@/lib/utils'
import { Separator } from '@radix-ui/react-dropdown-menu'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import { ExternalLink } from 'lucide-react'
import { List, ListNode } from '@/components/shared/list'

export type PlantSidebarProps = {
  className?: string
}

const PlantSidebar: FC<PlantSidebarProps> = (props) => {
  const { className } = props
  const { t } = useTranslation()
  const { lang } = useLangStore()

  const { open } = useSidebarStore()

  const plantList = usePlantList()

  const handlePlantClick = (node: ListNode) => {
    console.log(node)
  }

  return (
    <div
      className={cn(
        'bg-sidebar overflow-hidden transition-all duration-500 flex flex-col h-full justify-between gap-2 p-4 border-r',
        {
          'w-56': open,
          'w-0': !open,
        },
        className
      )}
    >
      <div className="flex flex-1 flex-col gap-2 overflow-auto">
        <div className="flex items-center justify-between truncate overflow-hidden font-semibold uppercase">
          {t('wiki.plant.title')}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                className="size-6 cursor-pointer"
                onClick={() =>
                  window.open(
                    lang === 'zh'
                      ? 'https://zh.minecraft.wiki/w/%E7%94%9F%E7%89%A9%E7%BE%A4%E7%B3%BB'
                      : 'https://minecraft.fandom.com/wiki/Biome'
                  )
                }
              >
                <ExternalLink className="stroke-muted-foreground" />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="flex flex-col gap-1" side="right">
              <div className="w-56">{t('wiki.plant.description')}</div>
              <div className="w-56 font-semibold">
                {t('wiki.plant.descriptionClick')}
              </div>
            </TooltipContent>
          </Tooltip>
        </div>
        <List
          listNodes={plantList}
          className="flex-1 overflow-x-hidden"
          onClick={handlePlantClick}
        />
      </div>
      <Separator />
      <div className={'text-ring max-h-[80px] overflow-hidden text-xs'}>
        {t('wiki.sidebarTip')}
      </div>
    </div>
  )
}

export default PlantSidebar
