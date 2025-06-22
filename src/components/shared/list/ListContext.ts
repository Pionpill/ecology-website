import { createContext } from 'react'
import { ListNode } from './interface'
import { useContext } from 'react'

export type ListContextType = {
  nodeMap: Record<string, ListNode & { parentKeys: string[] }>
}

export const ListContext = createContext<ListContextType>({
  nodeMap: {},
})

export const useListContext = () => useContext(ListContext)
