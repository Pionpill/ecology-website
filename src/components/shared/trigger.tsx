import { cn } from '@/lib/utils'
import { TabsList, TabsTrigger } from '../ui/tabs'

export const LineTabsList = (props: React.ComponentProps<typeof TabsList>) => {
  const { className, ...resProps } = props

  return (
    <TabsList
      className={cn(
        'w-full rounded-none border-b-2 bg-transparent p-0',
        className
      )}
      {...resProps}
    />
  )
}

export const LineTabsTrigger = (
  props: React.ComponentProps<typeof TabsTrigger>
) => {
  const { className, ...resProps } = props

  return (
    <TabsTrigger
      className={cn(
        'text-muted-foreground data-[state=active]:text-foreground data-[state=active]:after:bg-foreground relative cursor-pointer rounded-none border-0 font-semibold capitalize data-[state=active]:shadow-none data-[state=active]:after:absolute data-[state=active]:after:bottom-[-2px] data-[state=active]:after:left-0 data-[state=active]:after:h-[2px] data-[state=active]:after:w-full',
        className
      )}
      {...resProps}
    />
  )
}
