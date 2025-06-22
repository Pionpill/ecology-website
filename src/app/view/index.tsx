import { FC } from 'react'
import Header from './components/header'
import { Outlet } from 'react-router'

const View: FC = () => {
  return (
    <div className='flex flex-col w-screen h-screen'>
      <Header />
      <Outlet />
    </div>
  )
}

export default View
