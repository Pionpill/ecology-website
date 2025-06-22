import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { hasIntersection } from '@/utils/math'
import { Minus, Plus } from 'lucide-react'
import { FC, useMemo } from 'react'
import { ListItemProps } from './interface'
import { useListContext } from './ListContext'
import useListStore from './useListStore'

const ListItem: FC<ListItemProps> = (props) => {
  const { nodeMap } = useListContext()
  const { activeKey, expandKey, expandType, setActiveKey, setExpandKey } =
    useListStore()

  const { listNode, nestLevel, className, itemClassName, onClick } = props

  const isLeaf = !('children' in listNode)
  const nodeInfo = useMemo(() => nodeMap[listNode.key], [listNode.key])
  const parentKeys = useMemo(
    () => nodeMap[listNode.key]?.parentKeys,
    [listNode.key]
  )

  const handleExpand = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    const hasInter = hasIntersection(expandKey, [listNode.key])
    if (hasInter) {
      setExpandKey(expandKey.filter((key) => key !== listNode.key))
    } else {
      setExpandKey(
        expandType === 'single'
          ? [...parentKeys, listNode.key]
          : [...parentKeys, listNode.key, ...expandKey]
      )
    }
  }

  return (
    <div className={cn('flex cursor-pointer flex-col', className)}>
      <div
        className={cn(
          'hover:bg-accent before:bg-sidebar-border after:bg-foreground relative flex items-center justify-between gap-2 rounded-sm p-1 before:absolute before:top-0 before:left-[11px] before:hidden before:h-full before:w-[1.5px] after:absolute after:top-1/2 after:left-[9px] after:hidden after:h-[6px] after:w-[6px] after:-translate-y-1/2 after:rounded-full',
          {
            'hover:before:block': nestLevel > 1,
            'bg-accent': activeKey === listNode.key,
            'before:block after:block':
              nestLevel > 1 && activeKey === listNode.key,
          },
          itemClassName
        )}
        onClick={(e) => {
          e.stopPropagation()
          setActiveKey(listNode.key)
          onClick?.(listNode)
        }}
      >
        <div
          className={cn('flex w-full items-center gap-2', {
            'text-sm': nestLevel > 1,
          })}
        >
          {listNode.icon ? (
            <div className="[&_svg]:size-4">{listNode.icon}</div>
          ) : null}
          <div
            className={cn('truncate', {
              'opacity-80': nestLevel > 1 && activeKey !== listNode.key,
            })}
            title={listNode.label}
          >
            {listNode.label}
          </div>
        </div>
        {isLeaf ? null : (
          <Button
            variant="ghost"
            className="hover:bg-sidebar size-6 cursor-pointer [&_svg]:size-4"
            onClick={handleExpand}
          >
            {hasIntersection(expandKey, [listNode.key]) ? <Minus /> : <Plus />}
          </Button>
        )}
      </div>
      {nodeInfo.children ? (
        <div
          className={cn(
            'before:bg-accent relative flex h-0 flex-col gap-0.5 overflow-hidden transition-[height] before:absolute before:top-0 before:left-[11px] before:h-full before:w-[1.5px]',
            {
              'h-auto': hasIntersection(expandKey, [
                listNode.key,
                ...parentKeys,
              ]),
            }
          )}
        >
          {nodeInfo.children?.map((node) => (
            <ListItem
              itemClassName="pl-7"
              listNode={node}
              nestLevel={nestLevel + 1}
              onClick={onClick}
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}

export default ListItem
