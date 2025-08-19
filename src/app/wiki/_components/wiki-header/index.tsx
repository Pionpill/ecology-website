import TooltipButton from '@/components/shared/TooltipButton'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import useDeviceStore from '@/hooks/useDeviceStore'
import { Link as LinkIcon, PanelLeftOpen, PanelRightOpen } from 'lucide-react'
import { FC, PropsWithChildren } from 'react'
import { useTranslation } from 'react-i18next'
import useSidebarStore from './useSidebarStore'

const WikiHeader: FC<PropsWithChildren> = (props) => {
  const { children } = props
  const { t } = useTranslation()
  const { device } = useDeviceStore()

  const { open, setOpen } = useSidebarStore()

  return (
    <div className="bg-sidebar flex items-center justify-between gap-2 p-2">
      <div className="flex items-center gap-1">
        {device === 'PC' ? (
          <>
            <Button
              variant="ghost"
              className="size-6 cursor-pointer"
              onClick={() => setOpen(!open)}
            >
              {open ? <PanelRightOpen /> : <PanelLeftOpen />}
            </Button>
            <Separator
              orientation="vertical"
              className="mr-1 !h-4 !w-[1.5px]"
            />
          </>
        ) : null}
        {children}
      </div>
      <TooltipButton
        variant="outline"
        tooltipContent={t('common.copyRoute')}
        onClick={() => navigator.clipboard.writeText(window.location.href)}
      >
        <LinkIcon />
      </TooltipButton>
    </div>
  )
}

export default WikiHeader
