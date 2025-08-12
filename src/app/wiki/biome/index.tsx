import { FC, useEffect } from 'react'
import BiomeSidebar from './sidebar'
import { Outlet } from 'react-router'
import { Separator } from '@/components/ui/separator'
import BiomeHeader from './header'
import WikiCategory from '../_components/WikiCategory'
import useDeviceStore from '@/hooks/useDeviceStore'
import useSideDrawer from '@/hooks/useSideDrawer'

const Biome: FC = () => {
  const { device } = useDeviceStore()
  const { setComponent } = useSideDrawer()

  useEffect(() => {
    if (device === 'Mobile') {
      setComponent(
        <div className="flex h-full">
          <WikiCategory />
          <BiomeSidebar className="w-full" />
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
          <BiomeSidebar />
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

export default Biome
