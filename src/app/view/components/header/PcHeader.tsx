import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { getCosImageUrl } from '@/utils/cos'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import ThemeButton from './components/ThemeButton'
import LangButton from './components/LangButton'
import ContactButton from './components/contact-button'

const PCHeader: FC = () => {
  const { t } = useTranslation()

  return (
    <div className="flex h-10 items-center justify-between border-b px-2 py-1">
      <img src={getCosImageUrl('ecology/imgs/ecology.png')} className="h-8" />
      <NavigationMenu viewport={false}>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="cursor-pointer bg-transparent">
              {t('header.wiki')}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink asChild>
                <a>
                  <div className="grid w-[400px] gap-2">
                    <div className="bg-secondary flex w-48 flex-col gap-4 rounded-md p-2">
                      <div className="text-xl">{t('header.ecologyWiki')}</div>
                      <div className="text-muted-foreground">
                        {t('header.ecologyWikiContent')}
                      </div>
                    </div>
                    <div>123</div>
                  </div>
                </a>
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div className="flex items-center">
        <ThemeButton />
        <LangButton />
        <ContactButton />
      </div>
    </div>
  )
}

export default PCHeader
