import { create } from 'zustand'

export type SidebarStore = {
  open: boolean
  setOpen: (open: boolean) => void
}

const useSidebarStore = create<SidebarStore>((set) => ({
  open: true,
  setOpen: (open) => set({ open }),
}))

export default useSidebarStore
