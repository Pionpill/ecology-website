import { FC } from 'react'
import BiomeSidebar from './sidebar'
import { Outlet } from 'react-router'
import { Separator } from '@/components/ui/separator'
import BiomeHeader from './header'

const Biome: FC = () => {
  return (
    <div className="flex flex-1 border-r">
      <BiomeSidebar />
      <div className="flex flex-1 flex-col overflow-auto">
        <BiomeHeader />
        <Separator />
        <Outlet />
      </div>
    </div>
  )
}

export default Biome
