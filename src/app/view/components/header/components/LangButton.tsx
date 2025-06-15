import { Button } from '@/components/ui/button'
import useLangStore from '@/hooks/useLangStore'
import { cn } from '@/lib/utils'
import { FC, ReactNode } from 'react'

export type LangButtonProps = {
  children?: ReactNode
  className?: string
}

const LangButton: FC<LangButtonProps> = (props) => {
  const { children, className } = props
  const { lang, switchLang } = useLangStore()

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn("size-8 cursor-pointer", className)}
      onClick={() => switchLang()}
    >
      {lang === 'zh' ? '中' : 'En'} {children}
    </Button>
  )
}

export default LangButton
