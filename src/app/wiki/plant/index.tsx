import useDeviceStore from '@/hooks/useDeviceStore'
import useSideDrawer from '@/hooks/useSideDrawer'
import { FC, useEffect } from 'react'
import PlantSidebar from './_components/sidebar'
import WikiCategory from '../_components/WikiCategory'
import { Separator } from '@radix-ui/react-dropdown-menu'
import { Outlet } from 'react-router'
import BiomeHeader from '../biome/_components/header'

const Plant: FC = () => {
  const { device } = useDeviceStore()
  const { setComponent } = useSideDrawer()

  useEffect(() => {
    if (device === 'Mobile') {
      setComponent(
        <div className="flex h-full">
          <WikiCategory />
          <PlantSidebar className="w-full" />
        </div>
      )
      return () => setComponent(null)
    }
  }, [device])

  return (
    <div className="flex flex-1 overflow-hidden">
      {device === 'PC' ? (
        <>
          <WikiCategory />
          <PlantSidebar />
        </>
      ) : null}
      <div className="flex flex-1 flex-col overflow-auto">
        <BiomeHeader />
        <Separator />
        <Outlet />
      </div>
    </div>
  )
}

export default Plant
