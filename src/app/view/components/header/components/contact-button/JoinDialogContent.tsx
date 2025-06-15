import QQ from '@/components/icon/QQ'
import { Button } from '@/components/ui/button'
import {
  DialogDescription,
  DialogHeader,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import useDeviceStore from '@/hooks/useDeviceStore'
import { UserPlus, Clipboard, Check } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'

const JoinDialogContext: FC = () => {
  const { t } = useTranslation()
  const [groupCopy, setGroupCopy] = useState(false)
  const [authorCopy, setAuthorCopy] = useState(false)
  const { device } = useDeviceStore()

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <QQ className="size-5 fill-blue-600 stroke-0" />
          {t('common.qq')}
        </DialogTitle>
        <DialogDescription>
          {t('header.contact.joinUsDescription')}
        </DialogDescription>
      </DialogHeader>
      <div className="flex flex-col items-center justify-center gap-8 sm:flex-row">
        <div className="flex flex-col items-center gap-2">
          <div className="relative">
            <QRCodeSVG
              value="https://qm.qq.com/q/yRtavFNVaa"
              bgColor="transparent"
              fgColor="var(--foreground)"
              minVersion={5}
            />
            <img
              className="absolute top-1/2 left-1/2 size-7 -translate-1/2 rounded-md"
              src="https://p.qlogo.cn/gh/712936357/712936357/0"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button
              className="h-6 cursor-pointer px-2"
              onClick={() =>
                window.open(
                  'https://qm.qq.com/cgi-bin/qm/qr?k=jP4YFV8sZj8G7IcPYSwzklvFwzSSP7z5&jump_from=webapi&authKey=9Bi1UtUQm5Wutg2BhwJT+3zwRqCzLuVfvnhFvrPa9FtvSwToK7aLuXtHN2tPGnX6'
                )
              }
            >
              <UserPlus />
              {t('header.contact.joinGroup')}
            </Button>
          </div>
          <span className="flex items-center gap-1 text-xs">
            712936357
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className="size-5 cursor-pointer rounded-xs"
                  variant="secondary"
                  onClick={() => {
                    navigator.clipboard.writeText('712936357')
                    setGroupCopy(true)
                    setTimeout(() => {
                      setGroupCopy(false)
                    }, 1000)
                  }}
                >
                  {groupCopy ? <Check /> : <Clipboard />}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>
                  {groupCopy
                    ? t('common.copySuccess')
                    : t('common.copyToClipboard')}
                </p>
              </TooltipContent>
            </Tooltip>
          </span>
        </div>
        <Separator orientation={device === "PC" ? "vertical" : "horizontal"} />
        <div className="flex flex-col items-center gap-2">
          <div className="relative">
            <QRCodeSVG
              value="https://qm.qq.com/cgi-bin/qm/qr?k=8XRx97ISM1ZGoJBXA7rgYjQYjZz-Twv6&noverify=0&personal_qrcode_source=4"
              bgColor="transparent"
              fgColor="var(--foreground)"
              minVersion={5}
            />
            <img
              className="absolute top-1/2 left-1/2 size-7 -translate-1/2 rounded-md"
              src="https://q2.qlogo.cn/headimg_dl?dst_uin=673486387&spec=100"
            />
          </div>
          <div className="mt-1 flex items-center gap-2 text-sm">
            {t('header.contact.contactAuthor') +
              ', ' +
              t('header.contact.indicatePurpose')}
          </div>
          <span className="flex items-center gap-1 text-[10px]">
            wxid_ako3myhp30ye22
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className="size-5 cursor-pointer rounded-xs"
                  variant="secondary"
                  onClick={() => {
                    navigator.clipboard.writeText('wxid_ako3myhp30ye22')
                    setAuthorCopy(true)
                    setTimeout(() => {
                      setAuthorCopy(false)
                    }, 1000)
                  }}
                >
                  {authorCopy ? <Check /> : <Clipboard />}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>
                  {authorCopy
                    ? t('common.copySuccess')
                    : t('common.copyToClipboard')}
                </p>
              </TooltipContent>
            </Tooltip>
          </span>
        </div>
      </div>
    </DialogContent>
  )
}

export default JoinDialogContext
