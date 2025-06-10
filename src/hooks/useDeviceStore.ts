'use client'
import { create } from 'zustand'

export type DeviceType = 'PC' | 'Mobile'

/** 设备类型，目前只支持 PC 和 Mobile */
type DeviceStore = {
  device: DeviceType
  changeDevice: (newDevice: DeviceType) => void
}

export const getDeviceType = () =>
  globalThis.innerWidth < 640 ? 'Mobile' : 'PC'

const useDeviceStore = create<DeviceStore>((set) => ({
  device: getDeviceType(),
  changeDevice: (newDevice) => set({ device: newDevice }),
}))

export default useDeviceStore
