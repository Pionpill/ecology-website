import { FC } from 'react'
import { ListNode, ListProps } from './interface'
import ListItem from './ListItem'
import { useMemo } from 'react'
import { ListContext } from './ListContext'
import { useEffect } from 'react'
import useListStore from './useListStore'
import { cn } from '@/lib/utils'

const List: FC<ListProps> = (props) => {
  const { defaultActiveKey, listNodes, expandType, className, onClick } = props

  const { setActiveKey, setExpandType } = useListStore()

  const nodeMap = useMemo(() => {
    const nodes: Record<string, ListNode & { parentKeys: string[] }> = {}

    const processNode = (node: ListNode, parentKeys: string[]) => {
      nodes[node.key] = { ...node, parentKeys: [...parentKeys] }
      if (node.children) {
        node.children.forEach((child) => {
          processNode(child, [...parentKeys, node.key])
        })
      }
    }
    listNodes.map((node) => processNode(node, []))

    return nodes
  }, [listNodes])

  useEffect(() => {
    setActiveKey(defaultActiveKey ?? '')
  }, [defaultActiveKey])

  useEffect(() => {
    setExpandType(expandType ?? 'single')
  }, [expandType])

  return (
    <ListContext.Provider value={{ nodeMap }}>
      <div className={cn('flex flex-col gap-1', className)}>
        {listNodes.map((listNode) => (
          <ListItem
            nestLevel={1}
            listNode={listNode}
            key={listNode.key}
            onClick={() => onClick?.(listNode)}
          />
        ))}
      </div>
    </ListContext.Provider>
  )
}

export default List
