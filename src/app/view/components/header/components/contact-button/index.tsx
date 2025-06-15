import QQ from '@/components/icon/QQ'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MessageSquarePlus, Star } from 'lucide-react'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import JoinDialogContext from './JoinDialogContent'

const ContactButton: FC = () => {
  const { t } = useTranslation()

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="size-8 cursor-pointer">
            <MessageSquarePlus />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="start">
          <DropdownMenuLabel className="font-semibold">
            {t('header.contact.contactUs')}
          </DropdownMenuLabel>
          <DropdownMenuGroup>
            <DialogTrigger asChild>
              <DropdownMenuItem className="hover:cursor-pointer">
                <QQ className="fill-none" />
                {t('header.contact.joinUs')}
              </DropdownMenuItem>
            </DialogTrigger>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="hover:cursor-pointer"
              onClick={() =>
                window.open('https://github.com/Pionpill/ecology-website')
              }
            >
              <Star />
              {t('header.starProject')}
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
        <JoinDialogContext />
      </DropdownMenu>
    </Dialog>
  )
}

export default ContactButton
