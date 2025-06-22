import { FC } from 'react'
import WikiCategory from './_components/WikiCategory'
import { Outlet } from 'react-router'

const Wiki: FC = () => {
  return (
    <div className="flex flex-1 overflow-hidden">
      <WikiCategory />
      <div className="flex flex-1">
        <Outlet />
      </div>
    </div>
  )
}

export default Wiki
