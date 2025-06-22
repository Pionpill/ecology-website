import { ReactNode } from 'react'

export type ListNode = {
  label: string
  key: string
  icon?: ReactNode
  children?: ListNode[]
}

export type ListItemProps = {
  listNode: ListNode
  defaultExpand?: boolean
  defaultActive?: boolean
  nestLevel: number
  onClick?: (listNode: ListNode) => void
  className?: string
  itemClassName?: string
}

export type ListProps = {
  defaultActiveKey?: string
  listNodes: ListNode[]
  /** 可展开一个还是多个 */
  expandType?: 'single' | 'multiple'
  onClick?: (listNode: ListNode) => void
  className?: string
}
