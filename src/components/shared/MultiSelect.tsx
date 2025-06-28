import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ComponentProps, FC } from 'react'
import { Button, buttonVariants } from '../ui/button'
import { useControlState } from '@/hooks/useControlState'
import { useCallback } from 'react'
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { VariantProps } from 'class-variance-authority'
import { useMemo } from 'react'
import { useState } from 'react'

export type MultiSelectProp = {
  options: Array<
    | string
    | { icon?: ReactNode; label: string; value: string }
    | { divider?: boolean }
  >
  defaultValue?: string[]
  value?: string[]
  maxShownNum?: number
  className?: string
  contentClassName?: string
  placeholder?: string
  prefix?: ReactNode
  canCheckAll?: boolean
  title?: string
  onChange?: (value: string[]) => void
} & VariantProps<typeof buttonVariants> &
  Pick<ComponentProps<'button'>, 'disabled'>

const MultiSelect: FC<MultiSelectProp> = (props) => {
  const { t } = useTranslation()

  const {
    options,
    defaultValue,
    value,
    maxShownNum = 3,
    className,
    contentClassName,
    placeholder = t('common.pleaseSelect'),
    prefix = null,
    canCheckAll = true,
    title,
    onChange,
    ...buttonProps
  } = props

  const getValueLabel = useCallback(
    (value: string) => {
      const option = options.find(
        (option) =>
          typeof option === 'object' &&
          'value' in option &&
          option.value === value
      )
      if (!option || typeof option === 'string') return value
      return 'label' in option ? option.label : value
    },
    [options]
  )

  const [open, setOpen] = useState(false)

  const [innerValues, setInnerValues] = useControlState({
    value,
    defaultValue,
    defaultStateValue: [],
    onChange,
  })

  const handleClick = useCallback((value: string) => {
    setInnerValues((lastValue) => {
      if (lastValue.includes(value)) {
        return lastValue.filter((v) => v !== value)
      }
      return [...lastValue, value]
    })
  }, [])

  const isAllChecked = useMemo(
    () =>
      innerValues.length ===
      options.filter(
        (option) =>
          typeof option === 'string' || ('value' in option && option.value)
      ).length,
    [innerValues, options]
  )

  const handleCheckAll = useCallback(() => {
    if (isAllChecked) {
      setInnerValues([])
    } else {
      setInnerValues(
        options.reduce((acc, cur) => {
          if (typeof cur === 'string') {
            acc.push(cur)
          } else if ('value' in cur) {
            acc.push(cur.value)
          }
          return acc
        }, [] as string[])
      )
    }
  }, [isAllChecked])

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
            'flex min-w-24 items-center justify-between gap-0.5 px-2',
            className
          )}
          {...buttonProps}
        >
          <div className="flex items-center gap-1 overflow-auto">
            {prefix}
            {innerValues.length === 0 ? (
              <span className="opacity-40">{placeholder}</span>
            ) : null}
            <div className="flex gap-1 truncate">
              {innerValues.slice(0, maxShownNum).map((value) => (
                <div
                  key={value}
                  className="group bg-background flex items-center rounded-sm px-1 py-0.5"
                >
                  {getValueLabel(value)}
                </div>
              ))}
            </div>
            {innerValues.length > maxShownNum ? (
              <span className={'ml-1 opacity-80'}>{innerValues.length}+</span>
            ) : null}
          </div>
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={cn('flex flex-col gap-1', contentClassName)}
        onPointerDownOutside={() => setOpen(false)}
      >
        {options.map((option) => {
          if (typeof option === 'string')
            return (
              <DropdownMenuItem
                key={option}
                className={cn(
                  'cursor-pointer py-1',
                  innerValues.includes(option) && 'bg-accent'
                )}
                onClick={() => handleClick(option)}
              >
                {option}
              </DropdownMenuItem>
            )
          if ('divider' in option) return <DropdownMenuSeparator />
          const realOption = option as {
            icon?: ReactNode
            label: string
            value: string
          }
          return (
            <DropdownMenuItem
              key={realOption.value}
              className={cn(
                'cursor-pointer py-1',
                innerValues.includes(realOption.value) && 'bg-accent'
              )}
              onClick={() => handleClick(realOption.value)}
            >
              {realOption?.icon} {realOption.label}
            </DropdownMenuItem>
          )
        })}
        {canCheckAll && (
          <DropdownMenuItem
            className="cursor-pointer py-1"
            onClick={(e) => {
              e.stopPropagation()
              handleCheckAll()
            }}
          >
            {isAllChecked ? t('common.clearCheckAll') : t('common.checkAll')}
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default MultiSelect
