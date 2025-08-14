import QQ from '@/components/icon/QQ'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import useSideDrawer from '@/hooks/useSideDrawer'
import { cn } from '@/lib/utils'
import { getCosImageUrl } from '@/utils/cos'
import { PanelRightClose, SquareMenu, Star } from 'lucide-react'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import JoinDialogContext from './components/contact-button/JoinDialogContent'
import LangButton from './components/LangButton'
import ThemeButton from './components/ThemeButton'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'

const MobileHeader: FC = () => {
  const { t } = useTranslation()
  const { component } = useSideDrawer()

  return (
    <div className="flex h-10 items-center justify-between border-b py-1">
      {component ? (
        <Drawer direction="left">
          <DrawerTrigger asChild>
            <Button variant="ghost" className="cursor-pointer">
              <PanelRightClose />
            </Button>
          </DrawerTrigger>
          <DrawerContent>{component}</DrawerContent>
        </Drawer>
      ) : null}
      <img
        src={getCosImageUrl('ecology/imgs/ecology.png')}
        className={cn('h-8', {
          'pl-3': !component,
        })}
      />
      <Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="cursor-pointer">
              <SquareMenu />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuLabel className="font-semibold uppercase">
              {t('header.navigationMenu')}
            </DropdownMenuLabel>
            <DropdownMenuGroup>
              <div className="flex flex-col items-start gap-2">
                <ThemeButton className="w-auto px-2">
                  <p>{t('header.theme')}</p>
                </ThemeButton>
                <LangButton className="w-auto px-2">
                  <p>{t('header.lang')}</p>
                </LangButton>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    className="h-8 pl-2! hover:cursor-pointer"
                  >
                    <QQ className="fill-none" />
                    {t('header.contact.joinUs')}
                  </Button>
                </DialogTrigger>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    className="h-8 pl-2! hover:cursor-pointer"
                    onClick={() =>
                      window.open('https://github.com/Pionpill/ecology-website')
                    }
                  >
                    <Star />
                    {t('header.starProject')}
                  </Button>
                </DialogTrigger>
              </div>
            </DropdownMenuGroup>
          </DropdownMenuContent>
          <JoinDialogContext />
        </DropdownMenu>
      </Dialog>
    </div>
  )
}

export default MobileHeader
