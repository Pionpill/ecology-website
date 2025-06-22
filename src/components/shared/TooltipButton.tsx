import { FC } from 'react'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import { PropsWithChildren } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '../ui/button'
import { useState } from 'react'
import { Check } from 'lucide-react'

export type TooltipButtonProps = {
  variant?:
    | 'link'
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  side?: 'top' | 'right' | 'bottom' | 'left'
  tooltipContent: string
  onClick?: () => void
  className?: string
}

const TooltipButton: FC<PropsWithChildren<TooltipButtonProps>> = (props) => {
  const { variant, size, children, tooltipContent, className, onClick, side } =
    props
  const [clicked, setClicked] = useState(false)

  const handleClick = () => {
    onClick?.()
    setClicked(true)
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant={variant || 'default'}
          className={cn('size-6 cursor-pointer', className)}
          size={size}
          onClick={handleClick}
          onMouseLeave={() => setTimeout(() => setClicked(false), 1000)}
        >
          {clicked ? <Check /> : children}
        </Button>
      </TooltipTrigger>
      <TooltipContent side={side}>{tooltipContent}</TooltipContent>
    </Tooltip>
  )
}

export default TooltipButton
