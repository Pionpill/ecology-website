import { ReactNode } from 'react'
import { create } from 'zustand'

type SideDrawerStore = {
  component?: ReactNode
  setComponent: (newComp?: ReactNode) => void
}

/** 移动端左侧边栏内容 */
const useSideDrawer = create<SideDrawerStore>((set) => ({
  component: undefined,
  setComponent: (newComp) => set(() => ({ component: newComp })),
}))

export default useSideDrawer
