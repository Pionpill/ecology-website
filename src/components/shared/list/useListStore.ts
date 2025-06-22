import { create } from 'zustand'

export type ListStoreType = {
  activeKey: string
  expandKey: string[]
  expandType: 'single' | 'multiple'
  setActiveKey: (activeKey: string) => void
  setExpandKey: (expandKey: string[]) => void
  setExpandType: (expandType: 'single' | 'multiple') => void
}

const useListStore = create<ListStoreType>((set) => ({
  activeKey: '',
  expandKey: [],
  expandType: 'single',
  setActiveKey: (activeKey) => set({ activeKey }),
  setExpandKey: (expandKey) => set({ expandKey }),
  setExpandType: (expandType) => set({ expandType }),
}))

export default useListStore
