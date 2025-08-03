import { Outlet } from 'react-router'
import Sidebar from '../Sidebar'

function Layout() {
  return (
    <div className='flex items-start h-[calc(100vh-40px)] w-screen  p-5 gap-5'>
        <Sidebar/>
        <Outlet/>
    </div>
  )
}

export default Layout