import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { FC, ReactNode, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, buttonVariants } from '../ui/button'
import { useControlState } from '@/hooks/useControlState'
import { VariantProps } from 'class-variance-authority'
import { Slider } from '../ui/slider'
import { ChevronDown } from 'lucide-react'

export type SliderSelectProp = {
  defaultValue?: number[]
  value?: number[]
  className?: string
  contentClassName?: string
  placeholder?: string
  prefix?: ReactNode
  min: number
  max: number
  step?: number
  title?: string
  format?: (value: number[]) => ReactNode
  onChange?: (value: number[]) => void
  onValueCommit?: (value: number[]) => void
} & VariantProps<typeof buttonVariants>

const SliderSelect: FC<SliderSelectProp> = (props) => {
  const { t } = useTranslation()

  const {
    defaultValue,
    value,
    className,
    contentClassName,
    placeholder = t('common.pleaseSelect'),
    prefix = null,
    min,
    max,
    step = 1,
    title,
    format,
    onChange,
    onValueCommit,
    ...buttonProps
  } = props

  const [open, setOpen] = useState(false)
  const [innerValues, setInnerValues] = useControlState({
    value,
    defaultValue,
    defaultStateValue: [],
    onChange,
  })

  return (
    <DropdownMenu open={open}>
      <DropdownMenuTrigger
        asChild
        className="cursor-pointer"
        onClick={() => setOpen((last) => !last)}
      >
        <Button
          title={title}
          variant="secondary"
          className={cn(
            'flex min-w-12 items-center justify-between gap-0.5 !px-2',
            className
          )}
          {...buttonProps}
        >
          {prefix}
          {innerValues
            ? format
              ? format(innerValues)
              : innerValues.join(' ~ ')
            : placeholder}
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={cn('flex h-8 w-48 p-2', contentClassName)}
        onPointerDownOutside={() => setOpen(false)}
      >
        <Slider
          min={min}
          max={max}
          step={step}
          value={innerValues}
          onValueChange={setInnerValues}
          onValueCommit={onValueCommit}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default SliderSelect
